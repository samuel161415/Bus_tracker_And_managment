let value=require('./serial')

let count = 0;
  
const intervalId = setInterval(() => {
  console.log("value is "+value);
  count++;
  
  if (count === 5) {
    console.log('Clearing the interval id after 5 executions');
    clearInterval(intervalId);
  }
}, 5000);