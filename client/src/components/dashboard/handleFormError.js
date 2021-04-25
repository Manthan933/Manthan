export const createClassFormError = (
  name,
  subject,
  subcode,
  image,
  setclassError,
  setSubjectCodeError,
  setSubjectError,
  setImageError
) => {
  if (!name) setclassError('This field is required!');
  else setclassError('');

  if (!subject) setSubjectError('This field is required!');
  else setSubjectError('');

  if (!subcode) setSubjectCodeError('This field is required!');
  else setSubjectCodeError('');

  if (image) {
    var type = image.name.split('.').pop();
    var support = ['jpg', 'png', 'jpeg'];
    if (!support.includes(type)) setImageError('please upload valid image format');
  }

  if (!name || !subject || !subcode || (image && !support.includes(type))) return true;
  else return false;
};
