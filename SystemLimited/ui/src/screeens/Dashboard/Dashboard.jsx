import React, { useEffect } from 'react'
import {useAuth} from '../../context/Auth'
import { useNavigate } from 'react-router-dom'


  


const Dashboard = () => {

    const navigate  = useNavigate()
    const[auth,setAuth] = useAuth()

    useEffect(()=>{
         !auth?.token && (location.href = "/login")
    },[[auth, navigate]])

    const Logout = () =>{
      localStorage.removeItem("auth")
      setAuth(null)
      navigate("/login")

    }
  return (
    <div>
      
        {
            auth?.user?.first_name
        }

        <br />
        <br />
        <button className='p-4 bg-red-500'onClick={Logout}>LogOut</button>

    </div>
  )
}

export default Dashboard
