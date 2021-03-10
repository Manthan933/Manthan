import * as api from "../api/api";

// ---------------------------- Class Methods ------------------------------
export const createClass = async (Class, user, Classes, setClasses) => {
  try {
    const newClass = {
      name: Class.name,
      subcode: Class.subcode,
      subject: Class.subject,
      instructor: { name: user.username, email: user.email },
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

export const getClasses = async (user, setClasses) => {
  try {
    if (user) {
      const res = await api.getClasses(user);
      setClasses(res.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const joinClass = async (user, Classes, setClasses, classCode) => {
  try {
    const Class = await api.getClass(classCode);
    if (
      Class.data.users.find((element) => {
        return user.email === element;
      })
    ) {
      alert("Already joined the class.");
    } else {
      const joinedClass = await api.joinClass(classCode, {
        user: user.email,
      });
      setClasses([...Classes, joinedClass.data]);
    }
  } catch (error) {
    alert("Class does not exist.");
  }
};

export const deleteClass = async (code, user, setClasses) => {
  try {
    if (window.confirm("Are you sure you want to delete the classroom ? ")) {
      await api.deleteClass(code);
      getClasses(user, setClasses);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const editClassDetails = async (Class, Config, user, setClasses) => {
  try {
    await api.editClass(Class.code, Config);
    getClasses(user, setClasses);
  } catch (error) {
    console.log(error.message);
  }
};

export const leaveClass = async (code, user, setClasses) => {
  try {
    if (window.confirm("Are you sure you want to leave the classroom ? ")) {
      await api.leaveClass(code, { user: user });
      getClasses(user, setClasses);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const removeStudents = async (
  code,
  user,
  instructor,
  deleteAll,
  setClass
) => {
  try {
    if (deleteAll) {
      if (
        window.confirm(
          "Are you sure you want to remove all students from classroom ? "
        )
      ) {
        await api.leaveClass(code, { user: user });
        await api.joinClass(code, { user: instructor.email });
        getClass(code, setClass);
      }
    } else {
      if (
        window.confirm(
          "Are you sure you want to remove " + user + " form classroom ? "
        )
      ) {
        await api.leaveClass(code, { user: user });
        getClass(code, setClass);
      }
    }
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


export const removeTest=async(id)=>{
  try{
    await api.removeTest(id);
  }
  catch (error) {
    console.log(error.message);
  }
}

export const getTests = async (code, setTests) => {
  try {
    const res = await api.getTests(code);
    setTests(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const startTest = async (testId, setTest) => {
  try {
    if (testId) {
      const res = await api.startTest(testId);
      setTest(res.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const submitTest = async (testId, response, user) => {
  try {
    if (window.confirm("Are you sure you want to submit ? ")) {
      const data = { user: user, response: response };
      await api.submitTest(testId, data);
      window.location.replace(`/`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
