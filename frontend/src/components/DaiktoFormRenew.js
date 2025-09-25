import { useState } from "react";
import { useDaiktasContext } from "../hooks/useDaiktasContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const DaiktoFormRenew = ({ daiktas }) => {
  const { dispatch } = useDaiktasContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState(daiktas?.title || "");
  const [about, setAbout] = useState(daiktas?.about || "");
  const [price, setPrice] = useState(daiktas?.price || "");
  const [age, setAge] = useState(daiktas?.age || "");
  const [availability, setAvailability] = useState(
    daiktas?.availability ?? true
  );
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Būtina prisijungti");
      return;
    }

    const payload = { title, about, price, age, availability };
    const response = await fetch(`/api/daiktai/${daiktas._id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
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
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "UPDATE_DAIKTAS", payload: json });
      navigate("/");
      console.log("Daiktas atnaujintas:", json);
    }
  };

  return (
    <form className="renew" onSubmit={handleSubmit}>
      <h3>Atnaujinti daiktą</h3>
      <label>Pavadinimas</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Kaina</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes("price") ? "error" : ""}
      />
      <label>Amžius</label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes("age") ? "error" : ""}
      />
      <label>Aprašymas</label>
      <textarea
        onChange={(e) => setAbout(e.target.value)}
        value={about}
        className={emptyFields.includes("about") ? "error" : ""}
      />
      <label>
        Ar daiktas laisvas?
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
        />
      </label>
      <button>Atnaujinti</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DaiktoFormRenew;
