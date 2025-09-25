import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Daiktų nuoma</h1>
        </Link>
        <nav>
          {user && (
            <div className="nav-reservations-links-container">
              {user.role === "client" && (
                <Link to="/myreservations">Mano rezervacijos</Link>
              )}
              {user.role === "owner" && (
                <Link to="/reservations">Klientų rezervacijos</Link>
              )}
              <button onClick={handleClick}>Atsijungti</button>
            </div>
          )}

          {!user && (
            <div className="login-signup-container">
              <Link to={"/login"}>Prisijungti</Link>
              <Link to={"/signup"}>Registruotis</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
