import { useDaiktasContext } from "../hooks/useDaiktasContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const DaiktasDetails = ({ daiktas }) => {
  const { dispatch } = useDaiktasContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    const response = await fetch("/api/daiktai/" + daiktas._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_DAIKTAS", payload: json });
    }
  };

  return (
    <div className="daiktas-details">
      <h2>{daiktas.title}</h2>
      <p>
        <strong>Daikto aprašymas:</strong> {daiktas.about}
      </p>
      <p>
        <strong>Daikto kaina :</strong> {daiktas.price}{" "}
        <strong>Eur/diena</strong>
      </p>
      <p>
        <strong>Daikto amžius:</strong> {daiktas.age} <strong>m.</strong>
      </p>
      <p>
        <strong>Ar daiktą iš karto galima nuomotis?</strong>{" "}
        {daiktas.availability ? "Taip" : "Ne"}
      </p>
      <br></br>

      {user?.role === "owner" && (
        <div className="daiktas-details-btn-container">
          {" "}
          <Link to={`/renew/${daiktas._id}`}>Atnaujinti</Link>
          <span onClick={handleClick}>Ištrinti</span>
        </div>
      )}
      {user?.role === "client" && (
        <form
          className="reserve-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const startDate = e.target.startDate.value;
            const endDate = e.target.endDate.value;

            const fromDate = new Date(startDate).toISOString();
            const toDate = new Date(endDate).toISOString();

            const response = await fetch("/api/reservations", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                daiktas: daiktas._id,
                fromDate,
                toDate,
              }),
            });

            const json = await response.json();
            if (response.ok) {
              alert("Rezervacija sėkmingai sukurta!");
            } else {
              alert(json.error);
            }
          }}
        >
          <input type="date" name="startDate" required />
          <input type="date" name="endDate" required />
          <button type="submit" className="reserve-btn">
            Rezervuoti
          </button>
        </form>
      )}
    </div>
  );
};

export default DaiktasDetails;
