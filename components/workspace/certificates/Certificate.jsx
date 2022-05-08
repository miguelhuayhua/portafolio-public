
//import react component
import { Component, createRef, useRef, useMemo } from "react";
//react next
//React Bootstrap
import { Row, Col, Card, Form, Button, Toast, Tab, Nav, Table, ButtonGroup, DropdownButton, Dropdown, Navbar, Modal } from "react-bootstrap";
//redux
import { connect } from "react-redux";
//actions
//charts
import 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
//axios
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
export default class Certificate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificados: [],
            showModal: false,
            files: null
        }
        this.form = createRef();
    }
    componentDidMount() {
        this.loadData();



    }

    loadData() {
        axios.get("http://localhost:3100/certificate", {}, { withCredentials: true }).then(value => {
            this.setState(() => {
                console.log(value.data)
                return {
                    certificados: [...value.data]
                }
            })
        })
    }
    openCloseModal() {
        this.setState(prevState => {
            return {
                ...prevState,
                showModal: !prevState.showModal
            }
        })
    }

    render() {

        return (<>
            <Row >

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
                        <Button onClick={this.openCloseModal.bind(this)} variant="light">Agregar</Button>
                        <Button variant="light">Reportes</Button>
                        <Button onClick={this.loadData.bind(this)} variant="light">Actualizar</Button>

                        <DropdownButton as={ButtonGroup} variant="light" title="Generar" id="bg-nested-dropdown">
                            <Dropdown.Item eventKey="1">Excel</Dropdown.Item>
                            <Dropdown.Item eventKey="2">PDF</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                </Col>
                <Col className="mb-4 rounded overflow-hidden" xs="12" lg={{ span: 10, offset: 1 }}>
                    <Table className="shadow" striped responsive variant="light" >
                        <thead className="" style={{ position: 'sticky', top: 0 }}>
                            <tr>
                                <th className="bg-dark text-white">#</th>
                                <th className="bg-dark text-white">Titulo</th>
                                <th className="bg-dark text-white">Empresa</th>
                                <th className="bg-dark text-white">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.certificados.map((value, index) => {

                                return <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{value.title}</td>
                                    <td>{value.business}</td>
                                    <td>{value.date}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col xs="12" lg="6">
                    <Card border="light" >
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
                                                borderColor: '#FFF',
                                                backgroundColor: '#FFF',
                                                pointStyle: "circle",

                                            },
                                        ],
                                    }} /></div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="12" lg="6">
                    <Card border="light" >
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Bar className="bg-dark" data={
                                {

                                    labels: ["Miguel", "Huayhua", "Luis", "Condori", "Mamani"],
                                    datasets: [
                                        {
                                            data: [12, 3, 45, 45, 23],
                                            label: 'Ventas realizadas',
                                            backgroundColor: ['white']
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
            <Modal show={this.state.showModal} fullscreen={true} onHide={this.openCloseModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={this.form} method="post" encType="multipart/form-data" id="form" onSubmit={(e) => {
                        e.preventDefault();
                        let formData = new FormData(this.form.current);
                        axios({
                            method: "post",
                            url: "http://localhost:3100/certificate/add",
                            data: formData,
                            headers: { "Content-Type": "multipart/form-data" }
                        }).then(() => {
                        })
                    }}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Título</Form.Label>
                            <Form.Control name="title" type="text" placeholder="Introduzca el título del certificado" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control name="business" type="text" placeholder="Introduzca la empresa" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Fecha de emisión</Form.Label>
                            <Form.Control name="business" type="month" min="2020-08" value="2020-10" placeholder="Introduzca la empresa" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Choose File</Form.Label>
                            <Form.Control id="inputfile" type="file" accept="image/*" name="files" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

        )
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



