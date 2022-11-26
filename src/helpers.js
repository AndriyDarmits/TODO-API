import { fetchStart, fetchEnd } from "./webApi.js";

// Функція приймає асинхрону функцію, запускає лоадер перед її початком та вимикає його після завершення. Передавайте у цей метод функції що потребуватимуть показу лоадера в процесі виконання (оновлення елементів, логін, ітд)
export const asyncProvider = async (func) => {
  try {
    document.dispatchEvent(fetchStart);
    if (typeof func === "function") {
      await func();
    }
  } catch (error) {
    console.log("Error in provider:", { error });
  } finally {
    document.dispatchEvent(fetchEnd);
  }
};

export const wait = async (ms) => {
  new Promise((resolve) => setTimeout((resolve, ms)));
};
