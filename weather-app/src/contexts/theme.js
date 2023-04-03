import {createContext} from "react";

export const ThemeContext = createContext()
export const Themes={
    dark:"dark",
    light:"light",
   Thunderstorm:"Thunderstorm",
   Drizzle:"Drizzle",
   Rain:"Rain",
   Snow:"Snow",
   Atmosphere:"Atmosphere",
   Clear:"Clear",
   Clouds:"Clouds",
  

}


export const initialState= Themes.Clear
