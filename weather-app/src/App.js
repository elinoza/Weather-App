

// import { Route, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { ThemeContext,initialState } from './contexts/theme';

function App() {

  const [theme,setTheme] =useState(initialState)

  return (
    < >
<Router>
  <ThemeContext.Provider value={[theme,setTheme]}>
<Route exact path="/" component={Login} />
 <Route exact path="/Main" component={Main} />
 <Route exact path="/Register" component={Register} />
 </ThemeContext.Provider>
 </Router>

    </>
  );
}

export default App;
