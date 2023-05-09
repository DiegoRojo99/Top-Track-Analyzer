import './App.css';
import UserPage from './UserPage';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';

function App() {
  var limit=7;
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h2>Top Track Analyzer</h2>
          <button id="user-button">User Page</button>
          <button id="tracks-button">Top Tracks</button>
          <button id="artist-button">Top Artists</button>
          <button id="spotify-button"><a href='http://localhost:8888/login'><img src='../spotify.png' className='spotify-image' alt='Spotify'/></a></button>
        </div>
      </header>
      <UserPage />
      <TopTracks limit={limit}/>
      <TopArtists limit={limit}/>
    </div>
  );
}

export default App;
