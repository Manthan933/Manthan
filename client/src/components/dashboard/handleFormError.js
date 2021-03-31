export const createClassFormError = (
  name,
  subject,
  subcode,
  setclassError,
  setSubjectCodeError,
  setSubjectError
) => {
  if (!name) setclassError('This field is required!');
  else setclassError('');

  if (!subject) setSubjectError('This field is required!');
  else setSubjectError('');

  if (!subcode) setSubjectCodeError('This field is required!');
  else setSubjectCodeError('');
  if (!name || !subject || !subcode) return true;
  else return false;
};
