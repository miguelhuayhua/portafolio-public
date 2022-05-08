//import react component
import { Component, createRef } from "react";
//React Bootstrap
import { Row, Col, } from "react-bootstrap";
//next
import Router from "next/router";
//cookies
import Cookies from 'js-cookie';

//component 
import CustomersMain from "./Clientes";
import { LeftPanel } from "../LeftPanel";

export default class Customer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (Cookies.get("session") == undefined) Router.back();
    }

    render() {
        return (<>
            <Row className="">
                <Col xs={12} md={3} lg={2} className="bg-info" >
                    <LeftPanel />
                </Col>
                <Col className="bg-light" xs={12} md={9} lg={10}>
                    <CustomersMain />
                </Col>
            </Row>
        </>)
    }
}
