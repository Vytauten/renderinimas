import { useDaiktasContext } from "./useDaiktasContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: daiktoDispatch } = useDaiktasContext();

  const logout = () => {
    localStorage.removeItem("user");

    //jwt destroy
    dispatch({ type: "LOGOUT" });
    daiktoDispatch({ type: "SET_DAIKTAI", payload: null });
  };
  return { logout };
};
