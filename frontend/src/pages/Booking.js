import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login to book rooms");
      navigate("/login");
      return;
    }

    // If user.id is missing, fetch user by email
    if (!user.id && user.email) {
      axios
        .get("http://localhost:8080/auth/getUserId", {
          params: { email: user.email },
        })
        .then((res) => {
          const updatedUser = { ...user, id: res.data };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.location.reload(); // Reload to ensure updated user used
        })
        .catch((err) => console.error("Failed to fetch user ID", err));
    }

    if (roomId) {
      axios
        .get(`http://localhost:8080/rooms/${roomId}`)
        .then((res) => setRoom(res.data))
        .catch((err) => console.error("Error fetching room:", err));
    }
  }, [roomId, navigate, user]);

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !room) return 0;

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays * room.price : 0;
  };

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    if (start >= end) {
      alert("Check-out date must be after check-in date");
      return;
    }

    axios
      .post("http://localhost:8080/booking/book", null, {
        params: {
          userId: user.id,
          roomId: roomId,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        },
      })
      .then(() => setShowSuccessPopup(true))
      .catch(() => {
        alert("Booking failed");
      });
  };

  const pageStyles = `
    .booking-page-wrapper { position: relative; width: 100%; height: 100vh; overflow: hidden; background: white; }
    .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .booking-modal-box { background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 420px; text-align: center; z-index: 1001; }
    .booking-modal-box h2 { font-size: 28px; font-weight: 600; color: #2d3748; margin-bottom: 30px; }
    .booking-modal-box input { width: 100%; padding: 14px 16px; margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 16px; box-sizing: border-box; }
    .booking-modal-box input:focus { outline: none; border-color: rgba(47, 133, 141, 0.5); box-shadow: 0 0 0 2px rgba(47, 133, 141, 0.2); }
    .booking-modal-box button { width: 100%; padding: 14px; border: none; border-radius: 8px; background-color: rgba(47, 133, 141, 1); color: white; font-size: 16px; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
    .booking-modal-box button:hover { background-color: rgba(38, 110, 115, 1); }
    .total-price { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
    .success-popup { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); text-align: center; }
    .success-popup h3 { margin-bottom: 20px; }
    .success-popup button { padding: 12px 20px; background-color: #0071c2; color: white; border: none; cursor: pointer; border-radius: 4px; }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="booking-page-wrapper">
        <div className="modal-overlay" onClick={() => navigate(-1)}>
          <div className="booking-modal-box" onClick={(e) => e.stopPropagation()}>
            {room ? (
              <>
                <h2>Book {room.roomType}</h2>
                <p>Price per night: ₹{room.price}</p>

                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                />

                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />

                <p className="total-price">Total Price: ₹{calculateTotalPrice()}</p>

                <button onClick={handleBooking}>Confirm Booking</button>
              </>
            ) : (
              <p>Loading room details...</p>
            )}
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="modal-overlay">
          <div className="success-popup">
            <h3>Room Booked Successfully!</h3>
            <button onClick={() => navigate("/mybookings")}>Go to My Bookings</button>
          </div>
        </div>
      )}
    </>
  );
}
