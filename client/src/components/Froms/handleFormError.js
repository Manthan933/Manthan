export const createClassFormError = (
  name,
  subject,
  subcode,
  setclassError,
  setSubjectCodeError,
  setSubjectError
) => {
  if (!name) setclassError("This field is required!");
  else setclassError("");

  if (!subject) setSubjectError("please provide subject name!");
  else setSubjectError("");

  if (!subcode) setSubjectCodeError("subject code is mandatory!");
  else setSubjectCodeError("");
  if (!name || !subject || !subcode) return true;
  else return false;
};


export const createTestFormError = (
  name,
  mark,
  hour,
  minute,
  setNameError,
  setMarkError,
  setHourError,
  setMinuteError,
) => {
  if (!name) setNameError("name is require");
  else setNameError("");

  if (!mark) setMarkError("please provide marks");
  else if (mark <= 0) setMarkError(`${mark} is not Valid marks`);
  else setMarkError("");
  if (hour < 0) setHourError(`${hour} is invalid`);

  if (minute > 60 || minute < 0) setMinuteError(`${minute} is not valid minutes`);
  else if (!minute && !hour) setMinuteError(`minute is require`);
  else setMinuteError("");
  if (!name || !mark || (!minute && !hour) || mark < 0 || minute > 60 || minute < 0 || hour < 0) return true;
  else return false;
};


