import React from 'react'

export const createClassFormError = (name, subject, subcode, setclassError, setSubjectCodeError, setSubjectError) => {
    if (!name)
        setclassError('This field is required!');
    else
        setclassError('');

    if (!subject)
        setSubjectError("please provide subject name!")
    else
        setSubjectError("")

    if (!subcode)
        setSubjectCodeError("subject code is mandatory!");
    else
        setSubjectCodeError("");
    if (!name || !subject || !subcode)
        return true;
    else
        return false;

}
