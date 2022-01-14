import data from "./data.json";

const myData = data; //data received from json file
//console.log(myData);
//console.log(myData[0].timeframes.daily.current);

class LoadTimeframes {
  constructor(dailyTime, currentTimeEl, previousTimeEl) {
    this.dailyTime = dailyTime; //data from json
    this.currentTimeEl = currentTimeEl; //Element in which current time is gonna be displayed
    this.previousTimeEl = previousTimeEl; //Element in which previous time is gonna be displayed
  }
  //So what happens here is we assign 0 to x that we later use as index in dailyTime array
  //Then we take elements(currentTimeEl, previousTimeEl) which we use to display time user had spent on something
  //We increment x to increase index value
  //After first forEach is done, we're assigning 0 to x to reset current index so we can do another forEach for 'previous time' (previous time spent on some kind of activity)
  
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
//'previous-spent-time' are elements that display time we spent in previous week
const dailyTimeframes = new LoadTimeframes(
  myData,
  document.querySelectorAll(".spent-time"),
  document.querySelectorAll(".previous-spent-time")
);

dailyTimeframes.loadDaily(); //By default daily time is loaded

//Event delegation
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
