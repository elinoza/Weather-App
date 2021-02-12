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
    const getWeather = useCallback(async () => {
        try {
            const url="http://api.openweathermap.org/data/2.5/"
            const key="e9af686df62def8f8f6557c77ae7ab51"
            let city="London"
            let cnt= 5
          let query = 
          `forecast?q=${city}&appid=${key}`;
        //   const url=process.env.REACT_APP_URL
          
          let response = await fetch(url + query);
           if (response.ok){
               let weather= await response.json()
               console.log(weather)}
           else{console.log(response)}
          
        } catch (error) {
          console.log(error);
        }
      }, []);
    useEffect(getWeather, []);
  return (
   <>

       
       "
        <Container
       
        className="shadow "
         style={{    
        height:"800px",
        backgroundImage: `url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")`,
        objectFit:"cover" 
    }}>

<form >
    <input className="shadow p-1 m-1"style={{backgroundColor:"gray",opacity: "0.5",border:"none"}} 
    placeholder="Search City"></input>
</form>

        <div className="shadow d-flex justify-content-center h-50 w-100">
          
    <Row className="mb-10 align-self-center ">
      
        <Col lg={12} className="text-white  text-center" >
        <h3>London, UK</h3>
        <h1> 50C</h1>
        <h3>Broken Cloudy</h3>
        </Col>
    </Row>
    
    </div>
    <div className="shadow "style={{backgroundColor:"black",opacity: "0.5" ,height:"200px"}}>
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
