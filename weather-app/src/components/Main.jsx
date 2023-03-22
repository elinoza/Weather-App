import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Pagination,
  Button,
  Form,
} from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import CityApp from "./City";
import Favs from "./Favs";




function Main() {
  const [me, setMe] = useState([]);
  const [city, setCity] = useState("");
  const [temporaryCity, setTemp] = useState("");
  const [focus,setFocus] = useState(false);
  const [favCollection, setFavCollection] = useState(null);
  const [id, setId] = useState("");

  /// get Me  and setMe
  const getMe = useCallback(async () => {
    try {
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/me`;
      let response = await fetch(url + query, {
        headers: {
          "Content-Type": "application/json",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let me = await response.json();
        console.log("me", me);
        setMe(me);
        setFavCollection(me.favs);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //componentDidMount -->
  useEffect(() => {
    getMe();
  }, []);

  const deleteFav = async () => {
    try {
      let cityFound = favCollection.find((elem) => elem.favCity === city);
      console.log(cityFound._id);
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/${me._id}/favs/${cityFound._id}`;
      let response = await fetch(url + query, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // use cookies
      });
      if (response.ok) {
        console.log("the favcity:", " deleted successfully");
        getMe();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const postFav = async () => {
if(city && city!=""){  try {
  const url = process.env.REACT_APP_URL;
  // const id ="6038f14842ca86203e481354";
  let query = `/users/${me._id}/favs`;
  let response = await fetch(url + query, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favCity: city }),

    withCredentials: true, // use cookies
  });
  if (response.ok) {
    console.log("fav is posted", city);
    getMe();
  } else {
    console.log(response, city);
  }
} catch (error) {
  console.log(error);
}}
else{
  console.log("choose a city to ad to favorites")
}
  
  };

  // useEffect(postFav,[favCity,postFav])

  //The below made bugs, so I removed. when I made changes on form element , It rendered and posted fav as if favcity is changed

  // useEffect(() => {
  //   if (favCity) {
  //     postFav;
  //     console.log("fav city changed");
  //   }
  // }, [favCity, postFav]);

  const keyUp = (e) => {
    setTemp(e.currentTarget.value);

  };

const submitForm = (e) => {
  e.preventDefault();
  let insensitiveCity = temporaryCity.toUpperCase();
  setCity(insensitiveCity);
};


  return (
    <Container className= {focus? "main-container non-focus text-white":"main-container text-white"}>
      <form className="mt-3 text-white" style={{position:"absolute",zIndex:"3"}} onSubmit={submitForm}>
        <input
          className="search-input p-1 m-1"
      onClick={()=> setFocus(true)}
          placeholder="Search City"
          onChange={keyUp}
          value={temporaryCity}
     
        />
 
        <div className="d-inline">
          {favCollection &&
          favCollection.find((elem) => elem.favCity === city) ? (
            <MdFavorite
              className=" ml-4"
              style={{ color: "red", fontSize: "30px" }}
              onClick={() => deleteFav()}
            />
          ) : (
            <MdFavoriteBorder
              className="fav-city ml-4"
              style={{ fontSize: "30px" }}
              onClick={()=>postFav()}
            />
          )}

          {/* <p className="text-muted">Add this city to your favourites</p> */}
        </div>
      </form>

      <Row className="main-row">
        <Col xs={12} md={9} style={{}}>
         {city ? <CityApp key={city._id} city={city}/> :"" }
        </Col>
        <Col md={3} className="shadow d-none d-md-block side-bar ">
   
    
            <Row>{favCollection&&favCollection.map((fav)=><Favs city={fav} />)}</Row>
   
        </Col>
      </Row>
    </Container>
  );
}

export default Main;


