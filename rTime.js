const ms = require("ms")

  const calculateMilliseconds = args => {
    let bantimeArray = args.split(",");
    let bantime = 0;
    bantimeArray.forEach(t => {
      let milsecs = ms(t);
      bantime = bantime + milsecs;
    });
    return bantime;
  }

  const rTime = args => {
    let mis = calculateMilliseconds(args);
    const days = Math.floor(mis / (1000 * 60 * 60 * 24));
    const hours = Math.floor((mis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((mis % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((mis % (1000 * 60)) / 1000);
    let lDays = days + " days";
    if (days === 1) lDays = days + " day";
    let lHours = hours + " hours";
    if (hours === 1) lHours = hours + " hour";
    let lMinutes = minutes + " minutes";
    if (minutes === 1) lMinutes = minutes + " minute";
    let lSeconds = seconds + " seconds";
    if (seconds === 1) lSeconds = seconds + " second";

    let time = "";

    if (days) time = `${time} ${lDays}`;
    if (hours) time = `${time} ${lHours}`;
    if (minutes) time = `${time} ${lMinutes}`;
    if (seconds) time = `${time} ${lSeconds}`;
    return time.slice(1);
  }

module.exports = { rTime, calculateMilliseconds };
