import { getItemAsync } from "expo-secure-store"
import { PixelRatio } from "react-native";

export const PERIODICAL_EMISSIONS_AGG = dateRange => ({
  query_type: "aggregate",
  collection: "product_logs",
  filters: [
    {$match: {created: {"$gt": pledgeFrequencyToDate(dateRange)}}},
    {$group: {
      _id: "$savior_id",
      co2e: {"$sum": "$co2e"}
    }},
    {$project: {_id: 0}}
  ]
})

export const pledgeFrequencyToDate = (pledgeFrequency) => {
  const now = new Date();
  switch (pledgeFrequency) {
    case "day": return new Date(now.setHours(0, 0, 0, 0)).toISOString()
    case "week": return getLastMonday();
    case "month": return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    case "year": return new Date(now.getFullYear(), 0, 1).toISOString();
  }
}

export const getLastMonday = () => {
  const now = new Date();
  return new Date(
    new Date(
      now.setDate(
        now.getDate() - (now.getDay() + 6) % 7
      )
    ).setHours(0, 0, 0, 0)
  ).toISOString();
}
export const isObjectEmpty = (obj) => {
  for (let k in obj) return false; 
  return true;
}

const formattingLang = window.navigator.language
export const formatCO2e = (val, nDecimals=1) => {
  if (isNaN(val)) return [ 0, "kg" ];
  const kgsInTon = 907.18474;
  const formatVal = (val, nDigits=nDecimals) => Intl.NumberFormat(
    formattingLang, {maximumFractionDigits: nDigits}
  ).format(val);
  if (val > kgsInTon) {
    const megatonsInTon = 1000000;
    const gigatonsInTon = 1102311310.9244;
    const metrics = [
      {metric: "t", val: kgsInTon},
      {metric: "Mt", val: megatonsInTon},
      {metric: "Gt", val: gigatonsInTon}
    ];
    let result = metrics[0];
    while (((val / result.val) >= 1) && metrics.length > 1) {
      const next = metrics[1];
      if (val / next.val >= 1) {
        metrics.shift();
        result = next;
        continue;
      } else break;
    }
    return [ formatVal(val / result.val, Math.max(1, nDecimals)), result.metric ];
  } else return [ formatVal(val, nDecimals), "kg" ];
};

export const getRatingText = (rating) => {
  return {
    "A": "great",
    "B": "good",
    "C": "poor",
    "D": "bad",
    "F": "bad"
  }[rating]
}

export const getCookie = key => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const fetchData = async (
  endpoint,
  method="GET",
  body={},
  headers={},
  setState=null,
  token=null,
  statusCodeCheck,
  onStatusCodeMatch,
  ) => {
    token = token || await getItemAsync("token");
    if (!token) return;
    
    try {
      headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      };
      const options = {
        method: method,
        headers: headers, 
      };
      if (!isObjectEmpty(body)) {
        options.body = JSON.stringify(body);
      };
      let response = await fetch(`http://192.168.1.18:8000/${endpoint}`, options);
      if (response.status === statusCodeCheck) {
        return onStatusCodeMatch();
      } else if (response.ok) {
        response = await response.json();
        if (setState) {
          setState(response.content);
        } else return response;
      } else return response;
  }
    catch (e) {
      throw new Error(`That did not work ${e.message || e}`);
  }
}

export const emailRegex = RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");

const SCALE_BASIS = 393 // iphone 15
export const scaleFont = (screenWidth, desiredSize) => {
  const scale = screenWidth / SCALE_BASIS;
  const newSize = desiredSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const second = 1000
const minute = 60 * second;
const hour = minute * 60;
const day = 24 * hour;
const week = 7 * day;
const month = 2629800000; // months are less accurate
const year = 12 * month;
const timePeriods = { second, minute, hour, day, week, month, year };

export function getTimeElapsed(date) {
  let resultMs = second;
  let resultUnit = "second";
  const millisecondsSince = new Date() - new Date(`${date}Z`);
  for (let [ period, msSince ] of Object.entries(timePeriods)) {

    if (millisecondsSince >= msSince) {
      resultUnit = period
      resultMs = msSince;
      continue
    } else {
      break; 
    }
  }
  const timeElapsed = Math.max(0, Math.floor(millisecondsSince / resultMs));
  return timeElapsed === 1
    ? `${timeElapsed} ${resultUnit} ago`
    : `${timeElapsed} ${resultUnit}s ago`
}