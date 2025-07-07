import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookingsPage() {
  const { hotelId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/booking/hotel/${hotelId}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Bookings for the Hotel </h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this hotel.</p>
      ) : (
        <div style={styles.bookingList}>
          {bookings.map((booking, index) => (
            <div key={index} style={styles.card}>
              <p><strong>Hotel:</strong> {booking.hotelName}</p>
              <p><strong>Room Type:</strong> {booking.roomType}</p>
              <p><strong>Check-In:</strong> {booking.checkInDate}</p>
              <p><strong>Check-Out:</strong> {booking.checkOutDate}</p>
              <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  bookingList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
};
