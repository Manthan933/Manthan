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

export const leaveClass = async (id, Class, setClass, deleteAll = false) => {
  try {
      if (deleteAll) {
          if(window.confirm('Are you sure to remove all students from the class?')){
            const res = await api.leaveClass(Class._id, {user: [Class.instructor.email]});
            if(res){
              Class.users = [Class.instructor.email];
              setClass(Class);
            }
          };
      } else {
        const index = Class.users.indexOf(id);
        if (index > -1) {
          Class.users?.splice(index, 1);
        }
        const res = await api.leaveClass(Class._id, {user: Class.users});
        res && setClass(Class);
    }
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

export const deleteClass = async (Class, intructorId, userId , setClasses, admin) => {
  try {
    if (Class.code && admin) {
      if (window.confirm('Are you sure you want to remove this class')) {
        const res = await api.deleteClass(Class.code);
        res && getClasses(intructorId, setClasses)
      }
    } else {
      if(window.confirm('Are you sure you want to leave this class')) {
        leaveClass(userId, Class, setClasses);
      }
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
    const updatedData = updatedClass.data;
    if (Class.data?.users.includes(user.email)) {
      alert('You already joined this class - ' + classCode);
    } else if(user.email === Class.data?.instructor?.email) {
      const joinedClass = Classes.map(x => x.code === classCode ? { ...x,  updatedData} : x);
      setClasses(joinedClass);
    } else {
      setClasses([...Classes, updatedData]);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const editClassDetails = async (Class, Config, Classes, setClasses) => {
  try {
    const Id = await api.getClass(Class.code);
    const res = await api.editClass(Id.data._id, Config);
    const editedClass = res ? Classes.map(x => x.code === Class.code ? { ...x, ...Config } : x) : Classes;
    setClasses(editedClass);
  } catch (error) {
    console.log(error.message);
  }
};

export const editClassDetails = async (Class, Config, Classes, setClasses) => {
  try {
    const Id = await api.getClass(Class.code);
    const res = await api.editClass(Id.data._id, Config);
    const editedClass = res ? Classes.map(x => x.code === Class.code ? { ...x, ...Config } : x) : Classes;
    setClasses(editedClass);
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
