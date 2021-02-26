import React, { useState, useEffect, useMemo, useCallback } from "react";


import {
  Col,
  Row

} from "react-bootstrap";

import City from "./City"
import Favs from "./Favs"

function Main() {
  return (
    <div >
 <Row>
      <Col xs={12} md={9}
      className="shadow "
      style={{
        height: "800px",
        backgroundImage: `url("https://images.unsplash.com/photo-1559215334-45971d3b42b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80")`,
        objectFit: "contain",
      }}
      >
     <City/>
     </Col>
     <Col xs={12} md={3}
     style={{backgroundColor:"#D8E2EA"}}>
     <Favs/>
    </Col>
    </Row>
 
    </div>
  );
}

export default Main;
