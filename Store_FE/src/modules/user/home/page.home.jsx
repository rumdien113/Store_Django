import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('token')
                console.log(token)
                const response = await axios.get('http://localhost:8000/api/get-account/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                })
                console.log(response.data)
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div>
            <div key={user.id}>
                <p>{user.email}</p>
                <p>{user.username}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
                <p>{user.role}</p>
            </div>
            <button onClick={handleLogout}>
                logout
            </button>
        </div>
    )
}

export default HomePage