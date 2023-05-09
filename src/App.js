import './App.css';
import UserPage from './UserPage';
import TopTracks from './TopTracks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h2>Top Track Analyzer</h2>
          <button id="user-button">User Page</button>
          <button id="top-button">Top Tracker</button>
          <button id="spotify-button"><a href='http://localhost:8888/login'><img src='../spotify.png' className='spotify-image' alt='Spotify'/></a></button>
        </div>
      </header>
      <UserPage />
      <TopTracks />
    </div>
  );
}

export default App;
