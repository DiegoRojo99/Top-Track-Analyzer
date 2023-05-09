import React, { useEffect, useState } from 'react';

function ShowTrack(track, index){
  var art=[];
  if(track.artists!==null && track.artists!==undefined){
    {track.artists.forEach((artist, index) => {
      art.push(
        <span>{artist.name}&nbsp;&nbsp;</span>
      )
    })
    }
  }

  return(
    <div className='col song' key={index}>
      <p>{track.name}</p>
      {art}
    </div>
    )
}

function TopTracks() {
  const [userTracks, setUserTracks] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
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
        
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', requestOptions);
        if(response!==""){
          const data = await response.json();
          console.log(data.items);
          setUserTracks(data);
          if(data!==null && data.items!==null && data.items!==undefined){
            var rs = [];
            var res = [];
            {data.items.forEach((track, index) => {
              rs.push(
                ShowTrack(track, index)
              )
              if((index+1)%5===0){
                res.push(<div className='row'>{rs}</div>)
                rs=[];
              }
            })
            }
          setResults(res);
          }
        }else{
          console.log("Not Working");
          console.log(response);
        }
    }
    fetchUserData();
  }, []);

  if (!userTracks) {
    return <div id='top-tracks-div'>Loading...</div>;
  }

  return (
    <div id='top-tracks-div'>
      <h1>Top Tracks</h1>
        {results}
    </div>
  );
}

export default TopTracks;
