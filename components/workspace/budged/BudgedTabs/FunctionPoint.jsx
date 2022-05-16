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
import { initialState, Quiz } from './data';

//
import { toPng } from 'html-to-image';
//path
import path from 'path';
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
                    reqname, reqdesc, reqtype, range, difficulty: ''
                }],
                reqname: "",
                reqdesc: "",
            }
        });

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
            requirement["difficulty"] = button.innerText;
            console.log(button)
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
        let countTypes = {};
        let types = [...this.state.requirements.map(val => val.reqtype)];
        types.forEach(val => { countTypes[val] = (countTypes[val] || 0) + 1 })
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
                            <Col className='shadow' xs="12" md={{ span: 6 }}>
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
                            <Col xs="12" md={{ span: 4, offset: 1 }}>
                                <Row>
                                    <Col xs="12">
                                        <LineChart id={'pfreq'} text="PFSA / Requerimiento" label="PF" labels={[...this.state.requirements.map((value, _i) => _i)]}
                                            data={[...this.state.requirements.map(value => value.range)]} />
                                    </Col>
                                    <Col>

                                        <BarChart id={'types'} labels={Object.keys(countTypes)} label="Total" text='Conteo de tipos de requerimientos'
                                            data={Object.values(countTypes)} />
                                    </Col>
                                </Row>
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
                                            <Col xs="12" md="3">
                                                <Card>
                                                    <Card.Header>
                                                        PFSA (Sin ajustar)
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {this.state.pfsa}
                                                    </Card.Body>
                                                </Card>

                                            </Col>
                                            <Col xs="12" md="3">
                                                <Card>
                                                    <Card.Header>
                                                        Factor de ajuste
                                                    </Card.Header>
                                                    <Card.Body>
                                                        {this.state.factor}
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col xs="12" md="3" lg="3">

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
                                    <Col xs="12" md="7" lg={{ span: 3, offset: 1 }}>
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
                                    <Col xs="12" md="5" lg={{ span: 8 }} className="d-flex align-items-center">
                                        <Row className='justify-content-around w-100'>
                                            <Col className='shadow rounded' xs="12" xl="3">
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
                                            <Col className='shadow rounded' xs="12" xl="3">
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
                                            <Col className='shadow rounded' xs="12" xl="3">
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
                                    <Button onClick={() => {
                                        let date = new Date();
                                        let fecha = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes()}`;
                                        let req = [...this.state.requirements];
                                        req = req.map((value, _i) => {
                                            return { i: _i + 1, ...value }
                                        })
                                        const doc = new jsPDF('p', 'mm', [297, 210]);
                                        var img = new Image();
                                        img.src = path.resolve('logo.png');
                                        doc.addImage(img, 'png', 10, 10, 15, 15);
                                        doc.setFont('Courier');
                                        doc.setFontSize(11);
                                        doc.text(110, 30, 'REPORTE DE ESTIMACIONES POR EL MÉTODO DE PUNTOS DE FUNCIÓN', 'center');
                                        doc.text(105, 40, `Nombre: Miguel Huayhua Condori    Reporte elaborado: ${fecha}`, 'center');

                                        doc.line(10, 50, doc.internal.pageSize.getWidth() - 10, 50, null);

                                        doc.text(110, 60, 'TABLA DE REQUERIMIENTOS MAS PUNTOS DE FUNCIÓN (PFSA)', 'center');

                                        doc.autoTable({
                                            styles: { fillColor: "#EEE", fontSize: 9 },
                                            footStyles: { fillColor: "#DDD", textColor: "#666", fontSize: 10, font: 'courier' },
                                            headStyles: { fillColor: "#666", textColor: "#DDD", fontSize: 8, font: 'courier' },
                                            startY: 70,
                                            theme: 'grid',
                                            body: req,
                                            foot: [['Total: ', '', '', '', '', `${this.state.pfsa}`]],
                                            columns: [
                                                { header: 'NRO', dataKey: 'i' },
                                                { header: 'REQUERIMIENTO', dataKey: 'reqname' },
                                                { header: 'DETALLES', dataKey: 'reqdesc' },
                                                { header: 'TIPO', dataKey: 'reqtype' },
                                                { header: 'DIFICULTAD', dataKey: 'difficulty' },
                                                { header: 'PFSA', dataKey: 'range' },
                                            ],
                                        })
                                        doc.text(105, doc.lastAutoTable.finalY + 10, 'TABLA FACTORES DE INFLUENCIA', 'center');
                                        doc.autoTable({
                                            showHead: 'firstPage',
                                            showFoot: 'lastPage',
                                            styles: { fillColor: "#EEE", fontSize: 9 },
                                            footStyles: { fillColor: "#DDD", textColor: "#666", fontSize: 10, font: 'courier' },
                                            headStyles: { fillColor: "#666", textColor: "#DDD", fontSize: 8, font: 'courier' },
                                            startY: doc.lastAutoTable.finalY + 20,
                                            theme: 'grid',
                                            body: [...this.state.factors],
                                            foot: [['Total: ', `${this.state.factor}`]],
                                            columns: [
                                                { header: 'TÍTULO FACTOR', dataKey: 'title' },
                                                { header: 'Grado', dataKey: 'value' }
                                            ],
                                        })
                                        if (doc.internal.pageSize.getHeight() <= doc.lastAutoTable.finalY + 80) {
                                            doc.addPage();
                                            doc.text(105, 20, `Resultados:`, 'center');

                                            doc.setFont('Helvetica');
                                            doc.setFontSize(10);
                                            doc.text(105, 30, `PFSA: ${this.state.pfsa}  _______________  FACTOR DE AJUSTE: ${this.state.factor}   ________________  PFA: ${this.state.pfa}`, 'center');
                                            doc.text(80, 35, `
                                                GENERACIÓN DE LENGUAJE: ${this.generation.current.selectedOptions[0].innerText.substring(0, 4)} generación.                     HORAS PF: ${this.state.time}                   LDC/PF: ${this.state.ldc}`, 'center');
                                            let text = doc.splitTextToSize(`Duración en meses para ${this.state.nrodev} desarrolladores basado en ${this.state.duracion} horas de trabajo por día y 22 días de trabajo: ${(((this.state.h_H / this.state.duracion) / 22) / this.state.nrodev).toFixed(2)} meses.`, 200)
                                            doc.text(18, 50, text);
                                            doc.addImage(document.getElementById('types'), "PNG", 20, 60, 75, 50);
                                            doc.addImage(document.getElementById('pfreq'), "PNG", 110, 60, 75, 50);
                                        }
                                        else {
                                            doc.text(105, doc.lastAutoTable.finalY + 20, `Resultados:`, 'center');
                                            doc.setFont('Helvetica');
                                            doc.setFontSize(10);
                                            doc.text(105, doc.lastAutoTable.finalY + 30, `PFSA: ${this.state.pfsa}  _______________  FACTOR DE AJUSTE: ${this.state.factor}   ________________  PFA: ${this.state.pfa}`, 'center');
                                            doc.text(80, doc.lastAutoTable.finalY + 35, `
                                                GENERACIÓN DE LENGUAJE: ${this.generation.current.selectedOptions[0].innerText.substring(0, 4)} generación.                     HORAS PF: ${this.state.time}                   LDC/PF: ${this.state.ldc}`, 'center');
                                            let text = doc.splitTextToSize(`Duración en meses para ${this.state.nrodev} desarrolladores basado en ${this.state.duracion} horas de trabajo por día y 22 días de trabajo: ${(((this.state.h_H / this.state.duracion) / 22) / this.state.nrodev).toFixed(2)} meses`, 200)
                                            doc.text(18, doc.lastAutoTable.finalY + 50, text);
                                            doc.addImage(document.getElementById('types'), "PNG", 25, doc.lastAutoTable.finalY + 60, 75, 50);
                                            doc.addImage(document.getElementById('pfreq'), "PNG", 115, doc.lastAutoTable.finalY + 60, 75, 50);
                                        }
                                        doc.save(`Estimacion ${fecha}`);
                                    }}
                                        className='d-block mx-auto my-4 w-50' variant="outline-dark">
                                        GENERAR PDF
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                       //

                    </Col>

                </Row>

            </Container >
        </>
        );
    }
}


