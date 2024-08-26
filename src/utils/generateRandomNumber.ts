import { currentTimestamp } from "./getCurrentTimestamp";

function generateRandomNumber() {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min + currentTimestamp;
}

export default generateRandomNumber;
