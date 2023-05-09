import React, { useEffect, useState } from 'react';

function ShowTrack(tracker) {
  var track = tracker.track;
  var index = tracker.index;
  var trackImage = track.album.images[0].url;

  var art = [];
  if (track.artists !== null && track.artists !== undefined) {
    track.artists.forEach((artist, index) => {
      art.push(<p className='song-title' key={index}>{artist.name}&nbsp;&nbsp;</p>);
    });
  }

  return (
    <div className="col song" key={index}>
      {trackImage ? (
        <img
          className="song-icon"
          src={trackImage}
          title={track.name}
          alt={track.name}
        />
      ) : (
        <div>Loading...</div>
      )}
      <br/>
      {art}
    </div>
  );
}

function TopTracks() {
  const [userTracks, setUserTracks] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchTracksData() {
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
        
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=48', requestOptions);
        if(response.status===200){
          const data = await response.json();
          setUserTracks(data);
          if(data!==null && data.items!==null && data.items!==undefined){
            var rs = [];
            var res = [];
            {data.items.forEach((track, index) => {
              rs.push(
                <ShowTrack track={track}/>
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
    fetchTracksData();
  }, []);

  if (!userTracks) {
    return <div id='top-tracks-div'>Loading...</div>;
  }

  function showTopPage(){
    document.getElementById("user-data-div").style.display="none";
    document.getElementById("top-tracks-div").style.display="block";
  }
  document.getElementById("top-button").onclick=showTopPage;

  return (
    <div id='top-tracks-div'>
      <h1>Top Tracks</h1>
        {results}
    </div>
  );
}

export default TopTracks;
