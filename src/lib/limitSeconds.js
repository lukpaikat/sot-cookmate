const limitSeconds = ({ seconds, initialSeconds, limit }) => {
  const limitedSeconds =  seconds - (initialSeconds - limit);
  if (limitedSeconds <= 0) {
    return 0;
  }
  return limitedSeconds;
};

export default limitSeconds;
