import { useEffect } from "react";
import { useDaiktasContext } from "../hooks/useDaiktasContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import DaiktasDetails from "../components/DaiktasDetails";
import DaiktoForm from "../components/DaiktoForm";
import About from "../components/About";

const Home = () => {
  const { daiktai, dispatch } = useDaiktasContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const fetchDaiktus = async () => {
      try {
        // Jei proxy neveiks - "http://localhost:4000/api/daiktai"
        const response = await fetch("/api/daiktai", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (!response.ok)
          throw new Error(json.error || "Nepavyko gauti daiktų");

        dispatch({ type: "SET_DAIKTAI", payload: json });
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchDaiktus();
  }, [dispatch, user]);

  if (!user)
    return (
      <p>Sveiki atvykę, prisijunkite, kad matytumėte nuomojamus daiktus</p>
    );
  //Filtras juodraščiui
  const visibleDaiktai = daiktai.filter(
    (d) => d.availability === true || user.role === "owner"
  );

  return (
    <div className="home">
      <div className="about-container">
        {user.role === "owner" && <DaiktoForm />}
        <About />
      </div>

      <div className="daiktai">
        {visibleDaiktai && visibleDaiktai.length > 0 ? (
          visibleDaiktai.map((daiktas) => (
            <DaiktasDetails key={daiktas._id} daiktas={daiktas} />
          ))
        ) : (
          <p>Kol kas daiktų nėra</p>
        )}
      </div>
    </div>
  );
};

export default Home;
