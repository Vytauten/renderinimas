import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages, components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RenewPage from "./pages/Renew";
import MyReservations from "./pages/MyReservations";
import ReservationsPage from "./pages/ReservationPage";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={"/"} />}
            />
            <Route
              path="/renew/:id"
              element={user ? <RenewPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/myreservations"
              element={user ? <MyReservations /> : <Navigate to={"/"} />}
            />
            <Route
              path="/reservations"
              element={user ? <ReservationsPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
