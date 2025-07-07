import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
    address: "",
    rating: "",
    phoneno: "",
    imageUrl: ""
  });
  const [editingHotelId, setEditingHotelId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    } else {
      fetchHotels();
    }
  }, [navigate]);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:8080/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelForm({ ...hotelForm, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const method = editingHotelId ? "PUT" : "POST";
      const url = editingHotelId
        ? `http://localhost:8080/hotels/${editingHotelId}?userId=${user.id}`
        : `http://localhost:8080/hotels?userId=${user.id}`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelForm),
      });

      if (!response.ok) throw new Error("Operation failed");

      setHotelForm({
        name: "",
        location: "",
        address: "",
        rating: "",
        phoneNo: "",
        imageUrl: ""
      });
      setEditingHotelId(null);
      fetchHotels();
    } catch (error) {
      console.error("Error:", error);
    }
  };

 const handleEditHotel = (hotel) => {
  setHotelForm({
    name: hotel.name,
    location: hotel.location,
    address: hotel.address,
    rating: hotel.rating,
    phoneno: hotel.phoneno,   // If backend sends 'phone'
    imageUrl: hotel.imageUrl
  });
  setEditingHotelId(hotel.id);
};


  const handleDeleteHotel = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:8080/hotels/${id}?userId=${user.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      fetchHotels();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleManageRooms = (hotelId) => {
    navigate(`/rooms/${hotelId}`);
  };

  const handleViewBookings = (hotelId) => {
    navigate(`/bookings/${hotelId}`);
  };

  return (
    <div style={styles.container}>
      {/* Form Section */}
      <div style={styles.leftPane}>
        <h2>{editingHotelId ? "Update Hotel" : "Add Hotel"}</h2>
        <form style={styles.form}>
  <input name="name" value={hotelForm.name} onChange={handleInputChange} placeholder="Hotel Name" required style={styles.inputBox} />
  <input name="location" value={hotelForm.location} onChange={handleInputChange} placeholder="Location" required style={styles.inputBox} />
  <input name="address" value={hotelForm.address} onChange={handleInputChange} placeholder="Address" required style={styles.inputBox} />
  <input name="rating" type="number" value={hotelForm.rating} onChange={handleInputChange} placeholder="Rating" required style={styles.inputBox} />
  <input name="phoneno" value={hotelForm.phoneno} onChange={handleInputChange} placeholder="Phone Number" required style={styles.inputBox} />
  <input name="imageUrl" value={hotelForm.imageUrl} onChange={handleInputChange} placeholder="Image URL" required style={styles.inputBox} />
  <button type="button" onClick={handleSubmit} style={styles.button}>
    {editingHotelId ? "Update" : "Add"} Hotel
  </button>
</form>

      </div>

      {/* Hotel List Section */}
      <div style={styles.rightPane}>
        <h2>Existing Hotels</h2>
        <div style={styles.hotelList}>
          {hotels.map((hotel) => (
            <div key={hotel.id} style={styles.card}>
              <img src={hotel.imageUrl} alt={hotel.name} style={styles.image} />
              <div style={styles.details}>
                <h2>{hotel.name}</h2><br></br>
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Address:</strong> {hotel.address}</p>
                <p><strong>Rating:</strong> {hotel.rating}</p>
                <p><strong>Phone:</strong> {hotel.phoneno}</p>
                <div style={styles.actionButtons}>
                  <button onClick={() => handleEditHotel(hotel)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDeleteHotel(hotel.id)} style={styles.deleteBtn}>Delete</button>
                  <button onClick={() => handleManageRooms(hotel.id)} style={styles.roomBtn}>Rooms</button>
                  <button onClick={() => handleViewBookings(hotel.id)} style={styles.bookingBtn}>Bookings</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  leftPane: {
    flex: 1,
    marginRight: "40px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#f9f9f9",
  },
  rightPane: {
    flex: 2,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  inputBox: {
  height: "40px",
  padding: "8px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
},

  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  hotelList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    display: "flex",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  image: {
    width: "450px",
    height: "200px",
    objectFit: "cover",
    marginRight: "20px",
    borderRadius: "5px",
  },
  details: {
    flex: 1,
  },
  actionButtons: {
    marginTop: "20px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    
  },
  editBtn: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
     fontSize: "16px", 
  },
  deleteBtn: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
     fontSize: "16px", 
  },
  roomBtn: {
    padding: "5px 10px",
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
     fontSize: "16px", 
  },
  bookingBtn: {
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "5px",
     fontSize: "16px", 
  }
};

export default AdminPage;
