import axios from "axios";
import { classroomsURL, testsURL } from "../constants/constants";

//--------------- Class API -----------------------

export const createClass = (newClass) => axios.post(classroomsURL, newClass);
export const getClass = (code) => axios.get(`${classroomsURL}/${code}`);
export const getClasses = (user) => axios.get(`${classroomsURL}/user/${user}`);
export const joinClass = (code, user) => axios.patch(`${classroomsURL}/${code}`, user);
export const deleteClass = (code) => axios.delete(`${classroomsURL}/${code}`);
export const editClass = (id, updatedClass) => axios.put(`${classroomsURL}/${id}`, updatedClass);
export const leaveClass = (code, updatedClass) => axios.patch(`${classroomsURL}/${code}/leave`, updatedClass);

//--------------- Test API ------------------------

export const getTests = (code) => axios.get(`${testsURL}/class/${code}`);
export const createTest = (newTest) => axios.post(testsURL, newTest);
export const startTest = (testId) => axios.get(`${testsURL}/${testId}/start`);
export const submitTest = (testId,response) => axios.patch(`${testsURL}/${testId}`, response);
export const removeTest=(testId)=>axios.delete(`${testsURL}/${testId}`);
