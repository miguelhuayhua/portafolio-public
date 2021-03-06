import { Component } from "react";
//react bootstrap
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
} from "react-bootstrap";
//font awesome
import { MdOutlineDoneOutline } from "react-icons/md";
//redux
import { connect } from "react-redux";
import { chargeCertificates } from "../../redux/actions";
//images
//components
import Certificate from "./Certificate";
//import modules
import axios from "axios";
import { ImageModal } from "./Modal";
//url
import url from "../../api";
class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      src: ''
    };
  }
  componentDidMount() {
    axios.get(url + "/certificate").then((result) => {
      this.props.onRefresh(result.data);
    });
    console.log(this.props.data)
  }
  showModal(e) {
    if (e.target.tagName === 'IMG') {
      let src = e.target.src;
      this.setState(prev => {
        return {
          ...prev, showModal: !prev.showModal, src
        }
      })
    }
  }

  closeModal() {
    this.setState(prev => {
      return {
        ...prev, showModal: !prev.showModal
      }
    })
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
                  src={
                    url + '/website/myself'
                  }
                />
                <Card.Body>
                  <Card.Title>Miguel Huayhua Condori</Card.Title>
                  <Card.Text>
                    <p className="text-center">
                      <strong>Desarrollador web boliviano</strong>, encantado de
                      colaborar en proyectos de diferente tipo, aplicaciones de
                      escritorio, m??vil, web. Soy un gran amante del lenguaje de
                      JavaScript.
                    </p>
                    <section>
                      <h5 className="text-center">Detalles:</h5>
                      <p style={{ fontSize: "1em" }}>
                        Edad: 21 a??os
                        <br />
                        Profesion: Estudiante universitario
                        <br />
                        Universidad: Universidad P??blica de El Alto (UPEA)
                        <br />
                        Ubicaci??n: El Alto - La Paz - Bolivia
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
                    <Row onClick={this.showModal.bind(this)} >
                      {this.props.data.filter(value => {
                        return value.type == 'E';
                      }).map((ce) => (
                        <Certificate
                          key={ce._id}
                          id={ce._id}
                          title={ce.title}
                          year={ce.year}
                          month={ce.month}
                          business={ce.business}
                          credencial={ce.credencial || ''}
                          type={ce.type}
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
                      {this.props.data.filter(value => {
                        return value.type == 'U';
                      }).map((ce) => (
                        <Certificate
                          key={ce._id}
                          id={ce._id}
                          title={ce.title}
                          year={ce.year}
                          month={ce.month}
                          business={ce.business}
                          credencial={ce.credencial || ''}
                          type={ce.type}
                        />
                      ))}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
          <ImageModal closeModal={this.closeModal.bind(this)} show={this.state.showModal} src={this.state.src} />
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
