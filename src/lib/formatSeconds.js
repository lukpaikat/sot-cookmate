const formatSeconds = seconds => {
  const oneMinute = 60;
  const minutes = Math.floor(seconds / oneMinute);
  const remainingSeconds = seconds % oneMinute;

  const minutesDisplay = String(minutes);
  const secondsDisplay = String(remainingSeconds).padStart(2, "0");

  return minutesDisplay + ":" + secondsDisplay;
};

export default formatSeconds;
