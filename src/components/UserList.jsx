import { useEffect, useState } from "react";
import UserCard from "./UserCard";

export default function UserList(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);


    //fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) {
                throw new Error("Gagal mengambil data");
                }
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    //tampilan untuk loading / error
    if (loading) return <p>Loading User data...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>;

    //tampilan untuk tidak error
    return (
        <div className="p-6 pl-16">
            <h1 className="text-2xl font-bold mb-4">Daftar Pengguna</h1>
            <div>
                {users.map((user) => (
                    <UserCard key={user.id} 
                        name={user.name} 
                        email={user.email} 
                        phone={user.phone} 
                        address={user.address.city} 
                        isSelected={selectedUserId === user.id}
                        onSelect={() => 
                            setSelectedUserId(prev => (prev === user.id ? null : user.id))
                        }
                    />
                ))}
            </div>
        </div>
    );
}