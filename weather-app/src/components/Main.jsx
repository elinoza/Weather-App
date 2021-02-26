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
     <Col xs={12} md={9}>
     <City/>
     </Col>
     <Col xs={12} md={3}>
     <Favs/>
    </Col>
    </Row>
 
    </div>
  );
}

export default Main;
