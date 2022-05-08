//import react component
import { Component, createRef } from "react";
//React Bootstrap
import { Row, Col, } from "react-bootstrap";
//next
import Router from "next/router";
//cookies
import Cookies from 'js-cookie';

//component 
import Certificate from './Certificate';
import { LeftPanel } from "../LeftPanel";

export default class Certificates extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (Cookies.get("session") == undefined) Router.back();
    }

    render() {

        return (<>
            <Row >
                <Col xs={12} md={3} lg={2} className="p-0">
                    <LeftPanel />
                </Col>
                <Col className="bg-light" xs={12} md={9} lg={10}>
                    <Certificate />
                </Col>
            </Row>
        </>)
    }
}
