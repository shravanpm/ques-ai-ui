import { sub, formatISO } from "date-fns";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return emailRegex.test(email);
}

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function convertISOTimeToString(date) {
  const formatted = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return formatted;
}

export function extractDateAndTime(isoString) {
  const dateObj = new Date(isoString);

  const date = dateObj.toLocaleDateString("en-GB"); // e.g., "18/04/2025"
  const time = dateObj.toLocaleTimeString("en-GB"); // e.g., "06:15:55"

  return { date, time };
}
