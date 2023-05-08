import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button><a href='http://localhost:8888/login'>spotify</a></button>
      </header>
    </div>
  );
}

async function logInSpotify() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:8888/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export default App;
