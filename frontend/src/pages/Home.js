import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city) {
      navigate(`/hotels/${encodeURIComponent(city)}`);
    } else {
      alert("Please select a city.");
    }
  };

  const handlePlaceClick = (cityName) => {
    navigate(`/hotels/${encodeURIComponent(cityName)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully.");
    navigate("/login");
  };

  const pageStyles = `
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #fff;
    }
    
    .home-container * {
      box-sizing: border-box;
    }
    
    .home-header {
      background-color: #006680d6;
      color: white;
      padding: 10px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .home-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    .menu {
      display: flex;
      gap: 25px;
      align-items: center;
    }

    .menu .menu-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      font-size: 16px;
    }
    
    .menu .menu-link:hover {
      text-decoration: underline;
    }

    .hero-section {
      background: url('https://www.hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg') no-repeat center center/cover;
      height: 480px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      position: relative;
    }
    
    .hero-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-section h2 {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .hero-section p {
      font-size: 18px;
      margin-bottom: 40px;
    }

    .search-bar-wrapper {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: -40px;
      z-index: 10;
    }

    .search-bar {
      background: white;
      padding: 15px;
      border-radius: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: center;
      width: 80%;
      max-width: 950px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }

    .search-bar > * {
      flex: 1 1 210px;
    }
    
    .search-bar select,
    .search-bar input,
    .search-bar button {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
      height: 48px;
    }

    .search-bar button {
      background: rgb(61, 168, 178);
      color: white;
      font-weight: bold;
      cursor: pointer;
      border: none;
      flex-grow: 0.5;
    }
    
    .search-bar button:hover {
      background: rgb(38, 122, 130);
    }
    
    .date-input {
      color: #333;
    }
    
    .date-input::placeholder {
      color: #757575;
    }

    .places-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 30px;
      max-width: 1400px;
      margin: 40px auto;
    }

    .place {
      text-align: center;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }

    .place:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    .place img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
    }

    .place-link {
      display: block;
      padding: 15px;
      background: #006680d6;
      color: white;
      text-decoration: none;
      font-weight: bold;
    }

    .home-footer {
      background: #006680d6;
      color: white;
      text-align: center;
      padding: 10px;
      margin-top: 10px;
    }

    @media (max-width: 1024px) {
      .places-section {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .hero-section h2 { font-size: 36px; }
      .search-bar { flex-direction: column; width: 90%; }
      .search-bar > * { width: 100%; flex-basis: auto; }
      .places-section {
        grid-template-columns: 1fr;
        padding: 20px;
      }
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="home-container">
        <header className="home-header">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>STAY</span>
            <img src="\hoom.png" alt="Home" style={{ height: '35px' }} />
            <span>SPOT</span>
          </h1>
          <nav className="menu">
            <span className="menu-link" onClick={() => navigate('/login')}>Login</span>
            <span className="menu-link" onClick={() => navigate('/register')}>Register</span>
            <span className="menu-link" onClick={handleLogout}>Logout</span>
          </nav>
        </header>

        <main>
          <section className="hero-section">
            <div className="hero-content">
              <h2>Welcome to StaySpot</h2>
              <p>Find Your Perfect Stay</p>
            </div>
          </section>

          <div className="search-bar-wrapper">
            <div className="search-bar">
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Where to go?</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vijayawada">Vijayawada</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
              </select>
              <input
                className="date-input"
                type="text"
                placeholder="mm/dd/yyyy"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
              <input
                className="date-input"
                type="text"
                placeholder="mm/dd/yyyy"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
              <button onClick={handleSearchClick}>Search</button>
            </div>
          </div>

          <section className="places-section">
            <div className="place" onClick={() => handlePlaceClick('Hyderabad')}>
              <img src="https://wallpaperaccess.com/full/2142440.jpg" alt="Hyderabad" />
              <span className="place-link">Explore Hotels in Hyderabad</span>
            </div>
            <div className="place" onClick={() => handlePlaceClick('Vijayawada')}>
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/b5/db/4f/prakasam-barrage.jpg?w=1400&h=-1&s=1" alt="Vijayawada" />
              <span className="place-link">Explore Hotels in Vijayawada</span>
            </div>
            <div className="place" onClick={() => handlePlaceClick('Visakhapatnam')}>
              <img src="https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2018/01/06/Pictures/_0b56b36a-f2c7-11e7-9d38-90e646082a51.jpg" alt="Visakhapatnam" />
              <span className="place-link">Explore Hotels in Visakhapatnam</span>
            </div>
          </section>
        </main>

        <footer className="home-footer">
          <p>@ StaySpot.com</p>
        </footer>
      </div>
    </>
  );
}
