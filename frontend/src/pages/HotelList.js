import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function HotelList() {
  const { location } = useParams();
  const [hotels, setHotels] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();

  const areaOptions = {
    Hyderabad: ["Hitech City", "Shamshabad", "Konda Nagar", "Madhuranagar", "Banjara Hills"],
    Vijayawada: ["Benz Circle", "Governor Peta", "Gunadala", "Venkateswarapuram", "Enikepadu"],
    Visakhapatnam: ["Ram Nagar", "Maharanipeta", "Dabagardens", "Suryabagh", "VIP Road", "Dondaparthy"],
  };

  const ratingOptions = ["1+", "2+", "3+", "4+", "5"];
  const popularAreas = areaOptions[location] || [];

  useEffect(() => {
    fetchHotelsByLocation();
    setSelectedAddress("");
    // eslint-disable-next-line 
  }, [location]);

  const fetchHotelsByLocation = () => {
    axios
      .get(`http://localhost:8080/hotels/filter`, { params: { location } })
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = () => {
    const params = { location };

    if (searchName.trim()) params.name = searchName;
    if (selectedRating) params.minRating = selectedRating.replace("+", "");
    if (selectedAddress) params.address = selectedAddress;

    axios
      .get("http://localhost:8080/hotels/filter", { params })
      .then((res) => setHotels(res.data))
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    setSearchName("");
    setSelectedRating("");
    setSelectedAddress("");
    fetchHotelsByLocation();
  };

  const handleAddressChange = (e) => {
    if (selectedAddress === e.target.value) {
      setSelectedAddress("");
    } else {
      setSelectedAddress(e.target.value);
    }
  };

  const handleRatingChange = (e) => {
    if (selectedRating === e.target.value) {
      setSelectedRating("");
    } else {
      setSelectedRating(e.target.value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "1300px",
        margin: "20px auto",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h3>Property Name</h3>
        <br />
        <input
          type="text"
          placeholder="enter hotel name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        />

        <h3 style={{ marginBottom: "10px" }}>Filter by Rating</h3>
        {ratingOptions.map((rating) => (
          <div key={rating} style={{ marginBottom: "8px" }}>
            <input
              type="radio"
              id={rating}
              name="rating"
              value={rating.replace("+", "")}
              checked={selectedRating === rating.replace("+", "")}
              onChange={handleRatingChange}
            />
            <label htmlFor={rating} style={{ marginLeft: "8px" }}>
              {rating}
            </label>
          </div>
        ))}

        {popularAreas.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Filter by Popular Areas</h3>
            {popularAreas.map((area) => (
              <div key={area} style={{ marginBottom: "8px" }}>
                <input
                  type="radio"
                  id={area}
                  name="address"
                  value={area}
                  checked={selectedAddress === area}
                  onChange={handleAddressChange}
                />
                <label htmlFor={area} style={{ marginLeft: "8px" }}>
                  {area}
                </label>
              </div>
            ))}
          </>
        )}

        <button
          onClick={handleFilter}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0071c2",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Apply Filter
        </button>

        <button
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#aaa",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => navigate(`/hotel/${hotel.id}`)}
            style={{
              display: "flex",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <img
              src={hotel.imageUrl || `https://source.unsplash.com/300x200/?hotel,${hotel.name}`}
              alt={hotel.name}
              style={{ width: "480px", height: "230px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "5px" }}>{hotel.name}</h2>
              <p style={{ color: "#555", marginBottom: "5px" }}>{hotel.location}</p>
              <p style={{ color: "green", fontSize: "16px", marginBottom: "5px" }}>{hotel.address}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Rating: <strong>{hotel.rating}</strong>
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>Phone: {hotel.phoneno}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
