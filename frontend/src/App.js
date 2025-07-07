import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import RoomList from "./pages/RoomList";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import LogoutButton from "./pages/LogoutButton";
import AdminPage from "./pages/AdminPage";
import RoomPage from "./pages/RoomPage";
import BookingsPage from "./pages/BookingsPage";


export default function App() {
  // The global navigation has been removed from this file.
  // Each page component (like Home.js) is now responsible for its own header.
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:location" element={<HotelList />} />
        <Route path="/hotel/:hotelId" element={<RoomList />} />
        <Route path="/book/:roomId" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route path="/mybookings" element={<MyBookings />} />
       <Route path="/admin" element={<AdminPage />} />
       <Route path="/rooms/:hotelId" element={<RoomPage />} />
        <Route path="/bookings/:hotelId" element={<BookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}