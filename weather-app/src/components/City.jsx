import { getByDisplayValue } from "@testing-library/react";
import React, { useState, useEffect, useMemo, useCallback ,useContext} from "react";
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
import { ThemeContext,Themes } from "../contexts/theme";

export default function City(props) {
  const [data, setData] = useState([]);
  const [dataList, setDatalist] = useState([]);
  const [dataCurrent, setCurrent] = useState([]);
  const [theme,setTheme]= useContext(ThemeContext)
  console.log(theme)

  // const [geoCoo, setGeoCoo] = useState("");
  const triggerError = (mode) => {
    props.triggerError(mode);
  };
  const passCityNameToParent = (cityName) => {
    props.passCityNameToParent(cityName);
    console.log(cityName);
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
        setTheme(weather.list[0].weather[0].main)
        console.log(weather.list[0].weather[0].main)
        passCityNameToParent(weather.city.name);

        console.log("weather", weather);
        console.log("dataCurrent", dataCurrent);
        console.log("date" ,dataCurrent.dt_txt, dataCurrent.dt);
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

  const celToFah = (cel) => {
    return ((cel * 9) / 5 + 32).toFixed(0);
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
                    {props.degrees === "celsius"
                      ? (dataCurrent.main.temp).toFixed(0)+ "\u00B0" + "C"
                      : celToFah(dataCurrent.main.temp) + "\u00B0" + "F"
                    }
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
                      {props.degrees === "celsius"
                      ? (data.main.temp).toFixed(0)+ "\u00B0" + "C"
                      : celToFah(data.main.temp) + "\u00B0" + "F"
                    }
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
