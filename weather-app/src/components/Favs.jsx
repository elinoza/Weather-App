
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
 Container,Card,Col,Row

} from "react-bootstrap";
function Favs() {
  const [favs, setFavs] = useState([]);
  const [id, setId] = useState("6039155c1316433a4ff2ce2a");
  
  const getFavs = useCallback(async () => {
    try {
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/${id}/favs`;;

      let response = await fetch(url + query);
      if (response.ok) {
        let favs = await response.json();
        setFavs(favs);
        console.log("favs", favs);
        
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(getFavs, [ getFavs]);
  console.log(favs.length)
  return (
    <Container  className="shadow" >
      <h5> Your Favourite Cities</h5>
<Row>
  {favs.length > 0 ?
  favs.map((fav,index) => {
    console.log(fav)
//   <Col xs={12}>
//   <Card style={{ width: '18rem', margin:"5px" , backgroundImage:`url("https://images.unsplash.com/photo-1559215334-45971d3b42b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80")`}}>

//   <Card.Body>
//     <Card.Title>{fav.city}</Card.Title>
//     <Card.Text>
//       Weather Info
//     </Card.Text>
    
//   </Card.Body>
// </Card>
//   </Col> 
}) :
  <h3>Add cities to your Fav list to see them here!</h3>}
  
</Row>
    </Container>
  );
}

export default Favs;
