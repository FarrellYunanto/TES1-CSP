import { useEffect, useState } from "react";

function UserProfile({ selectedUserId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!selectedUserId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUserProfile(null);
        setPosts([]);
        setWeather(null);

        //Ambil post
        const postsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`
        );
        if (!postsRes.ok) throw new Error("Failed to fetch posts");
        const postsData = await postsRes.json();
        setPosts(postsData);

        //Ambil data detail 
        const userRes = await fetch(
          `https://jsonplaceholder.typicode.com/users/${selectedUserId}`
        );
        if (!userRes.ok) throw new Error("Failed to fetch user details");
        const userData = await userRes.json();
        setUserProfile(userData);

        //Ambil data cuaca
        const { lat, lng } = userData.address.geo;
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
        );
        if (!weatherRes.ok) throw new Error("Failed to fetch weather");
        const weatherData = await weatherRes.json();
        setWeather(weatherData.current_weather);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedUserId]);

  if (!selectedUserId) return <p>Pilih pengguna untuk melihat detail</p>;
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userProfile && (
        <div>
          <h2>{userProfile.name} ({userProfile.username})</h2>
          <p>Email: {userProfile.email}</p>
        </div>
      )}

      {posts.length > 0 && (
        <div>
          <h3>Posts:</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}

      {weather && (
        <div>
          <h3>Current Weather:</h3>
          <p>Temperature: {weather.temperature}°C</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
