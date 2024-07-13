import { time } from "./constants";

const times = time();
export function joinWords(numbers, words) {
  const joinedWordsList = [];
  let index = 0;
  let timecount = -1;
  numbers.forEach((num) => {
    let count = Math.floor(num);
    timecount += 1;
    if (index + count > words.length) {
      count = words.length - index;
    }
    if (count > 0) {
      const joinedWords = words.slice(index, index + count).join(" ");
      joinedWordsList.push({
        text: joinedWords,
        num: num,
        time: times[timecount],
        selected: false,
      });
      index += count;
    }
    if (index >= words.length) {
      return;
    }
  });
  return joinedWordsList;
}
