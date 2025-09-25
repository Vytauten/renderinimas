import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import DaiktoFormRenew from "../components/DaiktoFormRenew";

const RenewPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [daiktas, setDaiktas] = useState(null);

  useEffect(() => {
    const fetchDaiktas = async () => {
      const response = await fetch("/api/daiktai/" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        setDaiktas(json);
      }
    };
    if (user) {
      fetchDaiktas();
    }
  }, [id, user]);

  if (!daiktas) return <p>Daiktas ieškomas</p>;

  return (
    <div>
      <DaiktoFormRenew daiktas={daiktas} />
    </div>
  );
};

export default RenewPage;
