//react
import { Component } from "react";
//react bootstrap
import { Container } from "react-bootstrap";
//components
import NavbarMain from '../../components/NavbarMain';
import LoginMain from "../../components/login";
export default class Login extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Container className="rounded shadow">
                    <NavbarMain />
                    <LoginMain />
                </Container>
            </>
        )
    }

}