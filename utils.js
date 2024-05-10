import { getItemAsync } from "expo-secure-store"
import { PixelRatio } from "react-native";

export const isObjectEmpty = (obj) => {
  for (let k in obj) return false; 
  return true;
}

const formattingLang = window.navigator.language
export const kgsInTon = 907.18474;
export const kgsInMt = 1000000000;
export const kgsInGt = 1000000000000;
const metrics = [
  {metric: "t", scaleBy: kgsInTon},
  {metric: "Mt", scaleBy: kgsInMt},
  {metric: "Gt", scaleBy: kgsInGt}
];
const { length: numMetrics } = metrics;

export const formatCO2e = (co2e, maximumFractionDigits=3) => {
  if (isNaN(co2e)) return [ 0, "kg" ];

  let resultVal = co2e,
  resultMetric = "kg";
  
  for(let i = 0; i < numMetrics; i++) {
    const { metric, scaleBy } = metrics[i];
    const scaled = co2e / scaleBy;
    if (scaled >= 1) {
      resultVal = scaled;
      resultMetric = metric;
    } else break;
  };

  const formattedVal = Intl.NumberFormat(
    "default", { maximumFractionDigits }
  ).format(resultVal);
  return [ formattedVal, resultMetric ];
};

const ratingsText = {
  "A": "great",
  "B": "good",
  "C": "poor",
  "D": "bad",
  "F": "bad"
}
export const getRatingText = (rating) => {
  return ratingsText[rating]
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
      let response = await fetch(`http://192.168.1.74:8000/${endpoint}`, options);
      if (response.status === statusCodeCheck) {
        return onStatusCodeMatch();
      } else if (response.ok) {
        response = await response.json();
        if (setState) {
          setState(response.content);
        } else return response;
      } 
  }
    catch (e) {
      throw new Error(`That did not work ${e.message || e}`);
  }
}

export const emailRegex = RegExp("/^\S+@\S+\.\S+$/");

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