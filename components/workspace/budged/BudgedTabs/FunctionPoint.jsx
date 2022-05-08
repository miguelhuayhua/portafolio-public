//react component
import { Component, createRef } from 'react';

//react bootstrap
import {
    Button, Container, Row, Col, Table, Form, FloatingLabel, OverlayTrigger, Tooltip, Card
} from 'react-bootstrap';

//react icons
import { BsFillTrashFill } from 'react-icons/bs';
//charts
import { LineChart, BarChart } from './Charts';
//pdf
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'
//initial state and Quiz component
import { initialState, Quiz } from './data'
export default class FunctionPoint extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        //componente de búsqueda
        this.quiz = createRef();
        this.time = createRef();
        this.nrodev = createRef();
        this.generation = createRef();
    }
    addRequerimiento(e) {
        e.preventDefault();
        let { reqname, reqdesc, reqtype, range } = this.state;
        this.setState(prevState => {
            return {
                requirements: [...prevState.requirements, {
                    reqname, reqdesc, reqtype, range,
                }],
                reqname: "",
                reqdesc: "",
            }

        })
    }

    onNameChange(e) {
        let reqname = e.target.value;
        this.setState(prevState => {
            return { ...prevState, reqname }
        })
    }
    onDescriptionChange(e) {
        this.setState(prevState => {
            return { ...prevState, reqdesc: e.target.value }
        })
    }
    onTypeChange(e) {

        this.setState(prevState => {
            return { ...prevState, reqtype: e.target.value }
        })
    }
    onRangeChange(e) {
        this.setState(prevState => {
            return { ...prevState, range: e.target.value }
        })
    }
    onClickTable(e) {
        if (e.target.type == 'button' && e.target.name != 'accion' && e.target.name != 'delete') {
            let sibling1 = null;
            let sibling2 = null;
            let button = e.target;
            if (button.name === 'low') {
                sibling1 = button.nextSibling;
                sibling2 = sibling1.nextSibling;
                button.classList.add('select')
                sibling1.classList.remove('select');
                sibling2.classList.remove('select');
            }
            else if (button.name === 'medium') {
                sibling1 = button.previousSibling;
                sibling2 = button.nextSibling;
                button.classList.add('select')
                sibling1.classList.remove('select');
                sibling2.classList.remove('select');
            }
            else if (button.name === 'high') {
                sibling1 = button.previousSibling;
                sibling2 = sibling1.previousSibling;
                button.classList.add('select')
                sibling1.classList.remove('select');
                sibling2.classList.remove('select');
            }
            let index = button.parentElement.title;
            let requirements2 = [...this.state.requirements];
            let requirement = requirements2.splice(index, 1)[0]
            requirement["range"] = button.title;
            requirements2 = [...requirements2.slice(0, index), requirement, ...requirements2.slice(index)]
            this.setState(prevState => {
                return { ...prevState, requirements: [...requirements2] }
            })
        }
    }
    onClickDelete(e) {
        let index = null;
        if (e.target.getAttribute("texto") != null) {
            index = e.target.getAttribute("texto");
        }
        else {
            index = e.target.parentElement.getAttribute("texto");
        }
        this.deleteRequirement(index);
    }

    deleteRequirement(index) {
        this.setState(prev => {
            return { ...prev, requirements: [...prev.requirements.slice(0, index), ...prev.requirements.splice(parseInt(index) + 1, prev.requirements.length)] }
        })
    }

    //quiz

    handleQuizValue(value, index) {
        let factors = [...this.state.factors]
        let quiz = factors.splice(index, 1)[0];
        quiz["value"] = parseInt(value);
        factors = [...factors.slice(0, index), quiz, ...factors.slice(index)];
        this.setState(prev => {
            return { ...prev, factors }
        })
    }
    lastMethod() {
        let pfa = 0;
        let factor = 0;
        let pfsa = 0;
        let h_H = 0;
        this.state.requirements.forEach(requirement => {
            pfsa += parseInt(requirement.range);
        })
        this.state.factors.forEach(fac => {
            factor += parseInt(fac.value);
        })
        pfa = (pfsa * (0.65 + (0.01 * factor))).toFixed(2);
        h_H = (pfa * this.state.time).toFixed(2);
        console.log(this.state.duracion)
        this.setState(prev => {
            return { ...prev, pfa, pfsa, factor, h_H };
        })
    }

    render() {
        return (<>
            <Container>
                <Row >
                    <Col xs="12" lg="6">
                        <LineChart />
                    </Col>
                    <Col xs="12" lg="6">
                        <BarChart />
                    </Col>
                    <Col xs="12">
                        <h2 className='text-center my-4'>Bienvenido, a continuación te pedimos llenar los campos solicitados</h2>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col className='shadow' xs="12" md={{ span: 6, offset: 3 }}>
                                <Form onSubmit={this.addRequerimiento.bind(this)} className='p-4' style={{
                                    borderRadius: 30
                                }}  >
                                    < FloatingLabel controlId="floatingInputGrid" label="Nombre del requerimiento" >
                                        <Form.Control
                                            className='focus border-dark my-2'
                                            type="text"
                                            name="requerimiento"
                                            value={this.state.reqname}
                                            onChange={this.onNameChange.bind(this)}
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingTextarea2" label="Descripcion">
                                        <Form.Control
                                            as="textarea"
                                            type="textarea"
                                            className='focus border-dark my-2'
                                            value={this.state.reqdesc}
                                            onChange={this.onDescriptionChange.bind(this)}
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingSelectGrid" label="Tipo">
                                        <Form.Select onChange={this.onTypeChange.bind(this)} defaultValue={"EI"} className='focus border-dark my-2'>
                                            <option value="EI">EI (Entrada Externa)</option>
                                            <option value="EO">EO (Salida Externa)</option>
                                            <option value="EQ">EQ (Consulta Externa)</option>
                                            <option value="ILF">ILF (Archivo Interno Lógico)</option>
                                            <option value="EIF">EIF (Archivo de Interfaz Externa)</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    <Button variant='dark' type='submit' className='d-block w-50 mx-auto'>Agregar</Button>
                                </Form>
                            </Col>
                            <Col sm={{ span: 12 }} lg={{ span: 8, offset: 2 }} className="mt-5">
                                <Table size='sm' onClick={this.onClickTable.bind(this)} striped bordered hover variant="dark" id="requirement-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Requerimiento</th>
                                            <th>Tipo</th>
                                            <th>Complejidad</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.requirements.map((value, _i) => {
                                            const { high, medium, low } = this.state.types[value.reqtype];
                                            return <tr key={_i}>
                                                <td>{_i + 1}</td>
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={<Tooltip id="button-tooltip" >
                                                        {value.reqdesc}
                                                    </Tooltip>}>
                                                    <td>{value.reqname}</td>

                                                </OverlayTrigger>
                                                <td>{value.reqtype}</td>
                                                <td width={180} title={_i}>
                                                    <Button style={{ fontSize: 12 }} name='low' title={low} variant={`outline-light `}>Baja</Button>
                                                    <Button style={{ fontSize: 12 }} name='medium' title={medium} variant={`outline-light`}>Media</Button>
                                                    <Button style={{ fontSize: 12 }} name='high' title={high} variant={`outline-light`}>Alta</Button>
                                                </td>
                                                <td width={30} align="center" title={_i}>
                                                    <Button onClick={this.onClickDelete.bind(this)} name="delete" texto={_i} variant={`outline-light`}>
                                                        <BsFillTrashFill name='delete' texto={_i} color='white' />
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><Button onClick={e => {
                                                // <div ref={this.quiz} className="toshow d-none" style={{ height: 300 }}>

                                                this.quiz.current.classList.add('showing');
                                                this.quiz.current.classList.add('generate');
                                                // <Col xs="12" className='visually-hidden'  >
                                                this.quiz.current.nextSibling.classList.add("visually-hidden");
                                                // First Quiz element
                                                this.quiz.current.children[0].children[2].children[0].classList.add('showing');

                                            }} name='accion' variant='light' >Continuar</Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>

                    <div ref={this.quiz} className="toshow d-none" style={{ height: 300 }}>

                        <Col xs="12"  >
                            <h3>Ahora responda las siguientes preguntas de factor de ajuste</h3>
                            <h4 className='text-center fw-light'>Factores de nivel de influencia</h4>
                            <Row>
                                {
                                    this.state.factors.map((value, _i) => {
                                        return <>
                                            <Quiz key={_i}
                                                handleQuizValue={this.handleQuizValue.bind(this)}
                                                title={value.title}
                                                description={value.description}
                                                grades={value.grades} value={value.value}
                                                index={_i} last={value.last}
                                                lastMethod={this.lastMethod.bind(this)} />
                                        </>
                                    })
                                }
                            </Row>
                        </Col>
                    </div>

                    <Col xs="12" className='visually-hidde'  >
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            Resultados de los puntos de función
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="justify-content-between">
                                            <Col xs="3">
                                                <Card>
                                                    <Card.Header>
                                                        PFSA (Sin ajustar)
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {this.state.pfsa}
                                                    </Card.Body>
                                                </Card>

                                            </Col>
                                            <Col xs="3">
                                                <Card>
                                                    <Card.Header>
                                                        Factor de ajuste
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {this.state.factor}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xs="3">

                                                <Card>
                                                    <Card.Header>
                                                        PFA (Ajustado)
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {this.state.pfa}
                                                    </Card.Body>
                                                </Card>

                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col xs="12">

                                <Row>
                                    <Col xs="4" md={{ span: 3, offset: 1 }}>
                                        <FloatingLabel controlId="floatingSelectGrid" label="Seleccione la generación del lenguaje">
                                            <Form.Select ref={this.generation} defaultValue={"25 8"} className='focus border-dark my-2'>
                                                <option value="320 25">1ra. Ensamblador</option>
                                                <option value="106 15">2da. Fortran, Cobol, Lisp </option>
                                                <option value="60 12">3ra. Algol, Pascal, C, Basic, ADA</option>
                                                <option value="25 8">4ta. C++, C#, Java, Python, JavaScript, PHP, SQL </option>
                                            </Form.Select>
                                        </FloatingLabel>
                                        < FloatingLabel controlId="floatingInputGrid" label="Cantidad de desarrolladores" >
                                            <Form.Control
                                                className='focus border-dark my-2'
                                                type="text"
                                                ref={this.nrodev}
                                                defaultValue={1}
                                            />
                                        </FloatingLabel>
                                        < FloatingLabel controlId="floatingInputGrid" label="Horas pensadas de trabajo" >
                                            <Form.Control
                                                className='focus border-dark my-2'
                                                type="number"
                                                ref={this.time}
                                                defaultValue={6}
                                            />
                                        </FloatingLabel>
                                        <Button onClick={e => {
                                            let ldc = parseInt(this.generation.current.value.split(" ")[0]);
                                            let time = parseInt(this.generation.current.value.split(" ")[1]);
                                            let nrodev = parseInt(this.nrodev.current.value);
                                            let duracion = parseInt(this.time.current.value);
                                            let h_H = (this.state.pfa * time).toFixed(2);
                                            this.setState(prev => {
                                                return { ...prev, h_H, ldc, time, nrodev, duracion }
                                            })
                                        }} className='d-block mx-auto' variant='dark'>Generar estimaciones</Button>
                                    </Col>
                                    <Col xs="8" className="d-flex align-items-center">
                                        <Row className='justify-content-around w-100'>
                                            <Col className='shadow rounded' md={{ span: 3 }}>
                                                <Card>
                                                    <Card.Header>
                                                        Esfuerzo horas/hombre
                                                    </Card.Header>
                                                    <Card.Body>

                                                        <Card.Text>
                                                            H/H = PFA * HorasPF
                                                        </Card.Text>
                                                        <Card.Text>
                                                            {`H/H = ${this.state.pfa} * ${this.state.time} = ${this.state.pfa * this.state.time}`}
                                                            <br />

                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col className='shadow rounded' md={{ span: 4 }}>
                                                <Card>
                                                    <Card.Header>
                                                        Costo estimado
                                                    </Card.Header>
                                                    <Card.Body>

                                                        <Card.Text>
                                                            Costo = Dev * Duracion * SMM
                                                        </Card.Text>
                                                        <Card.Text>
                                                            {`Costo = ${this.state.nrodev} * ${(((this.state.h_H / this.state.duracion) / 22) / this.state.nrodev).toFixed(2)} * ${(327 * 6.89).toFixed(0)} Bs. = 
                                                            ${(((this.state.h_H / this.state.duracion) / 22) * (327 * 6.89)).toFixed(2)} Bs.`}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col className='shadow rounded' md={{ span: 4 }}>
                                                <Card>
                                                    <Card.Header>
                                                        Resumen
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Card.Text className='text-center'>
                                                            {`Duración en meses para ${this.state.nrodev} desarrolladores basado en ${this.state.duracion} horas de trabajo por día y 22 días de trabajo:`}
                                                            <br />
                                                            {`${(((this.state.h_H / this.state.duracion) / 22) / this.state.nrodev).toFixed(2)} meses`}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => {
                                            const doc = new jsPDF();
                                            // doc.autoTable({
                                            //     styles: { fillColor: [255, 0, 0] },
                                            //     columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
                                            //     margin: { top: 10 },
                                            //     body: [
                                            //         [{ content: 'Text', colSpan: 2, rowSpan: 2, styles: { halign: 'center' }, theme: 'css' }],

                                            //         ['Sweden', 'Japan', 'Canada'],
                                            //         ['Norway', 'China', 'USA'],
                                            //         ['Denmark', 'China', 'Mexico'],
                                            //         ['Denmark', 'China', 'Mexico'],

                                            //         ['Denmark', 'China', 'Mexico'],

                                            //         ['Denmark', 'China', 'Mexico'],


                                            //     ],
                                            // })

                                            // // Example usage of columns property. Note that America will not be included even though it exist in the body since there is no column specified for it.
                                            // doc.autoTable({
                                            //     columnStyles: { europe: { halign: 'center' } }, // European countries centered
                                            //     body: [
                                            //         { europe: 'Sweden', america: 'Canada', asia: 'China' },
                                            //         { europe: 'Norway', america: 'Mexico', asia: 'Japan' },
                                            //     ],
                                            //     columns: [
                                            //         { header: 'Europe', dataKey: 'europe' },
                                            //         { header: 'Asia', dataKey: 'asia' },
                                            //     ],
                                            // })
                                            // doc.autoTable({
                                            //     styles: { fillColor: [255, 0, 0] },
                                            //     margin: { top: 50 },

                                            //     body: [
                                            //         ['Sweden', 'Japan', 'Canada'],
                                            //         ['Norway', 'China', 'USA'],
                                            //         ['Denmark', 'China', 'Mexico'],
                                            //     ],
                                            // })


                                            doc.autoTable({
                                                theme: 'plain',
                                                body: [
                                                    ["en desarrollo"],


                                                ],
                                            })
                                            //     toPng(divToDisplay).then(data => {
                                            //         doc.addImage(data, "PNG", 10, 20, 50, 30, "FAST")
                                            //         doc.close();
                                            //         doc.save("asfd.pdf")
                                            //     })
                                            doc.save("prueba.pdf")
                                        }}
                                            className='d-block mx-auto my-4' variant="outline-dark">
                                            GENERAR PDF
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container >
        </>
        );
    }
}


