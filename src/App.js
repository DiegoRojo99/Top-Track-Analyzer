import './App.css';
import UserPage from './UserPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button><a href='http://localhost:8888/login'>Spotify Login</a></button>
        <button><a href='http://localhost:8888/user'>User Page</a></button>
      </header>
      <UserPage />
    </div>
  );
}

export default App;
