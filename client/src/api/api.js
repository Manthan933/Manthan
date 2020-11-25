import axios from 'axios';
import {classroomsURL, testsURL, usersURL} from '../constants/constants';

export const getUser = (email) => axios.get(`${usersURL}/${email}`);
export const getInstructor = (id) => axios.get(`${usersURL}/id/${id}`)
export const getClasses = (id) => axios.get(`${classroomsURL}/user/${id}`);
export const createUser = (newUser) => axios.post(usersURL, newUser);
export const createClass = (newClass) => axios.post(classroomsURL, newClass);
export const updateUser = (id, updatedUser) => axios.patch(`${usersURL}/${id}`, updatedUser);
export const getClass = (code) => axios.get(`${classroomsURL}/${code}`);
export const updateClass = (id, updatedClass) => axios.patch(`${classroomsURL}/${id}`, updatedClass);


//export const getTest = (id) => axios.get(`${testsUrl}/${id}`);
//export const createTest = (newTest) => axios.post(testsUrl, newTest);
//export const updateTest = (id, updatedTest) => axios.patch(`${testsUrl}/${id}`, updatedTest);
//export const deleteTest = (id) => axios.delete(`${testsUrl}/${id}`);
//export const getTests = (id) => axios.get(`${classroomUrl}/${id}/tests`);
//export const getUsers = (id) => axios.get(`${classroomUrl}/${id}/users`);
//export const createClass = (newClass) => axios.post(classroomUrl, newClass);
//export const deleteClass = (id) => axios.delete(`${classroomUrl}/${id}`);