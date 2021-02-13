import * as api from "../api/api";
// ---------------------------- Class Methods ------------------------------
export const createClass = async (Class, user, Classes, setClasses) => {
  try {
    const newClass = {
      name: Class.name,
      subcode: Class.subcode,
      subject: Class.subject,
      instructor: {name:user.username,email:user.email},
      image: user.image,
      users: [user.email],
    };
    const res = await api.createClass(newClass);
    setClasses([...Classes, res.data]);
  } catch (error) {
    console.log(error.message);
  }
};

export const getClass = async (code, setClass) => {
  try {
    if (code) {
      const res = await api.getClass(code);
      setClass(res.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getClasses = async (id, setClasses) => {
  try {
    if (id) {
      const res = await api.getClasses(id);
      setClasses(res.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteClass = async (classCode, id, setClasses) => {
  try {
    if (classCode) {
      const res = await api.deleteClass(classCode);
      res && getClasses(id, setClasses)
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const joinClass = async (user, Classes, setClasses, classCode) => {
  try {
    const Class = await api.getClass(classCode);
    const updatedClass = await api.updateClass(Class.data._id, {
      user: user.email,
    });
    setClasses([...Classes, updatedClass.data]);
  } catch (error) {
    console.log(error.message);
  }
};

//------------------------------- Test Methods -------------------------------

export const createTest = async (newTest) => {
  try {
    await api.createTest(newTest);
    window.location.replace(`${window.location.href}true`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTests = async (code, setTests) => {
  try {
    const res = await api.getTests(code);
    setTests(res.data)
  } catch (error) {
    console.log(error.message);
  }
};
