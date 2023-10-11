export const getTitleError = (title: string) => {
  if (!title) {
    return "Please add a title";
  }
};

export const getTimeError = ({
  startTime,
  endTime,
}: {
  startTime?: Date;
  endTime?: Date;
}) => {
  if (endTime && startTime && endTime <= startTime) {
    debugger;
    return "The endTime should be after the startTime";
  }
};
