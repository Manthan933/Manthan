import * as api from '../api/api'
export const getUser = async (user,setUser) => {
  try {
    const res = await api.getUser(user.email);
  if(res.data){
    setUser(res.data);
  }
  else{
    const res = await api.createUser(user);
    setUser(res.data);
  }
  } catch (error) {
    console.log(error.message);
  }
};

export const getClasses = async (id, setClasses) => {
  try {
    if(id){
      const res = await api.getClasses(id);
      setClasses(res.data); 
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const createClass = async (Class,user,Classes, setClasses) => {
  try {
    const newClass = {name : Class.name, subcode: Class.subcode, subject: Class.subject, instructor: user.username, image: user.image, users: [user._id]};
    const res = await api.createClass(newClass);
    setClasses([...Classes,res.data])
  } catch (error) {
    console.log(error.message);
  }
}

export const getInstructor = async (id,setInstructor)=>{
  try {
    const res = await api.getInstructor(id);
    setInstructor(res.data);
  } catch (error) {
    console.log(error.message);
  }
}

export const joinClass = async ( user, Classes, setClasses,classCode) => {
  try {
    const Class = await api.getClass(classCode);
    await api.updateUser(user._id,{classId:Class.data._id});
    const updatedClass = await api.updateClass(Class.data._id,{userId: user._id});
    setClasses([...Classes,updatedClass.data]);
  } catch (error) {
    console.log(error.message);
  }
}