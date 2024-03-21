import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { setItemAsync, deleteItemAsync } from "expo-secure-store";
import { fetchData, isObjectEmpty } from "../utils";
import { getItemAsync } from "expo-secure-store"

export const SaviorContext = createContext();

const storeInfo = async (savior, token, setSavior, creation=false) => {
  if (creation){
    Promise.all([
      await setItemAsync("token", token),
      await setItemAsync("hideStats", JSON.stringify(false))
    ]);
  } else {
    await setItemAsync("token", token);
  }
  setSavior(savior);
}

const server = "http://192.168.1.18:8000"
export default function SaviorContextProvider({ children }) {
  const [ savior, setSavior ] = useState(null);
  
  useEffect(() => {
    if (savior === null || (isLoggedIn && isObjectEmpty(savior))) {
      const getSavior = async () => { 
        const token = await getItemAsync("token");
        if (token) {
          await fetchData(
            "saviors", "GET", {}, {}, setSavior, token
          )
        } else {
          setSavior({}); 
        }
      };
      getSavior();
    }
    return () => !isLoggedIn && setSavior(null);
  }, [isLoggedIn]);
  
  const login = useCallback(async (user, setError) => {
    let res = await fetch(
      `${server}/users/login?token=include`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();
      if (res.ok) {
        const { token, ..._savior } = json.content;
        storeInfo(_savior, token, setSavior);
      } else setError(json.content);
  }, [])

  const createSavior = useCallback(async (user, setError) => {
    let res = await fetch(
      `${server}/users?token=include`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    if (res.ok) {
      const { token, ..._savior } = json.content;
      storeInfo(_savior, token, setSavior, true);
    } setError(json.content);
  }, []);

  const logout = useCallback(async () => {
    setSavior({});
    await deleteItemAsync("token")
  }, []);

  const isLoggedIn = useMemo(() => savior === null ? null : !isObjectEmpty(savior), [savior]);

  const updateSavior = useCallback(async (updateInfo, onFail) => {
    const res = await fetchData(
      "saviors", "PATCH", updateInfo, {}, null, null, 409, onFail,
    );
    setSavior(prev => ({...prev, ...updateInfo}));
    onFail();
    return res;
  }, [savior]);

  const context = useMemo(() => ({
    savior,
    isLoggedIn,
    login,
    logout,
    createSavior,
    updateSavior,
    setSavior,
  }), [savior, isLoggedIn]);

  return savior !== null && (
    <SaviorContext.Provider value={context}>
      { children }
    </SaviorContext.Provider>
  )
}