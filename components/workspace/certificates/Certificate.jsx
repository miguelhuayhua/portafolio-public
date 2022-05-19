//import react component
import { Component, createRef, useRef, useMemo } from "react";
//react next
//React Bootstrap
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Toast,
  Tab,
  Nav,
  Table,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Navbar,
  Modal,
  Image,
} from "react-bootstrap";
//redux
import { connect } from "react-redux";
//actions
//charts
import "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
//axios
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
export default class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificados: [],
      showModal: false,
      files: null,
    };
    this.form = createRef();
    this.img = createRef();
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    axios
      .get("http://localhost:3100/certificate", {}, { withCredentials: true })
      .then((value) => {
        this.setState(() => {
          console.log(value.data);
          return {
            certificados: [...value.data],
          };
        });
      });
  }
  openCloseModal() {
    this.setState((prevState) => {
      return {
        ...prevState,
        showModal: !prevState.showModal,
      };
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col className="tools" md={{ span: 12, offset: 0 }}>
            <ButtonGroup className="my-2 ms-3">
              <Button
                className="btn-outline-light"
                variant="transparent"
                onClick={this.openCloseModal.bind(this)}
              >
                Agregar
              </Button>
              <Button className="btn-outline-light" variant="transparent">
                Reportes
              </Button>
              <Button
                className="btn-outline-light"
                variant="transparent"
                onClick={this.loadData.bind(this)}
              >
                Actualizar
              </Button>

              <DropdownButton
                as={ButtonGroup}
                variant="outline-light"
                className="bg-transparent"
                title="Generar"
                id="bg-nested-dropdown"
              >
                <Dropdown.Item eventKey="1">Excel</Dropdown.Item>
                <Dropdown.Item eventKey="2">PDF</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Col>
          <Col md={{ span: 12, offset: 0 }}>
            <ButtonGroup>
              <Button onClick={this.openCloseModal.bind(this)} variant="light">
                Agregar
              </Button>
              <Button variant="light">Reportes</Button>
              <Button onClick={this.loadData.bind(this)} variant="light">
                Actualizar
              </Button>

              <DropdownButton
                as={ButtonGroup}
                variant="light"
                title="Generar"
                id="bg-nested-dropdown"
              >
                <Dropdown.Item eventKey="1">Excel</Dropdown.Item>
                <Dropdown.Item eventKey="2">PDF</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Col>
          <Col
            className="mb-4 rounded overflow-hidden"
            xs="12"
            lg={{ span: 10, offset: 1 }}
          >
            <Table className="shadow" striped responsive variant="light">
              <thead className="" style={{ position: "sticky", top: 0 }}>
                <tr>
                  <th className="bg-dark text-white">#</th>
                  <th className="bg-dark text-white">Titulo</th>
                  <th className="bg-dark text-white">Empresa</th>
                  <th className="bg-dark text-white">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {this.state.certificados.map((value, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{value.title}</td>
                      <td>{value.business}</td>
                      <td>{value.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="6">
            <Card border="light">
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <div id="line">
                  <Line
                    id="canvas"
                    className="bg-dark"
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: { color: "white" },
                          align: "start",
                        },
                        title: {
                          display: true,
                          text: "Clientes los últimos 7 días",
                          color: "#AAA",
                        },
                        tooltip: {
                          backgroundColor: "#BBB",
                          bodyColor: "#111",
                          titleColor: "#111",
                          bodyFont: { size: 14 },
                        },
                      },
                      scales: {
                        y: {
                          // not 'yAxes: [{' anymore (not an array anymore)
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
                            color: "#444",
                          },
                        },
                        x: {
                          ticks: {
                            color: "white",
                            font: {
                              size: 14,
                            },
                          },
                          grid: {
                            color: "#444",
                          },
                        },
                      },
                    }}
                    data={{
                      labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                      ],

                      datasets: [
                        {
                          label: "Clientes",
                          data: [20, 20, 50, 100, 200, 50, 1],
                          borderColor: "#FFF",
                          backgroundColor: "#FFF",
                          pointStyle: "circle",
                        },
                      ],
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" lg="6">
            <Card border="light">
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Bar
                  className="bg-dark"
                  data={{
                    labels: ["Miguel", "Huayhua", "Luis", "Condori", "Mamani"],
                    datasets: [
                      {
                        data: [12, 3, 45, 45, 23],
                        label: "Ventas realizadas",
                        backgroundColor: ["white"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                        align: "start",
                      },
                      tooltip: {
                        backgroundColor: "#BBB",
                        bodyColor: "#111",
                        titleColor: "#111",
                        bodyFont: { size: 14 },
                      },
                      title: {
                        display: true,
                        text: "Clientes los últimos 7 días",
                        color: "#AAA",
                      },
                    },
                    color: "white",
                    scales: {
                      y: {
                        // not 'yAxes: [{' anymore (not an array anymore)
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
                          color: "#444",
                        },
                      },
                      x: {
                        ticks: {
                          color: "white",
                          font: {
                            size: 14,
                          },
                        },
                        grid: {
                          color: "#444",
                        },
                      },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" lg="6">
            <Card border="light">
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Title>Light Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal
          show={true}
          fullscreen={true}
          onHide={this.openCloseModal.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Nuevo certificado:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col
                xs="12"
                md={{ span: 6, offset: 3 }}
                className="shadow rounded p-3"
              >
                <Form
                  ref={this.form}
                  method="post"
                  encType="multipart/form-data"
                  id="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    let formData = new FormData(this.form.current);
                    formData.append("date", new Date().toISOString());
                    console.log(new Date().getHours());
                    axios({
                      method: "post",
                      url: "http://localhost:3100/certificate/add",
                      data: formData,
                      headers: { "Content-Type": "multipart/form-data" },
                    }).then(() => {});
                  }}
                >
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      name="title"
                      type="text"
                      placeholder="Introduzca el título del certificado"
                      className="input focus border"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                      name="business"
                      type="text"
                      placeholder="Introduzca la empresa"
                      className="input focus border"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Select className="input focus border" name="year">
                      <option>Año</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Select className="input focus border" name="month">
                      <option>Mes</option>
                      <option value="Enero">Enero</option>
                      <option value="Febrero">Febrero</option>
                      <option value="Marzo">Marzo</option>
                      <option value="Abril">Abril</option>
                      <option value="Mayo">Mayo</option>
                      <option value="Junio">Junio</option>
                      <option value="Julio">Julio</option>
                      <option value="Agosto">Agosto</option>
                      <option value="Septiembre">Septiembre</option>
                      <option value="Octubre">Octubre</option>
                      <option value="Noviembre">Noviembre</option>
                      <option value="Diciembre">Diciembre</option>
                    </Form.Select>
                  </Form.Group>
                  <Row>
                    <Col xs="7">
                      <Form.Group className="mb-3" controlId="inputfile">
                        <Form.Label>Seleccione la imagen:</Form.Label>
                        <Form.Control
                          onChange={(e) => {
                            this.img.current.src = URL.createObjectURL(
                              e.target.files[0]
                            );
                          }}
                          id="inputfile"
                          type="file"
                          accept="image/*"
                          name="files"
                          className="input focus border"
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      md={{ span: 4, offset: 1 }}
                      className="shadow mb-5"
                      style={{ width: 240, height: 130 }}
                    >
                      <Image src="" alt="" ref={this.img} thumbnail />
                    </Col>
                  </Row>

                  <Button
                    variant="dark"
                    type="submit"
                    className="d-block mx-auto mb-5"
                  >
                    Agregar certificado
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
