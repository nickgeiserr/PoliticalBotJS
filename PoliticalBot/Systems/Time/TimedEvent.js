const fs = require('fs')

// import files for func. calls
eval(fs.readFileSync('./PoliticalBot/Systems/Economy/Paycheck/payment.js')+'');

let minutes = 0;
let half_hours = 0;
let hours = 0;
let twelve_hours = 0;
let days = 0;
let weeks = 0;
let months = 0;

function DevTest(){
  console.log(minutes);
}

// Adds one minute to minutes and calculates if any events need to be fired
function IncrementMinutes(){
  minutes += 1;
  MinuteEventFire();
  if(minutes == 30){ half_hours += 1; HalfHourEventFire() }
  if(half_hours == 2){ hours += 1; HourEventFire() }
  if(hours == 12){ twelve_hours += 1; TwelveHourEventFire() }
  if(twelve_hours == 2){ days += 1; DailyEventFire() }
  if(days == 7 ){ weeks += 1; WeeklyEventFire() }
  if(weeks == 4){ months += 1; MonthlyEventFire(); 3}
  if(months == 12){ YearlyEventFire(); } 
  SaveCurrentTimeData();
}

function InitializeTimeData(){
  const data = fs.readFileSync('./Systems/Time/TimeData.json', 'utf8')
  var jsonObj = JSON.parse(data);
  minutes = jsonObj["minutes"]
  half_hours = jsonObj["half_hours"]
  hours = jsonObj["hours"]
  twelve_hours = jsonObj["twelve_hours"]
  days = jsonObj["days"]
  weeks = jsonObj["weeks"]
  months = jsonObj["months"]
  console.log("\x1b[32m%s\x1b[0m",'Time-Data Initialized');
}

// saves current time data
function SaveCurrentTimeData(){
  var data = {
      "minutes":minutes,
      "half_hours":half_hours,
      "hours":hours,
      "twelve_hours":twelve_hours,
      "days":days,
      "weeks":weeks,
      "months":months
      }
  var json = JSON.stringify(data, null, 4);
  fs.writeFile('./Systems/Time/' + 'TimeData' + '.json', json, err => {
    if (err) {
        console.log(err);
    }
  });
}

// Fires every minute
function MinuteEventFire(){
  console.log('\x1b[36m%s\x1b[0m','Minute Passed!')

  // Jail Sequence
  UpdateInmateJailTime();
}
// Fires every 30 minutes
function HalfHourEventFire(){
  minutes = 0;
  console.log("\x1b[32m%s\x1b[0m",'Half-Hour Passed');
}
// Fires every hour
function HourEventFire(){
  half_hours = 0;
  console.log("\x1b[35m%s\x1b[0m","Hour Passed")

  // func. calls go here
  givePayCheck();
  
}
// Fires every 12 hour's
function TwelveHourEventFire(){
  hours = 0;
  console.log("\x1b[31m%s\x1b[0m", "Twelve-Hours Passed");

  // func. calls go here
  
}
// Fires every day
function DailyEventFire(){
  twelve_hours = 0;
  console.log("\x1b[33m%s\x1b[0m", "One Day has Passed")
}
// fires every week
function WeeklyEventFire(){
  days = 0;
}
// fires every month
function MonthlyEventFire(){
  weeks = 0;
}
// fires every year
function YearlyEventFire(){
  months = 0;
}