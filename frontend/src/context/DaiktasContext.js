import { Children, createContext, useReducer } from "react";

export const DaiktasContext = createContext();

export const daiktasReducer = (state, action) => {
  switch (action.type) {
    case "SET_DAIKTAI":
      return { daiktai: action.payload || [] };
    case "CREATE_DAIKTAS":
      return { daiktai: [action.payload, ...(state.daiktai || [])] };
    case "DELETE_DAIKTAS":
      return {
        daiktai: (state.daiktai || []).filter(
          (daiktas) => daiktas._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const DaiktasContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(daiktasReducer, {
    daiktai: [],
  });

  return (
    <DaiktasContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DaiktasContext.Provider>
  );
};
