import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginAuth from './user/auth/login.auth'
import RegisterAuth from './user/auth/register.auth'
import UserRoutes from './user/user.routes'

const ModuleRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<UserRoutes />}/>
                <Route path='/login' element={<LoginAuth />}/>
                <Route path='/register' element={<RegisterAuth />}/>
                {/* <Route path='/user' element={<UserRoutes />}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export default ModuleRoutes