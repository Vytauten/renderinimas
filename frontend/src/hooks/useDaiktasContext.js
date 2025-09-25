import { DaiktasContext } from "../context/DaiktasContext";
import { useContext } from "react";

export const useDaiktasContext = () => {
  const context = useContext(DaiktasContext);
  if (!context) {
    throw Error("useDaiktasContext turi būti DaiktasContextProvider viduje");
  }
  return context;
};
