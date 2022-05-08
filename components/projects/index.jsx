//react
import { Component } from 'react';
//react-bootstrap
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { BsCardText } from 'react-icons/bs';

//redux

//icons
import { FaJava } from 'react-icons/fa';
import { SiCsharp, SiJava, SiJavascript } from 'react-icons/si';
export default class Project extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }

    render() {
        return (
            <>
                <Row>
                    <Col xs="12" md="6" >
                        <Card className='rounded shadow'>
                            <Card.Header className='bg-dark'>
                                <Card.Title className='text-white'>Proyecto Restaurante</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className='fw-light'>
                                    Un proyecto de restaurante desarrollado con el propósito de optimizar ciertas tareas.
                                </Card.Subtitle>
                                <Card.Text className='d-flex align-items-center'>
                                    Lenguajes utilizados:<SiJava fontSize={30} /><SiCsharp fontSize={30} /><SiJavascript fontSize={30} />
                                </Card.Text>
                                <Card.Text>
                                    Repositorio: No</Card.Text>
                            </Card.Body>
                            <Card.Footer className='d-flex justify-content-center'>
                                <Button onClick={(e) => {
                                    this.setState((prev => {
                                        return { show: !prev.show }
                                    }))
                                }} variant='outline-dark'>Más información</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Modal show={this.state.show} fullscreen={true}>
                    <Modal.Header>
                        <Modal.Title>Modal</Modal.Title>
                        <Button variant='dark' onClick={(e)=>{
                            this.setState(prev=>{
                                return {show:!prev.show}
                            })
                        }}>Cerrar</Button>
                    </Modal.Header>
                    <Modal.Body>
                        Modal body content
                        </Modal.Body>
                </Modal>
            </>
        );
    }


}