import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SaviorContext } from "./SaviorContext";
import { fetchData, isObjectEmpty } from "../utils";

export const StatsBarContext = createContext();

const emissionsPeriodToDate = (periodLabel) => {
  switch (periodLabel) {
    case "day": {
      return new Date(new Date().setHours(0, 0, 0, 0));
    };
    case "week": {
      const now = new Date();
      return  new Date(
        new Date(
          new Date().setDate(
            now.getDate() - (now.getDay() + 6) % 7
          )
        ).setHours(0, 0, 0, 0)
      )
    }
    case "month": {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    case "year":{
      const now = new Date();
      return new Date(now.getFullYear(), 0, 1);
    } 
  }
}

export default function StatsBarContextProvider({ children }) {
  const { isLoggedIn, savior } = useContext(SaviorContext);
  const [ stats, setStats ] = useState(null); 
  const [ timesLogged, setTimesLogged ] = useState(0);

  const getCurrentStats = useCallback(async () => {
    const res = await fetchData("saviors/logs");
    const _stats = {
      "day": 0, "week": 0, "month": 0, "year": 0
    };
    let totalEmissions = 0;
    console.clear();
    const periodLabels = Object.keys(_stats);
    const { length: numLabels } = periodLabels;
    res.content.logs.map(({ created_at, co2e, }) => {
      totalEmissions += co2e;
      const createdAt = new Date(`${created_at}Z`);
      for (let i = numLabels - 1; i >= 0; i--) {
        if (createdAt > emissionsPeriodToDate(periodLabels[i])) {
          _stats[periodLabels[i]] += co2e
        } else {
          break;
        }
      }
    });

    _stats.total = totalEmissions;
    console.log(_stats);
    setStats(_stats);
    return _stats;
  });

  useEffect(() => {
    if (!isObjectEmpty(savior) && !savior.spriving) {
      async function getTimesLogged() {
        const res = await fetchData(
          `saviors/times-logged?since_date=${emissionsPeriodToDate("day").toISOString()}`
        );
        setTimesLogged(res.content);
      }
      getTimesLogged();
    };

  }, [savior?.spriving]);

  useEffect(() => {
    return () => {
      if (!isLoggedIn) {
        setStats(null);
      }
    }
  }, [isLoggedIn]);

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