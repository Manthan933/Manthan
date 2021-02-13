import axios from "axios";
import { classroomsURL, testsURL } from "../constants/constants";

//--------------- Class API -----------------------

export const getClass = (code) => axios.get(`${classroomsURL}/${code}`);
export const createClass = (newClass) => axios.post(classroomsURL, newClass);
export const getClasses = (id) => axios.get(`${classroomsURL}/user/${id}`);
export const updateClass = (id, updatedClass) => axios.patch(`${classroomsURL}/${id}`, updatedClass);
export const deleteClass = (code) => axios.delete(`${classroomsURL}/${code}`);

//--------------- Test API ------------------------

export const getTests = (code) => axios.get(`${testsURL}/class/${code}`);
export const createTest = (newTest) => axios.post(testsURL, newTest);
