import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      fetchBookings(storedUser.id);
    }
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/booking/user/${userId}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCancelBooking = async (booking) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`http://localhost:8080/booking/cancel/${booking.bookingId}?userId=${user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Booking cancelled successfully");
        fetchBookings(user.id);
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("An error occurred while cancelling booking");
    }
  };

  const isCancelable = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffInTime = checkIn.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays > 7;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} style={styles.card}>
            <p><strong>Hotel:</strong> {booking.hotelName}</p>
            <p><strong>Location:</strong> {booking.hotelLocation}</p>
            <p><strong>Room Type:</strong> {booking.roomType}</p>
            <p><strong>Check-in:</strong> {booking.checkInDate}</p>
            <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>

            {isCancelable(booking.checkInDate) && (
              <button onClick={() => handleCancelBooking(booking)} style={styles.cancelBtn}>
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  cancelBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
