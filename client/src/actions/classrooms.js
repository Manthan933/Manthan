import * as api from '../api/classroom';

export const get = (id,setClass) => {
  
  api.get(id)
  .then(res=>(setClass(res.data)))
  .catch(err=>(console.log(err.message)))
  
};

