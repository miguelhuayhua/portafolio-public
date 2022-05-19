//import react component
import { Component, createRef, useRef } from "react";
//react next
//React Bootstrap
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button, Toast, Tab, Nav, } from "react-bootstrap";
//redux
import { connect } from "react-redux";
//actions
//axios
import axios from 'axios';

export default class Inicio extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (<>
            <Container fluid className="">
                En desarrollo
            </Container>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

