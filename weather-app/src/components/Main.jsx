import { getByDisplayValue } from "@testing-library/react";
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
import { WiFahrenheit  } from 'react-icons/wi';



export default function Main() {
    const [city, setCity] = useState("london");
    const [temporaryCity, setTemp] = useState("london");
    const [data, setData] = useState([]);
    const [dataList, setDatalist] = useState([]);
    const [dataCurrent, setCurrent] = useState([]);
    const [tomorrow, setTomorrow] = useState("");

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
    
    useEffect(() => {
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const tomorrow= days[new Date().getDay()] 
        setTomorrow(tomorrow)
  
        const today=days[new Date().getDay()-1];
      }, []);

      const getDay=(i)=>{
        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const day= days[new Date().getDay()]
        return day

      }
    
  return (
   <>


       
     
<Container
       
       className="shadow "
        style={{    
       height:"800px",
       backgroundImage: `url("https://images.unsplash.com/photo-1559215334-45971d3b42b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80")`,
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
  <Button type="submit" variant="warning" >
      submit

  </Button>
</form>

       <div className="d-flex justify-content-center h-50 w-100">
         
    <Row className="mb-10 align-self-center">
{/*     
       <Col lg={12} className="text-white  text-center" >
       <img src={`http://openweathermap.org/img/w/${dataCurrent.weather[0].icon}.png`} style={{width:"60px"}}/>
       <h3>{data.name},{data.country}</h3>
       <h1>{dataCurrent.main.temp} <WiFahrenheit style={{fontSize:"60px"}}/></h1>
      
       <h3 className="">{dataCurrent.weather[0].description}</h3>
      
       </Col> */}
     
   </Row>

   
   </div>
   <div className="shadow p-4 "style={{backgroundColor:"black",opacity: "0.7" ,height:"370px",width: "100%"}}>
   <h5 className="mb-10 text-white text-center ">Next 5 days of week</h5> 
   <Row className="text-white text-center  ">
   
  

       
     { dataList.map((data,index)=>
   
       

  
     
   index % 8 === 1 ? 
   
      
     <Col  xs={12}  className="text-white m-2 d-flex  px-5 text-center" >

    <h5 className="d-inline mr-auto   "> 
    {getDay()}</h5>

   <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} style={{width:"36px"}}/>
   
     <h5 className="d-inline ml-5 ">{data.main.temp}<WiFahrenheit style={{fontSize:"40px"}}/></h5>
     
     </Col> : <></>
     
    

      )}
    </Row>

   </div>

  

   </Container>

    </>
  );
}
