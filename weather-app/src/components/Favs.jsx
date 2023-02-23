
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
 Container,Card,Col,Row

} from "react-bootstrap";
function Favs(props) {
  const [favs, setFavs] = useState([]);
  const [id, setId] = useState("");


  useEffect(() => {
  
    setId(props.id)
   }, [setId,props.id]);
  
  const getFavs = useCallback(async () => {
    try {
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/${id}/favs`;;

      let response = await fetch(url + query);
      if (response.ok) {
        let favs2 = await response.json();
        setFavs(favs2);
        console.log("favs", favs);
        
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getFavs();
  }, [id]);
  console.log(favs.length)
  return (
    <Container  className="shadow" >
      <h5> Your Favourite Cities</h5>
<Row>
  {favs.length > 0 ?
  
  favs.map((fav,index) => {

    <Col xs={12}>
    
    <Card style={{ width: '18rem', margin:"5px" , backgroundImage:`url("")`}}>
  
    <Card.Body>
      <Card.Title>{fav._id}</Card.Title>
      <Card.Text>
      {fav.favCity}
      </Card.Text>
      
    </Card.Body>
  </Card>
    </Col> 

  
}) :
  <h3>Add cities to your Fav list to see them here!</h3>}
  
</Row>
    </Container>
  );
}

export default Favs;
