import { getByDisplayValue } from "@testing-library/react";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { GrFavorite} from 'react-icons/gr';

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
import { WiFahrenheit } from "react-icons/wi";


export default function City(props) {


  const [data, setData] = useState([]);
  const [dataList, setDatalist] = useState([]);
  const [dataCurrent, setCurrent] = useState([]);

  const [city, setCity] = useState("");



  const getWeather = useCallback(async () => {
    try {
      console.log("getweather function heyyo")
      const url = process.env.REACT_APP_URL;
      const key = process.env.REACT_APP_KEY;

      let query = `/api/${city}`;

      let response = await fetch(url + query);
      if (response.ok) {
        let weather = await response.json();
        setData(weather.city);
        setDatalist(weather.list);
        setCurrent(weather.list[0]);

        console.log("weather", weather);
        console.log("dataCurrent", dataCurrent);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [city]);
  console.log("props.id",props.id)
  

 //useEffect(()=>{getWeather()},[getWeather]) this is also working properly, I wonder why we didnt choose this version

  
useEffect(getWeather, [city, getWeather]);


useEffect(() => {
  
 setCity(props.city)
}, [setCity,props.city]);


  const getDay = (i) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    console.log(new Date().getDay(), i, new Date().getDay() + i);
    const howManyDaysFromToday = i;
    const anormalizedIndex = new Date().getDay() + i;
    const normalizedIndex =
      anormalizedIndex < 7 ? anormalizedIndex : anormalizedIndex % 7;

    return days[normalizedIndex];
  };
  
  let i = 0;
  return (
    <>

     


          <div className="d-flex justify-content-center h-50 w-100">
            <Row className="mb-10 align-self-center">
              {dataCurrent.weather && (
                <Col lg={12} className="text-white  text-center">
                  <img
                    src={`http://openweathermap.org/img/w/${dataCurrent.weather[0].icon}.png`}
                    style={{ width: "60px" }}
                  />
                  <h3>
                    {data.name},{data.country}
                  </h3>
                  <h1>
                    {dataCurrent.main.temp}{" "}
                    <WiFahrenheit style={{ fontSize: "60px" }} />
                  </h1>

                  <h3 className="">{dataCurrent.weather[0].description}</h3>
                  <h5>{getDay(0)}</h5>
                </Col>
              )}
            </Row>
          </div>
          <div
            className="shadow p-4 "
            style={{
              backgroundColor: "black",
              opacity: "0.7",
              height: "370px",
              width: "100%",
            }}
          >
            <h5 className="mb-10 text-white text-center ">
              Next 5 days of week
            </h5>
            <Row className="text-white text-center  ">
              {dataList.length > 0 &&
                dataList.map((data, index) => {
                  i = index % 8 === 1 ? i + 1 : i;

                  return index % 8 === 1 ? (
                    <Col
                      xs={12}
                      className="text-white m-2 d-flex  px-5 text-center"
                    >
                      <h5 className="d-inline mr-auto   ">{getDay(i)}</h5>

                      <img
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        style={{ width: "36px" }}
                      />

                      <h5 className="d-inline ml-5 ">
                        {data.main.temp}
                        <WiFahrenheit style={{ fontSize: "40px" }} />
                      </h5>
                    </Col>
                  ) : (
                    <></>
                  );
                })}
            </Row>
          </div>
      
     
    </>
  );
}
