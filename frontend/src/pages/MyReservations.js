import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ReservationDetails from "../components/ReservationDetails";
import { API_BASE } from "../config";

const MyReservations = () => {
  const { user } = useAuthContext();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/daiktai`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.error);

        setReservations(json);
      } catch (err) {
        console.error("Fetch reservations error:", err.message);
      }
    };

    fetchReservations();
  }, [user]);

  // Remove cancelled one from state
  const handleCancel = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res._id === id ? { ...res, status: "cancelled" } : res
      )
    );
  };

  if (!user) return <p>Prisijunkite, kad matytumėte savo rezervacijas</p>;

  return (
    <div>
      <h2>Mano rezervacijos</h2>
      <div className="reservations">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <ReservationDetails
              key={res._id}
              reservation={res}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <p>Rezervacijų nėra</p>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
