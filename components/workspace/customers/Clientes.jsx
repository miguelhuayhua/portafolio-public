

//import react component
import { Component, createRef, useRef, useMemo } from "react";
//react next
//React Bootstrap
import Container from 'react-bootstrap/Container';
import { Row, Col, Card, Form, Button, Toast, Tab, Nav, Table, ButtonGroup, DropdownButton, Dropdown, Modal, FloatingLabel } from "react-bootstrap";
//redux
import { connect } from "react-redux";
//actions
import { phoneChange, phoneCodeChange, emailChange, nameChange } from '../../../redux/actions';
//charts
import 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2'
//icons
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { MdOutlineDoneAll } from 'react-icons/md';
//axios
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
class Clientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            showMessage: false,
            showToast: false,
            showModal: false,
            flag: this.props.countries[0].flag,
        }
        this.loadData();
    }


    loadData() {
        axios.post("http://localhost:3100/client", {}, { withCredentials: true }).then(value => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    customers: [...value.data]
                }
            })
        })
    }
    deleteCustomer(e) {
        let _id = e.target.id.length != 0 ? e.target.id : e.target.parentNode.parentNode.id;
        axios.delete("http://localhost:3100/client", { data: { _id }, withCredentials: true }).then(response => {
            if (response.data.eliminado) {
                this.loadData();
                this.setState((prevState) => {
                    this.loadData();
                    return { ...prevState, showMessage: true }
                })
            }

        })

    }
    openCloseModal() {
        this.setState(prevState => {
            return { ...prevState, showModal: !prevState.showModal }
        })
    }

    //phone code
    onPhoneCodeChanged(e) {
        this.props.onPhoneCodeChanged(e.nativeEvent.target.value);
        const value = this.props.countries.find((value, index) => {
            if (value.code == e.nativeEvent.target.value) return true;
        })
        this.setState((prev) => {
            return { ...prev, flag: value.flag }
        })
    }
    onPhoneChanged(e) {
        this.props.onPhoneChanged(e.target.value);
    }
    onNameChanged(e) {
        this.props.onNameChanged(e.target.value);
    }
    onEmailChanged(e) {
        this.props.onEmailChanged(e.target.value);
    }

    //submit client
    handleClient() {
        let { email, name, phone, phoneCode } = this.props;
        axios.post("http://localhost:3100/client/new",
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
                    return { ...prevState, showToast: true, showModal: false, flag: this.props.countries[0].flag }
                })
                this.loadData();
            })
    }
    render() {

        return (<>
            <Row >
                {/* <button >click</button> */}
                <Col className="tools" md={{ span: 12, offset: 0 }}>
                    <ButtonGroup className="my-2 ms-3">
                        <Button className="btn-outline-light" variant="transparent" onClick={this.openCloseModal.bind(this)}>Agregar</Button>
                        <Button className="btn-outline-light" variant="transparent">Reportes</Button>
                        <Button className="btn-outline-light" variant="transparent" onClick={this.loadData.bind(this)} >Actualizar</Button>

                        <DropdownButton as={ButtonGroup} variant="outline-light" className="bg-transparent" title="Generar" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1">Excel</Dropdown.Item>
                            <Dropdown.Item eventKey="2">PDF</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                </Col>
                <Col md={{ span: 12, offset: 0 }}>
                    <ButtonGroup>
                        <Button variant="light">Agregar</Button>
                        <Button variant="light">Reportes</Button>
                        <Button onClick={this.loadData.bind(this)} variant="light">Actualizar</Button>

                        <DropdownButton as={ButtonGroup} variant="light" title="Generar" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1">Excel</Dropdown.Item>
                            <Dropdown.Item eventKey="2">PDF</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                </Col>
                <Col className="mb-4 rounded overflow-hidden ms-lg-4" xs="12" lg={{ span: 9, offset: 0 }}>
                    <Table size="sm" onClick={this.deleteCustomer.bind(this)} className="shadow" striped responsive variant="light" >
                        <thead className="" style={{ position: 'sticky', top: 0 }}>
                            <tr>
                                <th className="bg-dark text-white">#</th>
                                <th className="bg-dark text-white">Nombre</th>
                                <th className="bg-dark text-white">Correo Electrónico</th>
                                <th className="bg-dark text-white">Celular</th>
                                <th className="bg-dark text-white"></th>
                                <th className="bg-dark text-white"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map((value, index) => {

                                return <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email.length == 0 ? "-----" : value.email}</td>
                                    <td>{value.phoneCode.length == 0 ? "----" : `${value.phoneCode} ${value.phone}`}</td>
                                    <td><Button variant="outline-danger" id={value._id} onClick={this.deleteCustomer.bind(this)}>
                                        <BsFillTrashFill name={value._id} onClick={this.deleteCustomer.bind(this)} /></Button></td>
                                    <td className="text-center"><Button variant="outline-secondary"><FaEdit fontSize={17} /></Button></td>

                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col className="mb-4 rounded overflow-hidden ms-lg-4" xs="12" lg={{ span: 2, offset: 0 }}>
                    <Card border="light" >
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>Light Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the cards content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="">
                <Col xs="12" lg="6" className="bg-dark border-dark" >
                    <Card border="light" className="bg-dark border-dark" >
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <div id="line">
                                <Line id="canvas" className="bg-dark"
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                                labels: { color: 'white' },
                                                align: 'start',
                                            },
                                            title: {
                                                display: true,
                                                text: 'Clientes los últimos 7 días',
                                                color: "#AAA"
                                            },
                                            tooltip: {
                                                backgroundColor: '#BBB',
                                                bodyColor: '#111',
                                                titleColor: '#111',
                                                bodyFont: { size: 14 }
                                            },

                                        },
                                        scales: {
                                            y: {  // not 'yAxes: [{' anymore (not an array anymore)
                                                ticks: {
                                                    color: "white", // not 'fontColor:' anymore
                                                    // fontSize: 18,
                                                    font: {
                                                        size: 12, // 'size' now within object 'font {}'
                                                    },
                                                    stepSize: 40,
                                                    beginAtZero: true,
                                                },
                                                grid: {
                                                    borderColor: "white",
                                                    drawOnChartArea: true,
                                                    offset: true,
                                                    borderWidth: 2,
                                                    tickColor: "#EEE",
                                                    color: '#444'
                                                }
                                            },
                                            x: {
                                                ticks: {
                                                    color: "white",
                                                    font: {
                                                        size: 14
                                                    }
                                                },
                                                grid: {
                                                    color: '#444'
                                                }
                                            }
                                        },
                                    }}

                                    data={{
                                        labels: ['January', 'February', 'March', 'April', 'May', 'June'],

                                        datasets: [
                                            {
                                                label: 'Clientes',
                                                data: [20, 20, 50, 100, 200, 50, 1],
                                                borderColor: '#CCC',
                                                backgroundColor: 'rgba(255,255,255,.4)',
                                                pointStyle: "circle",
                                                fill: true,
                                                pointBackgroundColor: 'white',
                                                normalized: true
                                            },
                                        ],
                                    }} /></div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" lg="6" className="bg-dark border-dark">
                    <Card border="light" className="bg-dark border-dark" >
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Bar className="bg-dark" data={
                                {

                                    labels: ["Miguel", "Huayhua", "Luis", "Condori", "Mamani"],
                                    datasets: [
                                        {
                                            data: [12, 3, 45, 45, 23],
                                            label: 'Ventas realizadas',
                                            backgroundColor: 'rgba(255,255,255,.4)'
                                        }
                                    ]
                                }
                            }
                                options={
                                    {

                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                                align: 'start',
                                            },
                                            tooltip: {
                                                backgroundColor: '#BBB',
                                                bodyColor: '#111',
                                                titleColor: '#111',
                                                bodyFont: { size: 14 }
                                            },
                                            title: {
                                                display: true,
                                                text: 'Clientes los últimos 7 días',
                                                color: "#AAA",

                                            }
                                        },
                                        color: 'white',
                                        scales: {
                                            y: {  // not 'yAxes: [{' anymore (not an array anymore)
                                                ticks: {
                                                    color: "white", // not 'fontColor:' anymore
                                                    // fontSize: 18,
                                                    font: {
                                                        size: 12, // 'size' now within object 'font {}'
                                                    },
                                                    stepSize: 40,
                                                    beginAtZero: true,
                                                },
                                                grid: {
                                                    borderColor: "white",
                                                    drawOnChartArea: true,
                                                    offset: true,
                                                    borderWidth: 2,
                                                    tickColor: "#EEE",
                                                    color: '#444'
                                                }
                                            },
                                            x: {
                                                ticks: {
                                                    color: "white",
                                                    font: {
                                                        size: 14
                                                    }
                                                },
                                                grid: {
                                                    color: '#444'
                                                }
                                            }
                                        },


                                    }
                                }
                            />
                        </Card.Body>
                    </Card>
                </Col >
                <Col xs="12" lg="6">

                </Col>

            </Row>

            <Toast className="position-fixed bottom-0 end-0" onClose={() => {
                this.setState(prev => {
                    return ({ ...prev, showMessage: false })
                })
            }}
                delay={8000} show={this.state.showMessage} autohide>

                <Toast.Body>
                    <h3 className="d-flex justify-content-center align-items-center">
                        Eliminado!
                        <MdOutlineDoneAll className="ms-2" fontSize={30} color="limegreen" />
                    </h3> <h6 className="text-center">El cliente fué eliminado con éxito. </h6>
                </Toast.Body>
            </Toast>
            <Modal show={this.state.showModal} onHide={this.openCloseModal.bind(this)} size='lg'  >
                <Modal.Header className="bg-dark" aria>
                    <Modal.Title className="text-light">Nuevo cliente</Modal.Title>
                    <Button onClick={this.openCloseModal.bind(this)} variant="close" className="bg-white"></Button>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nombre completo:"
                        className="mb-3"
                    >
                        <Form.Control value={this.props.name} type="text" placeholder="" className="focus input border-dark"
                            onChange={this.onNameChanged.bind(this)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Correo electrónico:">
                        <Form.Control type="email" placeholder="" className="focus input border-dark" value={this.props.email} onChange={this.onEmailChanged.bind(this)} />
                    </FloatingLabel>
                    <div className="d-flex my-4">
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
                    </div>
                    <FloatingLabel controlId="floatingPassword" label="Celular:">
                        <Form.Control onChange={
                            this.onPhoneChanged.bind(this)
                        }
                            value={this.props.phone}
                            placeholder="" name="phone" type="number" className="focus input border-dark" />
                    </FloatingLabel>
                    <Button onClick={this.handleClient.bind(this)} className="d-block mx-auto w-50 my-4" variant="dark">Guardar Cliente</Button>
                </Modal.Body>
            </Modal>
            {/*ventana de mensaje*/}
            <Toast className="position-fixed bottom-0 end-0" onClose={() => {
                this.setState(prev => {
                    return ({ ...prev, showToast: false })
                })
            }}
                delay={8000} show={this.state.showToast} autohide>

                <Toast.Body>
                    <h3 className="d-flex justify-content-center align-items-center">
                        Completado
                        <MdOutlineDoneAll className="ms-2" fontSize={30} color="limegreen" />
                    </h3> <h6 className="text-center">Cliente nuevo agregado con éxito...</h6>
                </Toast.Body>
            </Toast>
        </>)
    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.phoneNumber.numbers,
        name: state.clientReducer.name,
        email: state.clientReducer.email,
        phone: state.clientReducer.phone,
        phoneCode: state.clientReducer.phoneCode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPhoneChanged(phone) {
            dispatch(phoneChange(phone));
        },
        onPhoneCodeChanged(phoneCode) {
            dispatch(phoneCodeChange(phoneCode));
        },
        phoneSelected(phone) {
            dispatch(addNumber(phone));
        },
        onNameChanged(name) {
            dispatch(nameChange(name));
        },
        onEmailChanged(email) {
            dispatch(emailChange(email));
        },
    }
}

const CustomersMain = connect(mapStateToProps, mapDispatchToProps)(Clientes);
export default CustomersMain;


