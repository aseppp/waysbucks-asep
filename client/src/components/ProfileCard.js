import React, {useState, useEffect, useContext} from 'react'
import { API } from '../config/api'
import { UserContext } from '../context/userContext';


export default function ProfileCard() {
  const [user, setUser] = useState({})
  const [state, dispatch] = useContext(UserContext);

  const getUser = async () => {
    try {
      const response = await API.get('/user/' + state.user.id)
      setUser(response.data.user.userData)
      // console.log(user);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getUser();
    return () => {setUser({})};
  }, [])

  return (
    <div className="">
        <div className='flex'>
          <div className="mr-4 lg:mr-8">
              <img src="/images/users/user.png" alt="" />
          </div>
          <div className="space-y-4">
              <p className="text-yellow-700 font-bold">Full Name</p>
              <p>{user.name}</p>
              <p className="text-yellow-700 font-bold">Email</p>
              <p>{user.email}</p>
          </div>
        </div>
    </div>
  )
}
