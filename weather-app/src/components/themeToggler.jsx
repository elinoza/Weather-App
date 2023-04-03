import React,{useContext} from "react";
import {Form} from "react-bootstrap"
import { ThemeContext, Themes} from "../contexts/theme";

export default function ThemeToggler(){
    const [theme,setTheme] =useContext(ThemeContext)
    console.log(theme)
    return(
<Form>
      <Form.Check 
        type="switch"
        id="theme-toggler-switch"
        label="dark mode"
        checked={theme=== Themes.dark}
        onChange={()=>{setTheme(theme=== Themes.dark ?Themes.light :Themes.dark)}}
      />
       </Form>
    )
}