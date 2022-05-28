//import react component
import { Component } from "react";
//react next

import Link from "next/link";

//React Bootstrap
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import Image2 from "react-bootstrap/Image"
import logo from '../public/logo.png';
//React icons
import { AiFillHome, AiFillCode } from 'react-icons/ai';
import { MdWork } from 'react-icons/md';
import { RiLoginBoxFill } from 'react-icons/ri';

export default class NavbarMain extends Component {


    constructor(props) {
        super(props);
        this.state = { show: false }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState(prev => {
            return { show: !prev.show }
        })
    }
    render() {

        return (<>
            <Navbar className="mb-3" style={{
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: "#CCC"
            }} expand="lg">
                <Container>
                    <Link href="/">
                        <Navbar.Brand className="logo">
                            <Image width={50} height={50} src="https://server-miguel.herokuapp.com/"></Image>
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-5">
                            <Nav.Link className="mx-4 links"  >
                                <Link href="/">
                                    <span className="link d-flex"><AiFillHome className="m-auto mx-1" color="#444" />Inicio</span>
                                </Link>
                            </Nav.Link>
                            <Nav.Link className="mx-4 links"  >
                                <Link href="/about" prefetch>
                                    <span className="link"><MdWork className="m-auto mx-1" color="#444" />Sobre Mí</span>
                                </Link>
                            </Nav.Link>
                            <Nav.Link className="mx-4 links" >
                                <Link href="/projects">
                                    <span className="link"><AiFillCode className="m-auto mx-1" color="#444" />Proyectos</span>
                                </Link>
                            </Nav.Link>
                            <Nav.Link className="mx-4 links">
                                <Link href="/login">
                                    <span className="link"><RiLoginBoxFill className="m-auto mx-1" color="#444" />Login</span>
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>)
    }
}