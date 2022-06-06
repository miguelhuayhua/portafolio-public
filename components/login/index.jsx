//react
import { Component } from 'react';

//react-bootstrap
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import Router from 'next/router';
//redux
import { connect } from 'react-redux';

//actions
import { userNameChange, passwordChange, logedChange } from '../../redux/actions';

//next
//cookie
import Cookies from 'js-cookie';

//axios
import axios from 'axios';
//url
import url from '../../api';
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    onUserNameChange(ev) {
        this.props.onUserNameChanged(ev.target.value);
    }
    onPasswordChange(ev) {
        this.props.onPasswordChanged(ev.target.value);
    }
    onSubmit(ev) {
        ev.preventDefault();
        axios.post(url + "/user/login",
            {
                username: this.props.username,
                password: this.props.password
            },
            { withCredentials: true }).then(
                result => {
                    if (result.status == 200 && result.data != 'No existe usuario' && result.data != 'Contraseña de usuario erronea') {
                        Cookies.set("session", result.data.id, { expires: 1000 * 60 * 60 })
                        Router.push("/workspace/home");
                    }
                }
            ).catch(err => {
                alert(err)
            })
    }
    render() {
        return (
            <>
                <Row>
                    <Col className='rounded shadow my-5' xs="12" md={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
                        <Form onSubmit={this.onSubmit.bind(this)} >
                            <Form.Group className="mb-3 px-4" controlId="formBasicEmail">
                                <Form.Label className='bg-dark bg-opacity-75 text-white px-5 rounded ¿'>Usuario:</Form.Label>
                                <Form.Control className='focus' type="type" placeholder="Introduce tu nombre de usuario..."
                                    value={this.props.username}
                                    onChange={this.onUserNameChange.bind(this)} />
                            </Form.Group>

                            <Form.Group className="mb-3 px-4" controlId="formBasicPassword">
                                <Form.Label className='bg-dark bg-opacity-75 text-white px-5 rounded'>Contraseña</Form.Label>
                                <Form.Control className='focus' type="password" placeholder="Introduce tu contraseña..."
                                    value={this.props.password}
                                    onChange={this.onPasswordChange.bind(this)} />
                            </Form.Group>
                            <Button variant="outline-dark" className='d-block w-50 mx-auto mb-5' type="submit">
                                Iniciar Sesión
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        password: state.loginReducer.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUserNameChanged(username) {
            dispatch(userNameChange(username));
        },
        onPasswordChanged(password) {
            dispatch(passwordChange(password));
        },
        onLogedChanged(status) {
            dispatch(logedChange(status))
        }
    }
}


const LoginMain = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginMain;