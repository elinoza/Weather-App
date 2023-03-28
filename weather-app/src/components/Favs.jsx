import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
function Favs(props) {
  const [city, setCity] = useState({});
  const [data, setData] = useState([]);
  const [dataList, setDatalist] = useState([]);
  const [dataCurrent, setCurrent] = useState([]);

  // useEffect(() => {
  //   setCity(props.city);
  // }, [setCity, props.city]);

  const getWeather = useCallback(async () => {
    try {
      console.log("getweather function from favs");
      const url = process.env.REACT_APP_URL;
      let geoCoo = props.geoCoo;

      let query = `/api/${geoCoo}`;

      let response = await fetch(url + query);
      if (response.ok) {
     
        let weather = await response.json();
        setData(weather.city);
        setDatalist(weather.list);
        setCurrent(weather.list[0]);

        console.log("weather", weather);
        console.log("dataCurrent", data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("error", error);
 
    }


   
  
  }, [props.geoCoo]);
  const kelToCelcius = (kel) => {
    return (kel - 273.15).toFixed(0);
  };

  //useEffect(()=>{getWeather()},[getWeather]) this is also working properly, I wonder why we didnt choose this version

  useEffect(getWeather, [props.geoCoo, getWeather]);


  return (
    <Col className="fav-side-bar" onClick={()=> props.onClick(props.geoCoo)} xs={12} style={{ padding: "0px" }}>
      <div    onClick={()=>props.deleteFavCity(props.geoCoo)}
              className="sidebar-heart "><h6>Delete</h6></div>

              {dataCurrent.weather && 
      <Card className=" city-card text-white">
        <Card.Img
          src="https://images.unsplash.com/photo-1558486012-817176f84c6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=970&q=80"
        
          alt="Card image"
          className="card-img-class"
        />
        <Card.ImgOverlay className="card-city ">
          <Card.Title >
            <h6 className="  d-inline mr-auto">{props.city.favCity}</h6>
        
            
          </Card.Title>
          <Card.Text>
            <div className="d-flex "> <p  className="d-inline mr-auto">   {dataCurrent.weather[0].description}</p> <p  className="d-inline">{kelToCelcius(dataCurrent.main.temp)} {"\u00B0"}C</p>
            </div>
           
          
       
        </Card.Text>
      
        </Card.ImgOverlay>
      </Card>
      }
    </Col>
  );
}

export default Favs;
