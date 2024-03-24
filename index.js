/* ----------------- Getting the html elements for the watch ---------------- */
const hourBox = document.getElementById('time_hour');
const minutesBox = document.getElementById('time_minutes');
const secondsBox = document.getElementById('time_seconds');
const timePeriodBox = document.getElementById('time_period');

/* ------------------------------ Dynamic clock ----------------------------- */
function updateTime() {
  //Current timestamp
  let currentTimeStamp = Date.now();
  let currentDate = new Date(currentTimeStamp);
  // Getting the hours, minutes, and seconds
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  // 12 hour format
  let period = 'AM';
  if (hours >= 12) {
    period = 'PM';
    hours = hours % 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  // Formatting the values
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  hourBox.textContent = hours;
  minutesBox.textContent = minutes;
  secondsBox.textContent = seconds;
  timePeriodBox.textContent = period;
}

updateTime();

setInterval(updateTime, 1000);

/* ------------------------------ set the alarm ----------------------------- */
const setTheAlarm = document.getElementById('set_alarm');
const alarmTime = document.getElementById('alarm_Time');
const alarmTitle = document.getElementById('alarm_Title');
const alarmMessage = document.getElementById('alarm_message');
// as we have multiple alarms we store their intervals in array
let alarmIntervals = [];
function setAlarm() {
  //validation
  if (!alarmTime.value || !alarmTitle.value) {
    alert('Please enter time and title');
    return;
  }
  // destructuring the hours and minutes from the html element
  let [alarmHours, alarmMinutes] = alarmTime.value.split(':').map(Number);
  alarmHoursFormatted = alarmHours < 10 ? '0' + alarmHours : alarmHours;
  alarmMinutesFormatted = alarmMinutes < 10 ? '0' + alarmMinutes : alarmMinutes;
  // Creating alarm block
  let alarmBlock = document.createElement('div');
  alarmBlock.className = 'alarm_block';

  // Createing alarm time element
  let alarmTimeElement = document.createElement('p');
  alarmTimeElement.className = 'alarm_block_time';
  alarmTimeElement.textContent =
    alarmHoursFormatted + ' : ' + alarmMinutesFormatted;

  // Creating alarm title element
  let alarmTitleElement = document.createElement('p');
  alarmTitleElement.className = 'alarm_block_title';
  alarmTitleElement.textContent = alarmTitle.value;

  // Creating remove button
  let removeButton = document.createElement('button');
  removeButton.className = 'alarm_block_remove';
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', function () {
    // Removing the alarm interval corresponding to this (the alarm which i clicked on) alarm
    let index = alarmIntervals.findIndex(
      (alarm) => alarm.hours === alarmHours && alarm.minutes === alarmMinutes
    );
    if (index !== -1) {
      clearInterval(alarmIntervals[index].interval);
      alarmIntervals.splice(index, 1);
    }
    // Removing the alarm block when remove button is clicked
    alarmBlock.remove();
  });

  alarmBlock.appendChild(alarmTimeElement);
  alarmBlock.appendChild(alarmTitleElement);
  alarmBlock.appendChild(removeButton);
  document.getElementById('alarm_list').appendChild(alarmBlock);
  // this run when the alarm time is equal to clock time
  let alarmInterval = setInterval(function () {
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();

    if (currentHours === alarmHours && currentMinutes === alarmMinutes) {
      const audio = document.querySelector('audio');
      audio.play();
      // alert('Alarm success');
      clearInterval(alarmInterval); // Clearing the interval once alarm is triggered
      // Removing the alarm block when alarm is complete
      alarmBlock.remove();
      // Removing the interval object from the array
      let index = alarmIntervals.findIndex(
        (alarm) => alarm.hours === alarmHours && alarm.minutes === alarmMinutes
      );
      hoursFormatted =
        alarmIntervals[index].hours < 10
          ? '0' + alarmIntervals[index].hours
          : alarmIntervals[index].hours;
      minutesFormatted =
        alarmIntervals[index].minutes < 10
          ? '0' + alarmIntervals[index].minutes
          : alarmIntervals[index].minutes;
      // i made a custom message instead of alert block
      alarmMessage.textContent = `${alarmIntervals[index].title} at ${hoursFormatted} : ${minutesFormatted}`;
      alarmMessage.style.transform = 'translateY(0)';
      setTimeout(() => {
        alarmMessage.style.transform = 'translateY(-200%)';
      }, 5000);
      if (index !== -1) {
        alarmIntervals.splice(index, 1);
      }
    }
  }, 1000);
  // Storing alarm interval in array
  alarmIntervals.push({
    title: alarmTitle.value,
    hours: alarmHours,
    minutes: alarmMinutes,
    interval: alarmInterval,
  });
  // reseting the input values
  alarmTime.value = '';
  alarmTitle.value = '';
}
//

setTheAlarm.addEventListener('click', setAlarm);
