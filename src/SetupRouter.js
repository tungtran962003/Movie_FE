import App from './App';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Cinema from './components/Common/Cinema/Cinema';
import NotFound from './components/Common/Error/NotFound';
import Home from './components/Common/Home/Home';
import Movie from './components/Common/Movie/Movie';
import Admin from './components/Admin/Admin'
import {
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
    useLoaderData
} from "react-router-dom";
import MovieAdmin from './components/Admin/Content/Movie/MovieAdmin';
import CinemaAdmin from './components/Admin/Content/Cinema/CinemaAdmin';
import DashBoard from './components/Admin/Content/Dashboard';

const SetupRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<App />} >
                <Route index element={<Home />} />
                <Route path='/movie' element={<Movie />} />
                <Route path='/cinema' element={<Cinema />} />
            </Route>

            <Route path='/admin' element={<Admin />}>
                <Route index element={<DashBoard />} />
                <Route path='manager-movie' element={<MovieAdmin />} />
                <Route path='manager-cinema' element={<CinemaAdmin />} />
            </Route>


            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route path='*' element={<NotFound />} />
        </Routes >
    )
}

export default SetupRouter

