import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Define el hook useTheme para acceder al contexto del tema
export const useTheme = () => useContext(ThemeContext);
