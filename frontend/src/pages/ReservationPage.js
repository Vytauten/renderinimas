import { useEffect } from "react";
// hookas yra contexte, o ne prie hookų
import { useReservationContext } from "../context/ReservationContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ReservationsPage = () => {
  const { reservations, dispatch } = useReservationContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch("/api/reservations", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_RESERVATIONS", payload: json });
      }
    };
    if (user) fetchReservations();
  }, [user, dispatch]);

  const updateStatus = async (id, action) => {
    const response = await fetch(`/api/reservations/${id}/${action}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_RESERVATION", payload: json });
    }
  };

  return (
    <div>
      <h2>Visos rezervacijos</h2>
      <div className="owner-reservations-grid">
        {reservations.map((r) => (
          <div className="owner-reservations-container" key={r._id}>
            <p>
              <strong>{r.client?.email}</strong> rezervavo:{" "}
              <strong>{r.daiktas?.title}</strong>
            </p>
            <p>
              <strong>Nuo:</strong> {new Date(r.fromDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Iki:</strong> {new Date(r.toDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Statusas:</strong> {r.status}
            </p>
            {user?.role === "owner" && (
              <div className="owner-reservation-buttons-container">
                <button onClick={() => updateStatus(r._id, "approve")}>
                  Patvirtinti
                </button>
                <button onClick={() => updateStatus(r._id, "reject")}>
                  Atmesti
                </button>
                <button onClick={() => updateStatus(r._id, "cancel")}>
                  Nutraukti
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsPage;
