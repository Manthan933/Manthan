import axios from 'axios';

const usersUrl = 'http://localhost:5000/users';
const testsUrl = 'http://localhost:5000/tests';
const classroomUrl = 'http://localhost:5000/classrooms';

export const getUser = (email) => axios.get(`${usersUrl}/${email}`);
export const getClasses = (id) => axios.get(`${usersUrl}/${id}/class`);
export const createUser = (newUser) => axios.post(usersUrl, newUser);
export const getTest = (id) => axios.get(`${testsUrl}/${id}`);
export const createTest = (newTest) => axios.post(testsUrl, newTest);
export const updateTest = (id, updatedTest) => axios.patch(`${testsUrl}/${id}`, updatedTest);
export const deleteTest = (id) => axios.delete(`${testsUrl}/${id}`);
export const getClass = (id) => axios.get(`${classroomUrl}/${id}`);
export const getTests = (id) => axios.get(`${classroomUrl}/${id}/tests`);
export const getUsers = (id) => axios.get(`${classroomUrl}/${id}/users`);
export const createClass = (newClass) => axios.post(classroomUrl, newClass);
export const updateClass = (id, updatedClass) => axios.patch(`${classroomUrl}/${id}`, updatedClass);
export const deleteClass = (id) => axios.delete(`${classroomUrl}/${id}`);




