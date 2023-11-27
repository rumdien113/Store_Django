import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginAuth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name == 'username')
            setUsername(value)
        else if (name == 'password')
            setPassword(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: username,
                password: password
            })
            const token = response.data.token
            console.log(token)
            localStorage.setItem('token', token)
            // localStorage.setItem()
            // if (role == 'admin')
            //     navigate('/admin')
            // else if (role == 'user')
            //     navigate('/user')
            navigate('/homepage')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='h-screen w-screen'>
          <div className='container h-full w-full mx-auto py-24'>
            <div className='gap-6 flex h-full flex-wrap items-center justify-center lg:justify-between'>
              {/* component left */}
              <div className='mb-12 md:mb-0 md:w-8/12 lg:w-6/12'>
                <img 
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" 
                  alt="phone image"
                  className='w-full'
                />
              </div>
              {/* component right */}
              <div className='md:w-8/12 lg:ml-6 lg:w-5/12'>
                <form onSubmit={handleSubmit}>
                  {/* NAME */}
                  <div className='relative mb-6'>
                    <span className='font-sans text-8xl font-semibold font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                      DDatj Store
                    </span>
                  </div>
                  {/* EMAIL INPUT */}
                  <div className='form-field mb-6'>
                    <label 
                      htmlFor='username'
                      className = 'form-label pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-blue-800 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:text-blue-800 peer-focus:bg-white peer-focus:px-1 peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary   '
                    >Email/Username
                    </label>
                    <input 
                      type = 'text' id = 'username' name = 'username' value={username} placeholder=' ' onChange={handleInputChange}
                      className='form-input peer mt-1 block w-full px-5 py-2 text-xl bg-white border border-slate-500 rounded-lg ease-linear shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none peer-focus-within:inline-block peer-focus-within:top-0 peer-focus-within:p-4'
                    />
                  </div>
                  {/* PASSWORD INPUT */}
                  <div className='form-field mb-6'>
                    <label 
                      htmlFor='password'
                      className = 'form-label pointer-events-none left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-blue-800 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:text-blue-800 peer-focus:bg-white peer-focus:px-1 peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-nonedark:peer-focus:text-primary'
                    >Password
                    </label>
                    <input 
                      type = 'password' id = 'password' name = 'password' value={password} placeholder=' ' onChange={handleInputChange}
                      className='form-input peer mt-1 block w-full px-5 py-2 text-xl bg-white border border-slate-500 rounded-lg ease-linear shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none peer-focus-within:inline-block peer-focus-within:top-0 peer-focus-within:p-4'
                    />
                  </div>
                  {/* SUBMIT BUTTON */}
                  <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-full overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="relative px-5 py-2 w-full transition-all text-xl ease-in duration-75 text-black hover:text-white bg-white bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Sign in
                    </span>
                  </button>
    
                  <p className="mb-0 mt-2 pt-1 text-sm font-medium">
                    Don't have an account?
                    <a href="/register" className="text-blue-500 transition duration-150 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-700"> Register </a>
                  </p>
    
                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-600">
                      OR
                    </p>
                  </div>
    
                </form>
              </div>
            </div>
          </div>
        </section>
      )
}

export default LoginAuth