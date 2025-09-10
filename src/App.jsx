import { useState } from "react";
import UserList from "./components/userList";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* kiri: daftar user */}
        <UserList
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />

        {/* kanan: detail user */}
        {selectedUserId && (
          <div style={{ width: "300px", border: "1px solid #ccc", padding: "10px" }}>
            <div style={{ position: "sticky", top: "10px" }}>
              <UserProfile selectedUserId={selectedUserId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
