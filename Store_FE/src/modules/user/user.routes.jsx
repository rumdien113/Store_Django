import { Routes, Route } from 'react-router-dom'
import HomePage from './home/page.home'

const UserRoutes = () => {
    return (
        <main>
            <div>
                <Routes>
                    <Route path='/homepage' element={<HomePage />} />
                </Routes>
            </div>
        </main>
    )
}
export default UserRoutes