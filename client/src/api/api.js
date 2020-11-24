import axios from 'axios';

//https://manthanapi.herokuapp.com
//http://localhost:5000
const usersUrl = 'http://localhost:5000/users';
const testsUrl = 'http://localhost:5000/tests';
const classroomUrl = 'http://localhost:5000/classrooms';

export const getUser = (email) => axios.get(`${usersUrl}/${email}`);
export const getInstructor = (id) => axios.get(`${usersUrl}/id/${id}`)
export const getClasses = (id) => axios.get(`${classroomUrl}/user/${id}`);
export const createUser = (newUser) => axios.post(usersUrl, newUser);
export const createClass = (newClass) => axios.post(classroomUrl, newClass);


//export const getTest = (id) => axios.get(`${testsUrl}/${id}`);
//export const createTest = (newTest) => axios.post(testsUrl, newTest);
export const updateUser = (id, updatedUser) => axios.patch(`${usersUrl}/${id}`, updatedUser);
//export const updateTest = (id, updatedTest) => axios.patch(`${testsUrl}/${id}`, updatedTest);
//export const deleteTest = (id) => axios.delete(`${testsUrl}/${id}`);
export const getClass = (code) => axios.get(`${classroomUrl}/${code}`);
//export const getTests = (id) => axios.get(`${classroomUrl}/${id}/tests`);
//export const getUsers = (id) => axios.get(`${classroomUrl}/${id}/users`);
//export const createClass = (newClass) => axios.post(classroomUrl, newClass);
export const updateClass = (id, updatedClass) => axios.patch(`${classroomUrl}/${id}`, updatedClass);
//export const deleteClass = (id) => axios.delete(`${classroomUrl}/${id}`);