import React,{useContext} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Col,
  Container,
  Row,

} from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder, MdSearch } from "react-icons/md";
import { GiCondorEmblem, GiHamburgerMenu } from "react-icons/gi";
import {IoLogOut} from 'react-icons/io5'
import {useHistory} from 'react-router-dom'

import CityApp from "./City";
import Favs from "./Favs";

import {ThemeContext,Themes} from "../contexts/theme"



function Main() {
  const [me, setMe] = useState([]);
  const [city, setCity] = useState("");
  const [geoCoo, setGeoCoo] = useState("");
  const [temporaryCity, setTemp] = useState("");
  const [favCollection, setFavCollection] = useState(null);
  const [error, setError] = useState(false);
  const [sideBarOpen, setSideBar] = useState(false);
  const [possibleCities, setPossibleCities] = useState([]);
  const [degrees, setDegrees] = useState("celsius");
  const history = useHistory()
  const [theme,setTheme] = useContext(ThemeContext)

  const geoCooModifier = (lat, lon) => {
    let modifiedLat = lat.toFixed(4);
    let modifiedLon = lon.toFixed(4);
    let modifiedGeoCoo = `lat=${modifiedLat}&lon=${modifiedLon}`;
    setGeoCoo(modifiedGeoCoo);
  };
  //change city to geoLocation
  const convertToGeoLoc = async (selectedCity) => {
    try {
      const url = process.env.REACT_APP_URL;



      let query = `/api/geo/${selectedCity}`;
      let response = await fetch(url + query);
      if (response.ok) {
        let cities = await response.json();

        setPossibleCities(cities);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      console.log("hey from geo");
      navigator.geolocation.getCurrentPosition((position) => {
        const p = position.coords;
        console.log("coor", p, p.latitude, p.longitude, position);

        geoCooModifier(p.latitude, p.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const deleteFav = async (selectedGeoCoo) => {
    try {
      let cityFound = favCollection.find(
        (elem) => elem.geoCoo === selectedGeoCoo
      );
      console.log("citfounded for deletion", cityFound);
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
    if (geoCoo && geoCoo != "") {
      try {
        const url = process.env.REACT_APP_URL;
        // const id ="6038f14842ca86203e481354";
        let query = `/users/${me._id}/favs`;
        let response = await fetch(url + query, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },  body: JSON.stringify({ favCity: city, geoCoo: geoCoo }),

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
      }
    } else {
      console.log("choose a city to ad to favorites");
    }
  };
  const handleLogout=()=>{
    localStorage.removeItem("token")
    history.push("/")
  }

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
    let insensitiveCity = e.currentTarget.value.toUpperCase();
    if (e.currentTarget.value) {
      convertToGeoLoc(insensitiveCity);
    }
    if (e.currentTarget.value === "") {
      setError(false);
      setPossibleCities([]);
      console.log(" form is clear");
    }
  };
  const toggleSideBar = () => {
    setSideBar(!sideBarOpen);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (possibleCities.length === 0) {
      setError(true);
      console.log(error, "error");
    }
    //   let insensitiveCity = temporaryCity.toUpperCase();
    // convertToGeoLoc(insensitiveCity)
    if (possibleCities && possibleCities.length > 0) {
      let lat = possibleCities[0].lat;
      let lon = possibleCities[0].lon;
      geoCooModifier(lat, lon);
      setTemp("");
      setPossibleCities([]);
    }
  };

  const triggerError = (error) => {
    setError(error);
  };

  const handleClick = (selectedGeoCoo) => {
    if (sideBarOpen) {
      toggleSideBar();
    }
    setGeoCoo(selectedGeoCoo);
  };

  // const handleMainClick = () => {
  //   if (sideBarOpen) {
  //     setSideBar(!sideBarOpen);
  //   }
  // };

  const handleDropDownClick = (lat, lon) => {
    geoCooModifier(lat, lon);

    setPossibleCities([]);
  };
  const passCityNameToParent = (cityName) => {
    setCity(cityName);
    console.log(cityName, city);
  };
  const toggleDegrees=()=>{
    degrees=== "celsius"? setDegrees("fahrenheit") :setDegrees("celsius")
  
  }
  

  console.log("rendered", possibleCities, geoCoo);
  return (
    <Container className={`main-container text-white ${theme}`}>
      <Row className="main-row">
        <Col xs={12} md={9}>
          <div className="search-fav-form mt-1">
            {" "}
            <form
              className=" search-form d-inline mt-3 text-white"
              onSubmit={submitForm}
            >
              {error && temporaryCity != "" ? (
                <div className="error-city">Please enter a valid city</div>
              ) : (
                ""
              )}
              {possibleCities && possibleCities.length > 0 && temporaryCity && (
                <div id="dropDown-menu">
                  {possibleCities.map((city) => (
                    <p
                      key={city.lat + city.lon}
                      onClick={() => handleDropDownClick(city.lat, city.lon)}
                      className="mb-0 "
                    >
                      {city.name}, {city.state}, {city.country}{" "}
                    </p>
                  ))}
                </div>
              )}
              <div style={{ position: "relative" }} className="d-inline">
                <input
                  className="search-input p-1 m-1"
                  placeholder="Search City"
                  onChange={keyUp}
                  value={temporaryCity}
                />
                <MdSearch className="search-icon icons" />
              </div>
            </form>
        
            <div className="icon-wrapper d-inline ">
              {" "}
              <div className="d-inline degrees ml-3  ">
              {" "}
              <h6 onClick={toggleDegrees} className={degrees === "fahrenheit" ? "selected d-inline" : "d-inline"}>
                {"\u00B0"} F /
              </h6>{" "}
              {" "}
              <h6 onClick={toggleDegrees} className={degrees === "celsius" ? "selected d-inline" : "d-inline"}>
                {"\u00B0"}C
              </h6>
            </div>
              
              <GiHamburgerMenu className="ml-3 icons" onClick={toggleSideBar} id="hamburger-menu" />
              {geoCoo && !error && (
                <div className="d-inline hearts icons ml-3">
                  {favCollection &&
                  favCollection.find((elem) => elem.geoCoo === geoCoo) ? (
                    <MdFavorite
                      className=" heart fav-heart"
                      onClick={() => deleteFav(geoCoo)}
                    />
                  ) : (
                    <MdFavoriteBorder
                      className="heart "
                      onClick={() => postFav()}
                    />
                  )}
                </div>
              )}
             < IoLogOut  onClick={handleLogout} className=" icons ml-3" id="logout-icon"/>
            </div>
          </div>

          {geoCoo ? (
            <CityApp
              triggerError={triggerError}
              geoCoo={geoCoo}
              passCityNameToParent={passCityNameToParent}
              degrees={degrees}
            />
          ) : (
            ""
          )}
        </Col>

        <Col md={3} className="shadow d-none d-md-block side-bar ">
          <Row>
            {favCollection &&
              favCollection.map((fav) => (
                <Favs
                  key={fav._id}
                  onClick={handleClick}
                  deleteFavCity={deleteFav}
                  city={fav}
                  geoCoo={fav.geoCoo}
                  degrees={degrees}
                />
              ))}
          </Row>
        </Col>
      </Row>

      {sideBarOpen ? (
        <div className="special-sideBar-wrapper ">
          <div className="d-flex py-3 px-2">
            {" "}
            <GiHamburgerMenu className="icons" onClick={toggleSideBar} />
            <div className="d-inline degrees ml-auto">
              {" "}
              <h6 onClick={toggleDegrees} className={degrees === "fahrenheit" ? "selected d-inline" : "d-inline"}>
                {"\u00B0"} F /
              </h6>{" "}
              {" "}
              <h6 onClick={toggleDegrees} className={degrees === "celsius" ? "selected d-inline" : "d-inline"}>
                {"\u00B0"}C
              </h6>
            </div>
          </div>
          
          <Row className="special-sideBar">
            {favCollection &&
              favCollection.map((fav) => (
                <Favs
                  key={fav._id}
                  onClick={handleClick}
                  deleteFavCity={deleteFav}
                  city={fav}
                  geoCoo={fav.geoCoo}
                  degrees={degrees}
                  fromSideBar={true}
                />
              ))}
          </Row>
          
          <div
            onClick={toggleSideBar}
            style={{ width: "100", height: "100%" }}
          ></div>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
}

export default Main;
