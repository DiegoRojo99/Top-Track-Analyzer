import React, { useEffect, useState } from 'react';

function UserPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        localStorage.setItem("access_token",accessToken);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");
        myHeaders.append("Cookie", "spotify_auth_state=tNfUFAQwFDFzgpNG");
        myHeaders.append("Token", accessToken);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        
        const response = await fetch('http://localhost:8888/user', requestOptions);
        const data = await response.json();
        setUserData(data);
    }
    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Data</h1>
      <p>Name: {userData.display_name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserPage;
