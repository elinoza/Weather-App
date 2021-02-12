import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Pagination,
  Button,
  Form
} from "react-bootstrap";
import { AiOutlineSearch } from 'react-icons/ai';



export default function Main() {
    const [city, setCity] = useState("london");
    const [temporaryCity, setTemp] = useState("london");
    const [data, setData] = useState([]);
    const [dataList, setDatalist] = useState([]);
    const [dataCurrent, setCurrent] = useState([]);

    const getWeather = useCallback(async ( ) => {
        try {
            const url=process.env.REACT_APP_URL
            const key=process.env.REACT_APP_KEY
            
            let cnt= 5
          let query = 
          `forecast?q=${city}&appid=${key}`;
        
          
          let response = await fetch(url + query);
           if (response.ok){
               let weather= await response.json()
               setData(weather.city)
               setDatalist(weather.list)
               setCurrent(weather.list[0])
              
               console.log(weather)}
           else{console.log(response)}
          
        } catch (error) {
          console.log(error);
        }
      }, [city]);
    useEffect(getWeather, [city,getWeather]);

    const keyUp =(e)=>{
        setTemp(e.currentTarget.value)
    }
    const submitForm=(e)=>{
        
        e.preventDefault()
        
        setCity(temporaryCity)
    }
    
  return (
   <>


       
     
        <Container
       
        className="shadow "
         style={{    
        height:"800px",
        backgroundImage: `url("https://images.unsplash.com/photo-1486016006115-74a41448aea2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1647&q=80")`,
        objectFit:"cover" 
    }}>

<form  onSubmit={submitForm}>
    <input 
    className="shadow p-1 m-1"
    style={{backgroundColor:"gray",opacity: "0.5",border:"none"}} 
    placeholder="Search City" 
    onChange={keyUp}
    value={temporaryCity}
   /> 
   <Button type="submit" >
       submit

   </Button>
</form>

        <div className="shadow d-flex justify-content-center h-50 w-100">
          
    <Row className="mb-10 align-self-center ">
      
        <Col lg={12} className="text-white  text-center" >
        <h3>{data.name},{data.country}</h3>
        <h1>{dataCurrent.main.temp} </h1>
      
        <h3 className="d-inline">{dataCurrent.weather[0].description}</h3>
        <img src={`http://openweathermap.org/img/w/${dataCurrent.weather[0].icon}.png`} style={{width:"36px"}}/>
        </Col>
    </Row>
    
    </div>
    <div className="shadow "style={{backgroundColor:"black",opacity: "0.5" ,height:"300px"}}>
    <h5 className="mb-10 text-white text-center ">Week</h5> 
    <Row className="mb-10 text-white text-center ">
    
        
      
      <Col  xs={12} md={4} className="text-white   text-center" >

           
      <h5 className="d-inline mr-3">Date</h5>
      <h5 className="d-inline ml-auto"> 50C</h5>
      </Col>
     </Row>

    </div>



   

    </Container>
   

    </>
  );
}
