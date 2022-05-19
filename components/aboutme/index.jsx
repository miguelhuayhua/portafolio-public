import { Component } from "react";
//react bootstrap
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Accordion,
  Modal,
  Image,
} from "react-bootstrap";
// next
import Link from "next/link";
//font awesome
import { SiSololearn } from "react-icons/si";
import { MdOutlineDoneOutline } from "react-icons/md";
//redux
import { connect } from "react-redux";
import { chargeCertificates } from "../../redux/actions";
//images
import logoSoloLearn from "../../public/assets/soloLearn.png";
//components
import Certificate from "./Certificate";
//import modules
import axios from "axios";

class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }
  componentDidMount() {
    console.log("refresh");
    axios.get("http://localhost:3100/certificate").then((result) => {
      this.props.onRefresh(result.data);
    });
  }
  render() {
    return (
      <>
        <Container fluid className="">
          <Row>
            <Col
              className="mx-xl-auto"
              xs={{ span: 12, offset: 0 }}
              md={{ span: 8, offset: 2 }}
              xl={{ span: 5 }}
            >
              <Card className="border-0 shadow-lg">
                <Card.Img
                  variant="top"
                  className="rounded-circle shadow mx-auto image-enter"
                  src="https://m.media-amazon.com/images/I/81es2htLT9L._SS500_.jpg"
                />
                <Card.Body>
                  <Card.Title>Miguel Huayhua Condori</Card.Title>
                  <Card.Text>
                    <p className="text-center">
                      <strong>Desarrollador web boliviano</strong>, encantado de
                      colaborar en proyectos de diferente tipo, aplicaciones de
                      escritorio, móvil, web. Soy un gran amante del lenguaje de
                      JavaScript.
                    </p>
                    <section>
                      <h5 className="text-center">Detalles:</h5>
                      <p style={{ fontSize: "1em" }}>
                        Edad: 21 años
                        <br />
                        Profesion: Estudiante universitario
                        <br />
                        Universidad: Universidad Pública de El Alto (UPEA)
                        <br />
                        Ubicación: El Alto - La Paz - Bolivia
                        <br />
                        Compromiso:{" "}
                        <span>
                          <MdOutlineDoneOutline fontSize="20" color="green" />{" "}
                        </span>
                        <br />
                        Puntualidad:{" "}
                        <span>
                          <MdOutlineDoneOutline fontSize="20" color="green" />{" "}
                        </span>
                        <br />
                        Remoto:{" "}
                        <span>
                          <MdOutlineDoneOutline fontSize="20" color="green" />{" "}
                        </span>
                        <br />
                        Disponible:{" "}
                        <span>
                          <MdOutlineDoneOutline fontSize="20" color="green" />{" "}
                        </span>
                      </p>
                    </section>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={{ span: 12, offset: 0 }}>
              <h3 className="mt-5">Certificaciones:</h3>
              <Accordion alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Certificaciones externos</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {this.props.data.map((ce) => (
                        <Certificate
                          key={ce._id}
                          id={ce._id}
                          title={ce.title}
                          year={ce.year}
                          month={ce.month}
                          business={ce.business}
                        />
                      ))}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Certificaciones universitarias
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xs="12" md="6" xl="4" className="mb-3">
                        <Card>
                          <Card.Img
                            variant="top"
                            src="https://www.sololearn.com/certificates/course/en/25363066/1060/landscape/png"
                          />
                          <Card.Body>
                            <Card.Title>SQL</Card.Title>
                            <Card.Text>
                              <div className="d-flex">
                                <Image
                                  width={35}
                                  height={35}
                                  src={logoSoloLearn}
                                />
                                <p className="mx-3 my-auto">
                                  Empresa Emisora: Solo Learn
                                </p>
                              </div>
                              Fecha: 04/2021
                            </Card.Text>

                            <div className="d-flex justify-content-center">
                              <Link
                                href="https://www.sololearn.com/certificates/course/en/25363066/1060/landscape/png"
                                passHref
                              >
                                <a
                                  className="btn btn-outline-dark"
                                  target="_blank"
                                >
                                  Ver Credenciales
                                </a>
                              </Link>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
          <Modal size="lg" show={this.state.showModal}>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                React + Redux
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Image
                src="https://www.sololearn.com/certificates/course/en/25363066/1060/landscape/png"
                fluid
              ></Image>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-dark"
                className="w-25"
                onClick={(e) => {
                  this.setState((prev) => {
                    return { showModal: !prev.showModal };
                  });
                }}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.certificateReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRefresh(data) {
      dispatch(chargeCertificates(data));
    },
  };
};
const AboutMeMain = connect(mapStateToProps, mapDispatchToProps)(AboutMe);
export default AboutMeMain;
