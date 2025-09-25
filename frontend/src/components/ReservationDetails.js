import { useAuthContext } from "../hooks/useAuthContext";

const ReservationDetails = ({ reservation, onCancel }) => {
  const { user } = useAuthContext();

  const handleCancel = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/reservations/${reservation._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Nepavyko atšaukti rezervacijos");
      }

      onCancel(reservation._id);
    } catch (err) {
      console.error("Cancel reservation error:", err.message);
    }
  };

  return (
    <div className="reservation-details">
      <p>
        <strong>Daiktas:</strong> {reservation.daiktas.title}
      </p>
      <p>
        <strong>Nuo:</strong>{" "}
        {new Date(reservation.fromDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Iki:</strong>{" "}
        {new Date(reservation.toDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Statusas:</strong> {reservation.status}
      </p>

      {/* Rodyti tik kai klientui pendina */}
      {user?.role === "client" && reservation.status === "pending" && (
        <button onClick={handleCancel}>Atšaukti</button>
      )}
    </div>
  );
};

export default ReservationDetails;
