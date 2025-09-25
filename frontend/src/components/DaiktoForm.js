import { useState } from "react";
import { useDaiktasContext } from "../hooks/useDaiktasContext";
import { useAuthContext } from "../hooks/useAuthContext";

const DaiktoForm = () => {
  const { dispatch } = useDaiktasContext();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [availability, setAvailability] = useState(true);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Būtina prisijungti");

      return;
    }
    const daiktas = { title, about, price, availability, age };
    const response = await fetch("/api/daiktai", {
      method: "POST",
      body: JSON.stringify(daiktas),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle("");
      setAbout("");
      setPrice("");
      setAge("");
      setAvailability("");
      setError(null);
      console.log("Naujas daiktas nuomai pridėtas", json);
      dispatch({ type: "CREATE_DAIKTAS", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Patalpinti nuomai</h3>
      <label>Nuomojmao daikto pavadinimias</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Daikto nuomos kaina:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes("price") ? "error" : ""}
      />
      <label>Daikto amžius:</label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes("price") ? "error" : ""}
      />
      <br></br>
      <label>Trumpas daikto aprašymas:</label>
      <textarea
        onChange={(e) => setAbout(e.target.value)}
        value={about}
        className={emptyFields.includes("about") ? "error" : ""}
      />
      <div className="galiojantis">
        <label>
          Ar daiktas laisvas?
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            className={emptyFields.includes("availability") ? "error" : ""}
          />
        </label>
      </div>
      <br></br>
      <button>Patalpinti nuomai</button>
      {error && <div className="error">{error}</div>}
      <hr></hr>
    </form>
  );
};

export default DaiktoForm;
