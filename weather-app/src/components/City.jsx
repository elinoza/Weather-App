import { getByDisplayValue } from "@testing-library/react";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { GrFavorite } from "react-icons/gr";

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

export default function City(props) {
  const [data, setData] = useState([]);
  const [dataList, setDatalist] = useState([]);
  const [dataCurrent, setCurrent] = useState([]);

  // const [geoCoo, setGeoCoo] = useState("");
  const triggerError = (mode) => {
    props.triggerError(mode);
  };

  const getWeather = useCallback(async () => {
    try {
      console.log("getweather function heyyo");
      const url = process.env.REACT_APP_URL;
      let geoCoo = props.geoCoo;

      let query = `/api/${geoCoo}`;

      let response = await fetch(url + query);
      if (response.ok) {
        triggerError(false);
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
      triggerError(true);
    }
  }, [props.geoCoo]);

  //useEffect(()=>{getWeather()},[getWeather]) this is also working properly, I wonder why we didnt choose this version

  useEffect(getWeather, [props.geoCoo, getWeather]);

  // useEffect(() => {
  //   setGeoCoo(props.geoCoo);
  // }, [setGeoCoo, props.geoCoo]);

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
    //console.log(new Date().getDay(), i, new Date().getDay() + i);
    const howManyDaysFromToday = i;
    const anormalizedIndex = new Date().getDay() + i;
    const normalizedIndex =
      anormalizedIndex < 7 ? anormalizedIndex : anormalizedIndex % 7;

    return days[normalizedIndex];
  };

  const kelToCelcius = (kel) => {
    return (kel - 273.15).toFixed(0);
  };
  let i = 0;

  return (
    <>
      {data ? (
        <>
          <div className="d-flex justify-content-center h-50 w-100">
            <Row className="mt-5 align-self-center">
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
                    {kelToCelcius(dataCurrent.main.temp)} {"\u00B0"}C
                  </h1>

                  <h3 className="">{dataCurrent.weather[0].description}</h3>
                  <h5>{getDay(0)}</h5>
                </Col>
              )}
            </Row>
          </div>
          <div className=" mt-5 days-report p-4 ">
            <Row className="mt-4 text-white text-center  ">
              {dataList &&
                dataList.length > 0 &&
                dataList.map((data, index) => {
                  i = index % 8 === 1 ? i + 1 : i;

                  return index % 8 === 1 ? (
                    <Col
                      key={data.dt}
                      xs={12}
                      className="text-white m-2 d-flex  px-5 text-center"
                    >
                      <h5 className="d-inline mr-auto   ">{getDay(i)}</h5>

                      <img
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        style={{ width: "36px" }}
                      />

                      <h5 className="d-inline ml-5 ">
                        {kelToCelcius(data.main.temp)}
                        {"\u00B0"}C
                      </h5>
                    </Col>
                  ) : (
                    ""
                  );
                })}
            </Row>
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
}
