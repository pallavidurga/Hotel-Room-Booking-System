import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState({
    roomType: "",
    price: "",
    eminities: "",
    imageUrl: "",
  });
  const [editingRoomId, setEditingRoomId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`http://localhost:8080/rooms/hotel/${hotelId}`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomForm({ ...roomForm, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "ADMIN") {
        alert("Only Admin can add or update rooms.");
        return;
      }

      const method = editingRoomId ? "PUT" : "POST";
      const url = editingRoomId
        ? `http://localhost:8080/rooms/${editingRoomId}?userId=${user.id}`
        : `http://localhost:8080/rooms/${hotelId}?userId=${user.id}`;

      const roomData = {
        ...roomForm,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) throw new Error("Operation failed");

      setRoomForm({
        roomType: "",
        price: "",
        eminities: "",
        imageUrl: "",
      });
      setEditingRoomId(null);
      fetchRooms();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleEditRoom = (room) => {
    setRoomForm({
      roomType: room.roomType,
      price: room.price,
      eminities: room.eminities,
      imageUrl: room.imageUrl,
    });
    setEditingRoomId(room.id);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "ADMIN") {
        alert("Only Admin can delete rooms.");
        return;
      }

      const response = await fetch(`http://localhost:8080/rooms/${roomId}?userId=${user.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");

      fetchRooms();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPane}>
        <h2>{editingRoomId ? "Update Room" : "Add Room"}</h2>
        <form style={styles.form}>
          <input name="roomType" value={roomForm.roomType} onChange={handleInputChange} placeholder="Room Type" required  style={styles.inputBox}/>
          <input name="price" type="number" value={roomForm.price} onChange={handleInputChange} placeholder="Price" required style={styles.inputBox}/>
          <input name="eminities" value={roomForm.eminities} onChange={handleInputChange} placeholder="Amenities (comma separated)" required style={styles.inputBox} />
          <input name="imageUrl" value={roomForm.imageUrl} onChange={handleInputChange} placeholder="Image URL" required style={styles.inputBox}/>
          <button type="button" onClick={handleSubmit} style={styles.button}>
            {editingRoomId ? "Update" : "Add"} Room
          </button>
        </form>
      </div>

      <div style={styles.rightPane}>
        <h2>Rooms</h2>
        <div style={styles.roomList}>
          {rooms.map((room) => (
            <div key={room.id} style={styles.card}>
              <img src={room.imageUrl} alt={room.roomType} style={styles.image} />
              <div style={styles.details}>
                <h2>{room.roomType}</h2><br></br>
                <p><strong>Price:</strong> ₹{room.price}</p>
                <p><strong>Amenities:</strong> {room.eminities}</p>
                <div style={styles.actionButtons}>
                  <button onClick={() => handleEditRoom(room)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDeleteRoom(room.id)} style={styles.deleteBtn}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
  roomList: {
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
    width: "480px",
    height: "200px",
    objectFit: "cover",
    marginRight: "20px",
    borderRadius: "5px",
  },
  details: {
    flex: 1,
  },
  actionButtons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
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
};
