import data from "./data.json";

const myData = data;
console.log(myData);
console.log(myData[0].timeframes.daily.current);

class LoadTimeframes {
  constructor(dailyTime, currentTimeEl, previousTimeEl) {
    this.dailyTime = dailyTime;
    this.currentTimeEl = currentTimeEl;
    this.previousTimeEl = previousTimeEl;
  }
  //So what happens here is we assign 0 to x that we later use as index in dailyTime array
  //Then we take elements which we use to display time user had spent on something
  //We increment x to increase index value
  loadDaily() {
    let x = 0;
    this.currentTimeEl.forEach((element) => {
      element.textContent = `${this.dailyTime[x].timeframes.daily.current}hrs`;
      x++;
    });
    x = 0;
    this.previousTimeEl.forEach((element) => {
      element.textContent = `${this.dailyTime[x].timeframes.daily.previous}hrs`;
      x++;
    });
  }
  loadWeekly() {
    let x = 0;
    this.currentTimeEl.forEach((element) => {
      element.textContent = `${this.dailyTime[x].timeframes.weekly.current}hrs`;
      x++;
    });
    x = 0;
    this.previousTimeEl.forEach((element) => {
      element.textContent = `${this.dailyTime[x].timeframes.weekly.previous}hrs`;
      x++;
    });
  }
  loadMonthly() {
    let x = 0;
    this.currentTimeEl.forEach((element) => {
      element.textContent = `${this.dailyTime[x].timeframes.monthly.current}hrs`;
      x++;
    });
    x = 0;
    this.previousTimeEl.forEach((element) => {
      element.textContent = `${this.dailyTime[x].timeframes.monthly.previous}hrs`;
      x++;
    });
  }
}

//loading dailyTimeframes - myData is json current time, .spent-time returns nodeList of elements that are later turned into array with forEach method inside class
const dailyTimeframes = new LoadTimeframes(
  myData,
  document.querySelectorAll(".spent-time"),
  document.querySelectorAll(".previous-spent-time")
);
dailyTimeframes.loadDaily();

document.querySelector(".card-time").addEventListener("click", (event) => {
  if (event.target.classList.contains("daily")) {
    dailyTimeframes.loadDaily();
  } else if (event.target.classList.contains("weekly")) {
    dailyTimeframes.loadWeekly();
  } else if (event.target.classList.contains("monthly")) {
    dailyTimeframes.loadMonthly();
  }
  event.stopPropagation();
});
