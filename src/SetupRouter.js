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
import TicketAdmin from './components/Admin/Content/Ticket/TicketAdmin';
import PromtionAdmin from './components/Admin/Content/Promotion/PromotionAdmin';
import VoucherAdmin from './components/Admin/Content/Voucher/VoucherAdmin';
import AccountAdmin from './components/Admin/Content/Account/AccountAdmin';
import MovieTypeAdmin from './components/Admin/Content/MovieType/MovieTypeAdmin';
import SeatStatusAdmin from './components/Admin/Content/SeatStatus/SeatStatusAdmin';
import SeatTypeAdmin from './components/Admin/Content/SeatType/SeatTypeAdmin';
import DashBoard from './components/Admin/Content/Dashboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './routes/AdminRoute';
import Forbidden from './components/Common/Error/Forbidden';
import StaffRoute from './routes/StaffRoute';
import RoomAdmin from './components/Admin/Content/Room/RoomAdmin';
import ScheduleAdmin from './components/Admin/Content/Schedule/ScheduleAdmin';
import SeatAdmin from './components/Admin/Content/Seat/SeatAdmin';

const SetupRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />} />
                    <Route path='/movie' element={<Movie />} />
                    <Route path='/cinema' element={<Cinema />} />
                </Route>

                <Route path='/admin' element={
                    <StaffRoute>
                        <Admin />
                    </StaffRoute>
                }>
                    <Route index element={
                        <AdminRoute>
                            <DashBoard />
                        </AdminRoute>
                    } />
                    <Route path='manager-movie' element={
                        <AdminRoute>
                            <MovieAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-cinema' element={
                        <AdminRoute>
                            <CinemaAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-cinema/:id/room' element={
                        <AdminRoute>
                            <RoomAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-ticket' element={
                        <AdminRoute>
                            <TicketAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-schedule' element={
                        <AdminRoute>
                            <ScheduleAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-promotion' element={
                        <AdminRoute>
                            <PromtionAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-voucher' element={
                        <AdminRoute>
                            <VoucherAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-account' element={
                        <AdminRoute>
                            <AccountAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-movieType' element={
                        <AdminRoute>
                            <MovieTypeAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-seat' element={
                        <AdminRoute>
                            <SeatAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-seatStatus' element={
                        <AdminRoute>
                            <SeatStatusAdmin />
                        </AdminRoute>
                    } />
                    <Route path='manager-seatType' element={
                        <AdminRoute>
                            <SeatTypeAdmin />
                        </AdminRoute>
                    } />
                    {/* <Route path='manager-room' element={
                        <AdminRoute>
                            <RoomAdmin />
                        </AdminRoute>
                    } /> */}

                    <Route path='bill' element={<MovieTypeAdmin />} />
                    <Route path='counter-sale' element={<MovieTypeAdmin />} />
                </Route>


                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forbideen' element={<Forbidden />} />

                <Route path='*' element={<NotFound />} />
            </Routes >

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>

    )
}

export default SetupRouter

