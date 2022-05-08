import { Component } from 'react'
//react bootstrap
import { Container, Row, Col, Card, Accordion, useAccordionButton } from 'react-bootstrap'
// next
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
//font awesome
import { FaGitAlt, FaGitlab, FaLinkedin } from 'react-icons/fa';
//images
import rbLogo from '../../public/assets/react-bootstrap.png';
import nextLogo from '../../public/assets/nextLogo.png';
import reduxLogo from '../../public/assets/reduxLogo.png';
import reactLogo from '../../public/assets/reactLogo.png';
import expressLogo from '../../public/assets/expressLogo.png';
import nodeLogo from '../../public/assets/nodeLogo.png';
import mongoLogo from '../../public/assets/mongoLogo.png';
export default class Welcome extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount(){
    }

    render() {

        return (
            <>
                <Container fluid>
                    <h2 className='text-center '>Bienvenido al portafolio de Miguel Huayhua</h2>
                    <Row>
                        <Col xs={{ span: 12 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 0 }} xl={{ span: 4, offset: 1 }}>
                            <Card className=' bg-light' >
                                <Card.Img className='rounded-circle shadow image-enter mx-auto' variant="top" src="https://m.media-amazon.com/images/I/81es2htLT9L._SS500_.jpg" />
                                <Card.Body>
                                    <Card.Title ><h1 className='text-center'><strong>Miguel Huayhua</strong></h1></Card.Title>
                                    <Card.Text className="d-flex justify-content-center">
                                        <Accordion className='container d-flex flex-column'>
                                            <CustomToggle eventKey='1'>
                                                <span className='link'>
                                                    ¿Deseas ver más links míos? Clickeame!
                                                </span>
                                            </CustomToggle>

                                            <Accordion.Item eventKey='1' >
                                                <Accordion.Body>
                                                    <FaGitAlt color='red' fontSize={25} />
                                                    <Link href="https://github.com/Miguel-Huayhua" passHref>
                                                        <a className='link linkinfo' target="_blank" rel="noopener noreferrer">
                                                            https://github.com/Miguel-Huayhua
                                                        </a>
                                                    </Link>
                                                    <br />
                                                    <FaGitlab color='orange' fontSize={25} />
                                                    <Link href="https://gitlab.com/miguelhuayhuac2" passHref>
                                                        <a className='link linkinfo' target="_blank" rel="noopener noreferrer">
                                                            https://gitlab.com/miguelhuayhuac2
                                                        </a>
                                                    </Link>
                                                    <br />
                                                    <FaLinkedin
                                                        color='steelblue' fontSize={25} />
                                                    <Link href="https://linkedin.com/in/miguel-huayhua" passHref>
                                                        <a className='link linkinfo' target="_blank" rel="noopener noreferrer">
                                                            https://linkedin.com/in/miguel-huayhua
                                                        </a>
                                                    </Link>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                        </Accordion>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='mx-auto mt-4 mt-md-0' sm={{ span: 12 }} md={{ span: 5, offset: 0 }} xl={{ span: 6, offset: 0 }}>
                            <Row>
                                <Col xs={{ span: 12 }}>
                                    <h3>Tecnologías Frontend aplicadas a este proyecto...</h3>
                                </Col>
                            </Row>
                            <Row>

                                <Col xs={{ span: 3 }} md={{ span: 3, offset: 0 }} xl={{ span: 2, offset: 2 }}>
                                    <Image src={rbLogo}></Image>
                                </Col>
                                <Col xs={{ span: 3 }} md={{ span: 3 }} xl={{ span: 2 }}>
                                    <Image src={nextLogo}></Image>

                                </Col>
                                <Col xs={{ span: 3 }} md={{ span: 3 }} xl={{ span: 2 }}>
                                    <Image src={reduxLogo}></Image>

                                </Col>
                                <Col xs={{ span: 3 }} md={{ span: 3 }} xl={{ span: 2 }}>
                                    <Image src={reactLogo}></Image>

                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col xs={{ span: 12 }} >
                                    <h3>Tecnologías Backend...</h3>
                                </Col>
                            </Row>
                            <Row >

                                <Col xs={{ span: 4 }} md={{ span: 3, offset: 1 }}>
                                    <Image src={nodeLogo}></Image>
                                </Col>
                                <Col xs={{ span: 4 }} md={{ span: 4 }}>
                                    <Image src={expressLogo}></Image>

                                </Col>
                                <Col xs={{ span: 4 }} md={{ span: 4 }}>
                                    <Image src={mongoLogo}></Image>

                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <button className="mb-1 btn-custom" onClick={decoratedOnClick}>
            {children}
        </button >
    );
}
