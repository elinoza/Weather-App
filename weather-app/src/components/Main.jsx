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

import City from "./City";
import Favs from "./Favs";

function Main() {
  const [me, setMe] = useState([]);
  const [city, setCity] = useState("london");
  const [temporaryCity, setTemp] = useState("");
  const [favCity, setFavs] = useState(null);
  const [favCollection, setFavCollection] = useState(null);
  const [id, setId] = useState("");
  console.log("rendered");

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
     let cityFound= favCollection.find((elem)=> elem.favCity=== city)
    console.log(cityFound._id)
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/${me._id}/favs/${cityFound._id}`;
      let response = await fetch(url + query, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        withCredentials: true, // use cookies
      });
      if (response.ok) {
        console.log("the favcity:",favCity," deleted successfully");
        getMe();
      } else {
        console.log(response, favCity);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const postFav = useCallback(async () => {
    try {
      const url = process.env.REACT_APP_URL;
      // const id ="6038f14842ca86203e481354";
      let query = `/users/${me._id}/favs`;
      let response = await fetch(url + query, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"

        },
        body: JSON.stringify({ favCity: favCity }),
        
        withCredentials: true, // use cookies
      });
      if (response.ok) {
        console.log("fav is posted", favCity);
        getMe();
      } else {
        console.log(response, favCity);
      }
    } catch (error) {
      console.log(error);
    }
  }, [favCity]);

  // useEffect(postFav,[favCity,postFav])

  useEffect(() => {
    if (favCity) {
      postFav();
      console.log("fav city changed");
    }
  }, [favCity, postFav]);

  const keyUp = (e) => {
    setTemp(e.currentTarget.value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    let insensitiveCity = temporaryCity.toUpperCase();
    setCity(insensitiveCity);
  };

  return (
    <Container className="main-container">
      <form onSubmit={submitForm}>
        <input
          className="shadow p-1 m-1"
          style={{
            backgroundColor: "white",
            opacity: "0.5",
            border: "none",
          }}
          placeholder="Search City"
          onChange={keyUp}
          value={temporaryCity}
        />
        <Button
          type="submit"
          className="shadow p-1 m-1"
          style={{
            color: "black",
            backgroundColor: "white",
            opacity: "0.5",
            border: "none",
          }}
        >
          submit
        </Button>
        <div className="d-inline">
          {favCollection && favCollection.find((elem) => elem.favCity === city) ? (
            <MdFavorite
              className=" ml-4"
              style={{ color: "red", fontSize: "30px" }}
              onClick={() => deleteFav()}
            />
          ) : (
            <MdFavoriteBorder
              className="fav-city ml-4"
              style={{ fontSize: "30px" }}
              onClick={() => setFavs(city)}
            />
          )}

          {/* <p className="text-muted">Add this city to your favourites</p> */}
        </div>
      </form>

      <Row>
        <Col xs={12} md={9} style={{}}>
          {/* <City city={city}/> */}
        </Col>
        <Col md={3} className="shadow d-none d-md-block side-bar ">
          {/* <Favs city={city}/> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
