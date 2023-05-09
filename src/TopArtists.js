import React, { useEffect, useState } from 'react';

function ShowArtist(a, ind) {

  var artist = a.artist;
  var artistImage = artist.images[0].url;

  return (
    <div className="col song" key={ind}>
      {artistImage ? (
        <img
          className="song-icon"
          src={artistImage}
          title={artist.name}
          alt={artist.name}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );

}

function TopArtists() {
  const [userArtists, setUserArtists] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchArtistsData() {
        var at=localStorage.getItem("access_token");
        if(at!==undefined && at!==null){
          var accessToken=at;
        }else{          
          const params = new URLSearchParams(window.location.search);
          const accessToken = params.get('access_token');
          localStorage.setItem("access_token",accessToken);
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");
        myHeaders.append("Cookie", "spotify_auth_state=tNfUFAQwFDFzgpNG");
        myHeaders.append("Authorization", 'Bearer '+accessToken);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=48', requestOptions);
        if(response.status===200){
          const data = await response.json();
          setUserArtists(data);
          if(data!==null && data.items!==null && data.items!==undefined){
            var rs = [];
            var res = [];
            {data.items.forEach((artist, index) => {
              rs.push(
                <ShowArtist artist={artist} index={index}/>
              )
            })
            }
          res.push(<div className='row'>{rs}</div>)
          setResults(res);
          }
        }else{
          if(response.status===403){
            window.alert("OAuth is not valid");
          }else if(response.status===401){
            window.alert("User is not authorized");
          }else if(response.status===429){
            window.alert("Rate limit passed");
          }else{
            window.alert("Unexpected error");
          }
          console.log("Not working");
        }
    }
    fetchArtistsData();
  }, []);

  if (!userArtists) {
    return <div id='top-artists-div'>Loading...</div>;
  }

  function showTopPage(){
    document.getElementById("user-data-div").style.display="none";
    document.getElementById("top-artists-div").style.display="block";
    document.getElementById("top-tracks-div").style.display="none";
  }
  document.getElementById("artist-button").onclick=showTopPage;

  return (
    <div id='top-artists-div'>
      <h1>Top Artists</h1>
        {results}
    </div>
  );
}

export default TopArtists;
