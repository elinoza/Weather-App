

// import { Route, withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

function App() {
  return (
    < >
<Router>
<Route exact path="/" component={Login} />
 <Route exact path="/Main" component={Main} />
 <Route exact path="/Register" component={Register} />
 
 </Router>

    </>
  );
}

export default App;
