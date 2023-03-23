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
import { MdFavorite, MdFavoriteBorder,MdSearch } from "react-icons/md";
import {GiHamburgerMenu} from "react-icons/gi";


import CityApp from "./City";
import Favs from "./Favs";




function Main() {
  const [me, setMe] = useState([]);
  const [city, setCity] = useState("TOKAT");
  const [temporaryCity, setTemp] = useState("");
  const [favCollection, setFavCollection] = useState(null);
  const [error, setError] = useState(false);
  const[sideBarOpen,setSideBar]=useState(false);

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

  const deleteFav = async (selectedCity) => {
    try {
      let cityFound = favCollection.find((elem) => elem.favCity === selectedCity);
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
const toggleSideBar=()=>{setSideBar(!sideBarOpen)}

const submitForm = (e) => {
  e.preventDefault();
  let insensitiveCity = temporaryCity.toUpperCase();
  setCity(insensitiveCity);
};
const  triggerError=(error)=>{
setError(error)

  }
  const handleClick = (selectedCity) => { setCity(selectedCity) }
const handleMainClick=()=>{
  if(sideBarOpen){ setSideBar(!sideBarOpen)}
}

  return (
    <Container onClick={ handleMainClick} className= "main-container text-white">


      <Row  className="main-row">
        <Col xs={12} md={9} >
          <div className="search-fav-form"> <form className="d-inline mt-3 text-white"  onSubmit={submitForm}>
      {error && temporaryCity!= "" ?  <div className="error-city">Please enter a valid city</div>:""}
        <div style={{position:"relative"}} className="d-inline">  
        <input
          className="search-input p-1 m-1"

          placeholder="Search City"
          onChange={keyUp}
          value={temporaryCity}
       
        />
        <MdSearch className="search-icon"/>
 </div>
   
      </form>
      <div className="d-inline mt-3">   <GiHamburgerMenu  onClick={toggleSideBar} id="hamburger-menu"/>
         {city && !error &&
        <div className="d-inline  ml-auto hearts">
          {favCollection &&
          favCollection.find((elem) => elem.favCity === city) ? (
            <MdFavorite
              className=" heart fav-heart ml-4"
            
              onClick={() => deleteFav(city)}
            />
          ) : (
            <MdFavoriteBorder
              className="heart ml-4"
             
              onClick={()=>postFav()}
            />
          )}

        </div>
        }</div>
     
        </div>
       
         {city ? <CityApp triggerError={triggerError} key={city._id} city={city}/> : "" }
    
        </Col>
        
        <Col md={3} className="shadow d-none d-md-block side-bar ">
   
      
   
    
            <Row>{favCollection&&favCollection.map((fav)=><Favs onClick={handleClick} deleteFavCity={deleteFav} city={fav} />)}</Row>
   
        </Col>
      
      </Row>

      {sideBarOpen? <div className="special-sideBar-wrapper"><Row className="special-sideBar">{favCollection&&favCollection.map((fav)=><Favs onClick={handleClick} deleteFavCity={deleteFav} city={fav} />)}</Row></div>:""} 
    </Container>
  );
}

export default Main;


