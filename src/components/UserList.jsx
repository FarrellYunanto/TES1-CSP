import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import UserProfile from "./UserProfile";

export default function UserList() {
//   const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //tampilan error
  if (loading) return <p>Loading User data...</p>;
  if (error) return <p>Error: {error}</p>;

  return(
    <div>
        <h1>Daftar Pengguna</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
            {/* list semua user */}
            <div style={{ flex: 1, maxHeight: '80vh', overflowY: 'auto' }}>
                {users.map((user) => (
                <UserCard
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    address={user.address.city}
                    isSelected={selectedUserId === user.id}
                    onSelect={() => {
                    setSelectedUserId((prev) => (prev === user.id ? null : user.id));
                    }}
                />
                ))}
            </div>

            {/* menampilkan user yang dipilih */}
            {selectedUserId && (
                <div style={{ width: '300px', border: '1px solid #ccc', padding: '10px' }}>
                    <div style={{ position: 'sticky', top: '10px' }}>
                        <UserProfile selectedUserId={selectedUserId} />
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}
