import { useState } from "react";

function UserCard({ name, email, phone, address, isSelected, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
    width: "320px",
    backgroundColor: isSelected ? "#d1d5db" : isHovered ? "#f3f4f6" : "#fff",
    boxShadow: isSelected
      ? "0 4px 12px rgba(0,0,0,0.2)"
      : "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
  };

  const nameStyle = { fontSize: "18px", fontWeight: "600", marginBottom: "4px", color: "#111827" };
  const emailStyle = { fontSize: "14px", color: "#6b7280", marginBottom: "12px" };
  const infoRow = { fontSize: "14px", color: "#374151", margin: "2px 0" };
  const labelStyle = { fontWeight: "500", marginRight: "6px", color: "#4b5563" };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect} // select this card
    >
      <div>
        <h2 style={nameStyle}>{name}</h2>
        <p style={emailStyle}>{email}</p>
      </div>

      <p style={infoRow}>
        <span style={labelStyle}>📞 Phone:</span> {phone}
      </p>

      <p style={infoRow}>
        <span style={labelStyle}>🏠 City:</span> {address}
      </p>
    </div>
  );
}

export default UserCard;