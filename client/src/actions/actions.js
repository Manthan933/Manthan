import * as api from "../api/api";
export const getUser = async (user, setUser) => {
  try {
    const res = await api.getUser(user.email);
    if (res.data) {
      setUser(res.data);
    } else {
      const res = await api.createUser(user);
      setUser(res.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};
// ---------------------------- Class Methods ------------------------------
export const createClass = async (Class, user, Classes, setClasses) => {
  try {
    const newClass = {
      name: Class.name,
      subcode: Class.subcode,
      subject: Class.subject,
      instructor: user.username,
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

export const getInstructor = async (id, setInstructor) => {
  try {
    const res = await api.getInstructor(id);
    setInstructor(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const joinClass = async (user, Classes, setClasses, classCode) => {
  try {
    const Class = await api.getClass(classCode);
    console.log(user.email);
    const updatedClass = await api.updateClass(Class.data._id, {
      user: user.email,
    });
    setClasses([...Classes, updatedClass.data]);
  } catch (error) {
    console.log(error.message);
  }
};

//------------------------------- Test Methods -------------------------------

export const createTest = async (newTest, Tests, setTests) => {
  try {
    const res = await api.createTest(newTest);
    setTests([...Tests, res.data]);
  } catch (error) {
    console.log(error.message);
  }
};
