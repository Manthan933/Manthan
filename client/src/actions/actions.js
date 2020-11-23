import * as api from '../api/api'
export const getUser = (user,setUser) => {
    api.getUser(user.email)
    .then( res => (setUser(res.data)))
    .catch( err => {
      api.createUser(user)
      .then(res => (setUser(res.data))) ;
    })
};

export const getClasses = (id, setClasses) => {
  if(id){
    api.getClasses(id)
    .then(res => (setClasses(res.data)))
    .catch(err => console.log(err.message))
  }
}