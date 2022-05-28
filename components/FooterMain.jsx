//import react component
import { Component, createRef, useRef } from "react";
//react next
//React Bootstrap
import Container from 'react-bootstrap/Container';
import { Row, Col, Form, Button, Toast } from "react-bootstrap";
//redux
import { connect } from "react-redux";
//actions
import { addNumber, emailChange, nameChange, phoneChange, phoneCodeChange } from "../redux/actions";
//icons
import { IoLogoWhatsapp } from 'react-icons/io';
import { BsTelegram } from 'react-icons/bs';
import { MdEmail, MdOutlineDoneAll } from 'react-icons/md';
import { GrStatusGood } from 'react-icons/gr';
//axios
import axios from 'axios';

class FooterMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            flag: this.props.countries[0].flag,
            showMessage: false
        };
    }
    onNameChanged(e) {
        this.props.onNameChanged(e.target.value);
    }
    onEmailChanged(e) {
        this.props.onEmailChanged(e.target.value);
    }
    onPhoneChanged(e) {
        this.props.onPhoneChanged(e.target.value);
    }
    onPhoneCodeChanged(e) {
        this.props.onPhoneCodeChanged(e.nativeEvent.target.value);
        const value = this.props.countries.find((value, index) => {
            if (value.code == e.nativeEvent.target.value) return true;
        })
        this.setState((prev) => {
            return { ...prev, flag: value.flag }
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const { name, email, phone, phoneCode } = this.props;
        if (name.length != 0) {
            axios.post("https://server-miguel.herokuapp.com/client/new",
                {
                    name,
                    email,
                    phone,
                    phoneCode
                }).then(val => {
                    this.props.onNameChanged("");
                    this.props.onEmailChanged("");
                    this.props.onPhoneChanged("");
                    this.setState((prevState) => {
                        return { ...prevState, showMessage: true }
                    })
                })
        }

    }

    render() {

        return (<>
            <Container className="border-1 border-dark border-top mt-5" fluid>
                <Row>
                    <Col className="mt-5" xs="12">
                        <p className="text-center">Si quieres que me contacte contigo, por favor coloca tu nombre y <b>tu Correo o Celular.</b></p>
                    </Col>
                    <Col className="mt-2 mx-auto" xs="12" md="8">
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <h3>
                                        Introduce tu nombre:
                                    </h3>
                                </Form.Label>
                                <Form.Control ref={this.inputNameRef} className="focus rounded border border-dark" required
                                    type="text" placeholder="Introduce tu nombre..." name="name"
                                    onChange={this.onNameChanged.bind(this)}
                                    value={this.props.name}
                                   
                                />
                            </Form.Group>
                            <Row>
                                <Col xs="12" xxl="6"><Form.Group className="mb-3" >
                                    <Form.Label>
                                        <h5>
                                            Correo: <MdEmail color="peru" />
                                        </h5>
                                    </Form.Label>
                                    <Form.Control className="focus rounded border border-dark" type="email" placeholder="ejemplo@gmail.com (Opcional)" name="email"
                                        onChange={this.onEmailChanged.bind(this)}
                                        value={this.props.email}
                                    />
                                </Form.Group></Col>
                                <Col xs="12" xxl="6">
                                    <Form.Group className="mb-3" >
                                        <Form.Label>
                                            <h5>
                                                Celular:<IoLogoWhatsapp color="limegreen" /><BsTelegram color="darkturquoise" />
                                            </h5>
                                        </Form.Label>
                                        <div className="d-flex">
                                            <div className="d-flex ps-3">
                                                <div style={{ width: 80 }}>
                                                    {this.state.flag}
                                                </div>
                                                <Form.Select onChange={this.onPhoneCodeChanged.bind(this)} size="sm"
                                                    className="d-inline border-0 input focus rounded-pill" name="code">
                                                    {
                                                        this.props.countries.map((val, _i) => {
                                                            return <option
                                                                value={val.code} key={_i}>{val.code}</option>;
                                                        })
                                                    }
                                                </Form.Select>
                                            </div>
                                            <Form.Control className="focus rounded-pill border border-dark" type="number" placeholder="Celular (Opcional)" name="phone"
                                                onChange={this.onPhoneChanged.bind(this)}
                                                value={this.props.phone}
                                            />
                                        </div>

                                    </Form.Group>
                                </Col>
                                <Col xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
                                    <Button className="rounded-pill w-100 mb-5 mt-3" variant="outline-dark" type="submit">
                                        Enviar Datos
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

            </Container>
            {/*ventana modal*/}
            <Toast className="position-fixed bottom-0 end-0" onClose={() => {
                this.setState(prev => {
                    return ({ ...prev, showMessage: false })
                })
            }}
                delay={8000} show={this.state.showMessage} autohide>

                <Toast.Body>
                    <h3 className="d-flex justify-content-center align-items-center">
                        Gracias!
                        <MdOutlineDoneAll className="ms-2" fontSize={30} color="limegreen" />
                    </h3> <h6 className="text-center">Me contactaré contigo lo más pronto posible....</h6>
                </Toast.Body>
            </Toast>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        phone: state.phoneNumber.phone,
        countries: state.phoneNumber.numbers,
        flag: null,
        name: state.clientReducer.name,
        email: state.clientReducer.email,
        phone: state.clientReducer.phone,
        phoneCode: state.clientReducer.phoneCode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        phoneSelected(phone) {
            dispatch(addNumber(phone));
        },
        onNameChanged(name) {
            dispatch(nameChange(name));
        },
        onEmailChanged(email) {
            dispatch(emailChange(email));
        },
        onPhoneChanged(phone) {
            dispatch(phoneChange(phone));
        },
        onPhoneCodeChanged(phoneCode) {
            dispatch(phoneCodeChange(phoneCode));
        }
    }
}

const FooterMainRedux = connect(mapStateToProps, mapDispatchToProps)(FooterMain);
export default FooterMainRedux;