"use client"
import { useEffect, useState } from 'react'

export default function page() {

    const [users, setUsers] = useState([])


    const fetchFromDB = async () => {
        const res = await fetch('api/users')
        const users = await res.json
        return users
    }


    useEffect(() => {
        
        const test = fetchFromDB()
        setUsers(test)


    }, [])
    





  return (
    <div>
        <h1>Users</h1>
        {users.map((user:any) => (

            <div key={user._id}>

                <h2>{user.name}</h2>
                <h2>{user.email}</h2>

            </div>


        ))}
    </div>
  )
}
