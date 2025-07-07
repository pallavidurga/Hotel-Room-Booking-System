import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function RoomList() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRoomKeyword, setSelectedRoomKeyword] = useState("");
  const navigate = useNavigate();

  const availableAmenities = ["free Wifi", "spa", "AC", "gym", "pool", "balcony view", "TV"];
  const roomKeywords = ["Single", "Double", "King Bed", "Superior", "Deluxe", "Suite"];

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, [hotelId]);

  const fetchRooms = () => {
    axios
      .get(`http://localhost:8080/rooms/hotel/${hotelId}`)
      .then((res) => {
        setRooms(res.data);
        setFilteredRooms(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = () => {
    let filtered = [...rooms];

    if (minPrice) filtered = filtered.filter((room) => room.price >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter((room) => room.price <= parseFloat(maxPrice));
    if (selectedRoomKeyword) {
      const keywordLower = selectedRoomKeyword.toLowerCase();
      filtered = filtered.filter((room) => room.roomType.toLowerCase().includes(keywordLower));
    }
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((room) => {
        const roomAmenities = room.eminities ? room.eminities.split(",").map((a) => a.trim()) : [];
        return selectedAmenities.every((amenity) => roomAmenities.includes(amenity));
      });
    }
    setFilteredRooms(filtered);
  };

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    if (selectedAmenities.includes(value)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== value));
    } else {
      setSelectedAmenities([...selectedAmenities, value]);
    }
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedAmenities([]);
    setSelectedRoomKeyword("");
    setFilteredRooms(rooms);
  };

  return (
    <div style={{ maxWidth: "1300px", margin: "20px auto", display: "flex", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h3>Price Range (₹)</h3>
        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "15px" }} />

        <h3>Room Type Keyword</h3>
        {roomKeywords.map((keyword) => (
          <div key={keyword} style={{ marginBottom: "8px" }}>
            <input type="radio" id={keyword} name="roomKeyword" value={keyword} checked={selectedRoomKeyword === keyword} onChange={(e) => setSelectedRoomKeyword(e.target.value)} />
            <label htmlFor={keyword} style={{ marginLeft: "8px" }}>{keyword}</label>
          </div>
        ))}

        <h3 style={{ marginTop: "20px" }}>Amenities</h3>
        {availableAmenities.map((amenity) => (
          <div key={amenity} style={{ marginBottom: "8px" }}>
            <input type="checkbox" id={amenity} value={amenity} checked={selectedAmenities.includes(amenity)} onChange={handleAmenityChange} />
            <label htmlFor={amenity} style={{ marginLeft: "8px" }}>{amenity}</label>
          </div>
        ))}

        <button onClick={handleFilter} style={{ width: "100%", padding: "10px", backgroundColor: "#0071c2", color: "white", border: "none", marginTop: "15px", cursor: "pointer" }}>Apply Filter</button>
        <button onClick={handleReset} style={{ width: "100%", padding: "10px", backgroundColor: "#aaa", color: "white", border: "none", marginTop: "10px", cursor: "pointer" }}>Reset</button>
      </div>

      <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredRooms.map((room) => (
          
          <div key={room._id} style={{ display: "flex", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: "15px", position: "relative" }}>
            <img src={room.imageUrl} alt={room.roomType} style={{ width: "490px", height: "230px", objectFit: "cover" }} />
            <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{room.roomType}</h3>
              <p style={{ marginBottom: "5px" }}><strong>Price:</strong> ₹{room.price}</p>
              <div>
                <strong>Amenities:</strong>
                <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                  {room.eminities && room.eminities.split(",").map((amenity, idx) => (<li key={idx}>{amenity.trim()}</li>))}
                </ul>
              </div>
              <button
      onClick={() => {
        console.log("Navigating to Booking with Room ID:", room._id); // Add this line
        navigate(`/book/${room._id || room.id}`);
      }}
      style={{
        position: "absolute",
        bottom: "15px",
        right: "15px",
        padding: "10px",
        backgroundColor: "#0071c2",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      Book Now
    </button> 
            </div>
          </div>
        ))}

        {filteredRooms.length === 0 && <p>No rooms found matching your criteria.</p>}
      </div>
    </div>
  );
}
