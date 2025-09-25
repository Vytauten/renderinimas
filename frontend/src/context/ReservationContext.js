import { createContext, useReducer, useContext } from "react";

const ReservationContext = createContext();

const reservationReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESERVATIONS":
      return action.payload;
    case "ADD_RESERVATION":
      return [action.payload, ...state];
    case "UPDATE_RESERVATION":
      return state.map((r) =>
        r._id === action.payload._id ? action.payload : r
      );
    default:
      return state;
  }
};

export const ReservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, []);
  return (
    <ReservationContext.Provider value={{ reservations: state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};

//Hookas
export const useReservationContext = () => useContext(ReservationContext);
