import React, { useEffect, useState } from 'react';
import { Carousel, Card } from 'react-bootstrap';

async function getTopArtists(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', { headers });
  const data = await response.json();
  return data.items;
}

function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var at = localStorage.getItem("access_token");
      if (at !== undefined && at !== null) {
        var accessToken = at;
      } else {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        localStorage.setItem("access_token", accessToken);
      }

      const data = await getTopArtists(accessToken);
      setTopArtists(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Top Artists</h1>
      <Carousel indicators={false} interval={5000}>
        {topArtists.map((artist, index) => (
          <Carousel.Item key={index}>
            <Card>
              <Card.Img variant="top" src={artist.images[0].url} />
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Card.Text>
                  {console.log(artist)}
                  {artist.followers.total} followers
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default TopArtists;
