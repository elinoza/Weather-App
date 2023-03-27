import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
function Favs(props) {
  const [city, setCity] = useState({});

  useEffect(() => {
    setCity(props.city);
  }, [setCity, props.city]);


  // const getFavs = useCallback(async () => {
  //   try {
  //     const url = process.env.REACT_APP_URL;
  //     // const id ="6038f14842ca86203e481354";
  //     let query = `/users/${id}/favs`;;

  //     let response = await fetch(url + query);
  //     if (response.ok) {
  //       let favs2 = await response.json();
  //       setFavs(favs2);
  //       console.log("favs", favs);

  //     } else {
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   getFavs();
  // }, [id]);

  return (
    <Col className="fav-side-bar" onClick={()=> props.onClick(city.favCity)} xs={12} style={{ padding: "0px" }}>
      <div    onClick={()=>props.deleteFavCity(city.favCity)}
              className="sidebar-heart "><h6>Delete</h6></div>
      <Card className=" city-card text-white">
        <Card.Img
          src="https://images.unsplash.com/photo-1558486012-817176f84c6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=970&q=80"
        
          alt="Card image"
          className="card-img-class"
        />
        <Card.ImgOverlay className="card-city ">
          <Card.Title >
            <h6 className="  d-inline mr-auto">{city.favCity}</h6>

            
        
            
            
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
}

export default Favs;
