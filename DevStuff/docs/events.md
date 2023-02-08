# Events

## How events work

We have a system under ```Systems/Time/Event.js``` in which there is multiple functions, ranging from ```MinuteEventFire``` to ```YearEventFire```

## How to utilize events

If you are developing anything that uses events you **will never** need to call the **EventFireFunction**

In order to execute any code with a scheduled event you need to put it into a function, and add a function call inside the desired **EventFireFunction**

### Ex.

```js
function TwelveHourEventFire {
  PaycheckSequence();
}
```

The above code will execute the function ```PaycheckSequence``` every TwelveHours. 

## Final Notes

1.  **Never call the EventFireFunction**
2.  **Never write code inside the EventFireFunction, only Function calls**
3.  **Make sure the function works before putting it into the scheduler, it's just common sense**