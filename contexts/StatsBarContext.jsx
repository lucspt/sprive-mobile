import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SaviorContext } from "./SaviorContext";
import { fetchData, isObjectEmpty, pledgeFrequencyToDate } from "../utils";

export const StatsBarContext = createContext();

const STATS_PERIODS = () => ({
  "day": pledgeFrequencyToDate("day"),
  "week": pledgeFrequencyToDate("week"),
  "month": pledgeFrequencyToDate("month"),
  "year": pledgeFrequencyToDate("year")
})

export default function StatsBarContextProvider({ children }) {

  const { isLoggedIn, savior } = useContext(SaviorContext);
  const [ stats, setStats ] = useState(null); 
  const [ timesLogged, setTimesLogged ] = useState(0);

  const getCurrentStats = useCallback(async (periods) => {
      const res = await fetchData("saviors/emissions", "POST", periods || STATS_PERIODS())
      const { content } = res;
      setStats(content);
      return content;
  });

  useEffect(() => {
    if (!isObjectEmpty(savior) && !savior.spriving) {
      async function getTimesLogged() {
        const res = await fetchData(
          `saviors/logs/amount?since_date=${pledgeFrequencyToDate("day")}`
        )
        setTimesLogged(res.content);
      }
      getTimesLogged();
    }
  }, [savior.spriving])

  useEffect(() => {
    return () => {
      if (!isLoggedIn) {
        setStats(null);
      }
    }
  }, [isLoggedIn])

  const values = useMemo(() => ({
    stats,
    timesLogged,
    getCurrentStats,
    setTimesLogged,
  }), [stats, savior, timesLogged]);

  return (
    <StatsBarContext.Provider value={values}>
      { children }
    </StatsBarContext.Provider>
  )
}