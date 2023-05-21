import React, { useState, useEffect, useMemo, useContext,useCallback } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {capitalizeFirstLetter,celToFah} from "../functions/functions"

function Favs(props) {
  const [city, setCity] = useState({});
  const [data, setData] = useState([]);
  const [dataList, setDatalist] = useState([]);
  const [dataCurrent, setCurrent] = useState([]);
  const [ weatherDescription,setWeatherDescription]=useState([])


  useEffect(() => {
    setCity(props.city);
  }, [setCity, props.city]);

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
       setWeatherDescription(weather.list[0].weather[0].main)

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
    <Col
      className={`fav-side-bar`}
      onClick={() => props.onClick(city.geoCoo)}
      xs={12}
      style={{ padding: "0px" }}
    >
   

      {dataCurrent.weather && (
        <Card className={` city-card  text-white `}>
          
          <Card.Img
            src=""
            alt="Card image"
            className="card-img-class "
          />
        {props.fromSideBar? console.log("true"):console.log("false")}
          <Card.ImgOverlay className={props.fromSideBar ? `${weatherDescription} card-city`: `card-city`}>
            <Card.Title>
              <h6 className="  d-inline mr-auto">{city.favCity} </h6>
            </Card.Title>
            <Card.Text>
              <div className="d-flex ">
                {" "}
                <p className="d-inline mr-auto">
                  {" "}
                  {capitalizeFirstLetter(dataCurrent.weather[0].description) }
                </p>{" "}
                <p className="d-inline">
                {props.degrees === "celsius"
                      ? (dataCurrent.main.temp).toFixed(0)+ "\u00B0" + "C"
                      : celToFah(dataCurrent.main.temp) + "\u00B0" + "F"
                    }
                </p>
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <div
        onClick={() => props.deleteFavCity(city.geoCoo)}
        className="sidebar-heart "
      >
        <h6>Delete</h6>
      </div>
        </Card>
      )}
    </Col>
  );
}

export default Favs;
