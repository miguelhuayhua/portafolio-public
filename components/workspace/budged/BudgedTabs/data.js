
//react components
import { Col, Row, Badge, Card, Form, ListGroup, Button } from 'react-bootstrap'

import { useRef } from 'react';
//exporting new state fow function point component
export const initialState = {
    requirements: [],
    reqname: "",
    reqdesc: "",
    reqtype: "EI",
    range: "0",
    types: {
        EI: { low: 3, medium: 4, high: 6 },
        EO: { low: 4, medium: 5, high: 7 },
        EQ: { low: 3, medium: 4, high: 6 },
        ILF: { low: 7, medium: 10, high: 15 },
        EIF: { low: 5, medium: 7, high: 10 }
    },
    factors: [
        {
            title: "Comunicación de datos",
            description: "Los datos e informaciones de control utilizados por la aplicación son enviados o recibidos a través de recursos de comunicación de datos. (Terminales y estaciones de trabajo son algunos ejemplos). Todos los dispositivos de comuniacción utilizan algún tipo de protocolo de comunicación.",
            grades: [
                "Aplicación puramente batch o funciona en una computadora aislada.",
                "La aplicación es batch, pero utiliza entrada de datos remota o impresión remota.",
                "La aplicación es batch, pero utiliza entrada de datos remota e impresión remota.",
                "La aplicación incluye entrada de datos online via entradad de video o un procesador front-end para alimentar procesos batch o sistemas de consultas.",
                "La aplicación es más que una entrada online, y soporta apenas un protocolo de comunicación.",
                "La aplicación es más que una entrada online y soporta más de un protocolo de comunicación."
            ],
            value: 0
        },
        {
            title: "Procesamiento distribuido",
            description: "Datos o precesamiento distribuidos entre varias unidades de procesamiento (CPUs) son características generales que pueden influenciar en la complejidad de la aplicación.",
            grades: [
                "La aplicación no contribuye en la transferencia de datos o funciones entre los procesasodores de la empresa.",
                "La aplicación prepara datos para el usuario final en otra CPU de la empresa.",
                "La aplicación prepara datos para transferencia, los transfiere y entonces son preocesados en otro equipamiento de la empresa (no por el usuario final).",
                "Procesamiento distribuido y la transferencia de datos son online en apenas una dirección.",
                "Procesamiento distribuido y la transferencia de datos son online en ambas direcciones.",
                "Las funciones de procesamiento son dinámicamente ejecutadas en el equipamiento más adecuado."
            ],
            value: 0
        },
        {
            title: "Objetivos de rendimiento",
            description: "Los objetivos de rendimiento del sistema, establecidos y aprobados por el usuario en términos de respuesta, influyen o podría influenciar el proyecto, desarrollo, implementación o soporte de la aplicación.",
            grades: [
                "Ningún requerimineto especial de perfomance fue solicitado por el usuario.",
                "Requerimientos de perfomance y de diseño fueron establecidos y previstos, sin embargo ninguna acción especial fue requerida.",
                "El tiempo de respuesta  y el volumen de datos son críticos durante horarios pico de procesamiento. Ninguna determinación especial para la utilización del procesador fue establecida. El intervalo de tiempo límite para la disponibilidad de procesamiento es siempre el próximo día hábil.",
                "El tiempo de respuesta  y el volumen de procesamiento son items críticos durante todo el horario comercial. Ninguna determinación especial para la utilización del procesador fue establecida. El tiempo límite necesario para la comunicación con otros sistemas es un aspecto importante.",
                "Los requerimientos de perfomance establecidos requieren tareas de análisis de perfomances en la fase de análisis y diseño de la aplicación",
                "Además de lo descrito en el item anterior, herramientas de análisis de perfomance fueron usadas en las fases de diseño, desarrollo y/o implementación para atneder los requerimientos de perfomance establecidos por el usuario."
            ],
            value: 0
        },
        {
            title: "Configuración del equipamiento",
            description: "Esta característica representa la necesidad de realizar consideraciones especiales en el diseño de los sistemas para que la configuración del equipamiento no sea sobrecargada.",
            grades: [
                "Ninguna restricción operacional explícita o implícita fue incluida.",
                "Existen restricciones operaciionales leves. No es necesario un esfuerzo especial para resolver estas restricciones.",
                "Algunas consideraciones de ajuste de perfomance y seguridad son necesarias.",
                "Son necesarias especificaciones especiales de procesador para un módulo específico de la aplicación.",
                "Restriccione operacionales requiren cuidados especiales en el procesador central o procesador dedicado.",
                "Además de las características del item anterior, hay consideraciones especiales en la distribución del sistema y sus componentes."
            ],
            value: 0
        },
        {
            title: "Tasa de transacciones",
            description: "El nivel de transacciones es alto y tiene influencia en el diseño, desarrollo, implementación y mantenimiento de la aplicación.",
            grades: [
                "No están previstos peridodos picos de volumen de transacción.",
                "Están previstos picos de transacciones mensualmente, trimestralmente, anualmente o en un cierto perido del año.",
                "Se prevén picos semananales.",
                "Al tivel de transacciones fue establecido por el usuario, el tiempo de respuesta necesario exige un nivel alto o suficiente para requerir análisis de perfomance y diseño.",
                "Los requerimientos de perfomance establecidos requieren tareas de análisis de perfomances en la fase de análisis y diseño de la aplicación.",
                "Además de lo descrito en el tiem anterior, es necesario utlizar herramientas de anállisis de perfomance en las fases de diseño, desarrollo y/o implementación."
            ],
            value: 0
        },
        {
            title: "Entrada de datos en línea",
            description: "Esta característica cuantifica la entrada de datos online provista por la aplicación.",
            grades: [
                "Todas las transacciones son procesadas en modo batch.",
                "De 1% al 7% de las transacciones son entradas de datos online.",
                "De 8% al 15% de las transacciones son entradas de datos online.",
                "De 16% al 23% de las transacciones son entradas de datos online.",
                "De 24% al 30% de las transacciones son entradas de datos online.",
                "Más del 30% de las transacciones son entradas de datos online."
            ],
            value: 0
        },
        {
            title: "Interface con el usuario",
            description: `Las funciones on-line del sistema hacen énfasis en la amigabilidad del sistema y su facilidad de
            uso, buscando aumentar la eficiencia del usuario final. El sistema posee:
            • Ayuda para la navegación (teclas de función, accesos directos y menús dinámicos),
            • Menús,
            • Documentación y ayuda on-line,
            • Movimiento automático del cursor,
            • Scrolling vertical y horizontal,
            • Impresión remota (a través de transacciones on-line),
            • Teclas de función preestablecidas,
            • Ejecución de procesos batch a partir de transacciones on-line,
            • Selección de datos vía movimiento del cursor en la pantalla,
            • Utilización intensa de campos en video reverso, intensificados, subrayados, coloridos y
otros indicadores,
• Impresión de la documentación de las transacciones on-line por medio de hard copy,
• Utilización del mouse,
• Menús pop-up,
• El menor número de pantallas posibles para ejecutar las funciones del negocio,
• Soporte bilingüe (el soporte de dos idiomas, cuente como cuatro items),
• Soporte multilingüe (el soporte de más de dos idiomas, cuente como seis items).`,
            grades: [
                "Ningún de los items descritos.",
                "De uno a tres de los items descritos.",
                "De cuatro a cinco de los items descritos.",
                "Más de cinco de los items descritos, no hay requerimientos específicos del usuario en cuanto a la amigabilidad del sistema.",
                "Más de cinco de los items descritos, y fueron descritos requerimientos en cuanto a amigabilidad del sistema suficientes para generar actividades especificas, incluyendo factores tales como minimización de la digitación.",
                "Más de cinco de los items descritos y fueron establecidos requerimientos en cuanto a la amigabilidad suficientes para utlizar herramientas especiales y procesos especiales para demostrar anticipadamente que los objetivos fueron alcanzados."
            ],
            value: 0
        },
        {
            title: "Actualización en línea",
            description: "La aplicación posibilita la actualización online de los archivos lógicos internos",
            grades: [
                "Ninguna.",
                "Actualización online de uno a tres archivos lógicos internos.",
                "Actualización online de más de tres archivos lógicos internos.",
                "Actualización online de la mayoría de los archivos lógicos internos.",
                "Además del item anterior, la protección contra pérdidas de datos es esencial y fue específicamente proyectado y codificado en el sistema.",
                "Además del item anterior, altos volúmenes influyen en las consideraciones de costo en el proceso de recuperación, Procesos  para automatizar la recuperación fueron incluidos, minimizando la intervención del operador."
            ],
            value: 0
        },
        {
            title: "Procesamiento complejo",
            description: `
            El procesamiento complejo es una de las características de la aplicación, los siguientes
componentes están presentes:
• Procesamiento especial de auditoria y/o procesamiento especial de seguridad,
• Procesamiento lógico extensivo,
• Procesamiento matemático extensivo,
• Gran cantidad de procesamiento de excepciones, resultando en transacciones
incompletas que deber ser procesadas nuevamente. Por ejemplo, transacciones de
datos incompletas interrumpidas por problemas de comunicación o con datos
incompletos,
• Procesamiento complejo para manipular múltiples posibilidades de entrada/salida.
(Ejemplo: multimedia)
            `,
            grades: [
                "Ninguno de los items descritos.",
                "Apenas uno de los items descritos.",
                "Dos de los items descritos.",
                "Tres de los items descritos.",
                "Cuatro de los items descritos.",
                "Todos los items descritos."
            ],
            value: 0
        },
        {
            title: "Reusabilidad del código",
            description: "La aplicación y su código serán o fueron proyectos, desarrollados y mantenidos para utilzados en otras aplicaciones.",
            grades: [
                "No presenta código reutilizable.",
                "Código reutilizado fue usado solamente dentro de la aplicación.",
                "Menos del 10% de la aplicación fue proyectada previendo la utilización posterior del código por otra aplicación.",
                "10% o más de la aplicación fue proyecto previendo la utilización posterior del código por otra aplicación.",
                "La aplicación fue específicamente proyectada y/o documentada para tener su código fácilmente reutilizable por otra aplicación y la aplicación es configurada por el usuario a nivel de código fuente.",
                "La aplicación fue específicamente proyectada y/o documentada para tener su código fácilmente reutilizable por otra aplicación y la aplicación es configurada para uso a través de parámetros que pueden ser alterados por el usuario."
            ],
            value: 0
        },
        {
            title: "Facilidad de implementación",
            description: `La facilidad de implementación y conversión de datos son características de la aplicación. Un
            plan de conversión e implementación y/o herramientas de conversión fueron provistas y
            probadas durante la fase de prueba de la aplicación.`,
            grades: [
                `Ninguna consideración especial fue establecida por el usuario y ningún
                procedimiento especial fue necesario en la implementación.`,
                `Ninguna consideración especial fue establecida por el usuario, más
                procedimientos especiales son requeridos en la implementación.`,
                `Requerimientos de conversión e implementación fueron establecidos por el
                usuario y rutinas de de conversión e implementación fueron proporcionados
                y probados. El impacto de conversión en el proyecto no es considerado
                importante.`,
                `Requerimientos de conversión e implementación fueron establecidos por el
                usuario y rutinas de de conversión e implementación fueron proporcionados
                y probados. el impacto de conversión en el proyecto es considerado
                importante.`,
                `Además del ítem 2, conversión automática y herramientas de
                implementación fueron proporcionadas y probadas.`,
                `Además del ítem 3, conversión automática y herramientas de
                implementación fueron proveídas.`
            ],
            value: 0
        },
        {
            title: "Facilidad de operación",
            description: `La facilidad de operación es una característica del sistema. Procedimientos de inicialización,
            respaldo y recuperación fueron proveídos y probados durante la fase de prueba del sistema. La
            aplicación minimiza la necesidad de actividades manuales, tales como montaje de cintas
            magnéticas, manoseo de papel e intervención del operador.`,
            grades: [
                `Ninguna consideración especial de operación, además del proceso normal
            de respaldo establecido por el usuario.`,
                `Fueron desarrollados procedimientos de inicialización y respaldo,
            siendo necesaria la intervención del operador.`,
                `Se establecieron procesos de inicialización, respaldo y
            recuperación sin ninguna intervención del operador.`,
                ` La aplicación minimiza la necesidad de manoseo de papel`,
                `La aplicación minimiza la necesidad de montaje de cintas
                magnéticas.`,
                `La aplicación fue diseñada para trabajar sin operador, ninguna intervención
            del operador es necesaria para operar el sistema, excepto ejecutar y cerrar
            la aplicación. La aplicación posee rutinas automáticas de recuperación en
            caso de error.`
            ],
            value: 0
        },
        {
            title: "Instalaciones múltiples",
            description: `La aplicación fue específicamente proyectada, diseñada e mantenida para ser instalada en
            múltiples locales de una organización o para múltiples organizaciones.`,
            grades: [
                `Los requerimientos del usuario no consideran la necesidad de instalación
                de más de un local.`,
                `La necesidad de múltiples locales fue considerada en el proyecto y la
                aplicación fue diseñada para operar apenas sobre el mismo ambiente de
                hardware y software.`,
                `La necesidad de múltiples locales fue considerada en el proyecto y la
                aplicación fue diseñada para operar en ambientes similares de software y
                hardware.`,
                `La necesidad de múltiples locales fue considerada en el proyecto y la
                aplicación está separada para trabajar sobre diferentes ambientes de
                hardware y/o software.`,
                `Plan de mantenimiento y documentación fueron proporcionados y probados
                para soportar la aplicación en múltiples locales, además los items 1 y 2
                caracterizan a la aplicación.`,
                `Plan de documentación e mantenimiento fueron proveídos y probados para
                soportar la aplicación en múltiples locales, además el ítem 3 caracteriza a la
                aplicación.`
            ],
            value: 0
        },
        {
            title: "Facilidad de cambios",
            description: `La aplicación fue específicamente proyectada y diseñada con vistas a facilitar su
            mantenimiento. Las siguientes características pueden ser atribuidas a la aplicación:
            • Están disponibles facilidades como consultas e informes flexibles para atender
            necesidades simples (contar 1 ítem),
            • Están disponibles facilidades como consultas e informes flexibles para atender
            necesidades de complejidad media (contar 2 items),
            • Están disponibles facilidades como consultas e informes flexibles para atender
            necesidades complejas (contar 3 items),
            • Datos de control son almacenados en tablas que son mantenidas por el usuario a
            través de procesos on-line, pero los cambios se hacen efectivos solamente al día
            siguiente,
            • Datos de control son almacenados en tablas que son mantenidas por el usuario a
            través de procesos on-line, pero los cambios se hacen efectivos inmediatamente
            (contar 2 items).`,
            grades: [
                `Ninguno de los items descritos.`,
                `Apenas uno de los items descritos.`,
                `Dos de los items descritos.`,
                `Tres de los items descritos.`,
                `Cuatro de los items descritos.`,
                `Todos los items descritos.`
            ],
            value: 0,
            last: true
        }],
    pfa: 0,
    pfsa: 0,
    factor: 0,
    time: 8,
    ldc: 25,
    h_H: 0,
    costo: 0,
    nrodev: 1,
    duracion: 6
}

export const Quiz = ({ title, description, grades, value, index, handleQuizValue, last, lastMethod }) => {
    const cardRef = useRef();
    const handleChange = (e) => {
        handleQuizValue(e.target.value, index)
    }
    const handleNext = (e) => {
        cardRef.current.classList.add("hide");
        cardRef.current.classList.remove("showing")
        if (cardRef.current.nextSibling != null) {
            cardRef.current.nextSibling.classList.add("showing")
        }
        if (e.target.getAttribute("last") == 1) {
            cardRef.current.parentElement.parentElement.parentElement.classList.add("endQuiz")
            cardRef.current.parentElement.parentElement.parentElement.classList.remove("generate");
            cardRef.current.parentElement.parentElement.parentElement.nextSibling.classList.remove("visually-hidden");
            lastMethod();
        }
    }

    return <>
        <div className='position-absolute toshow' ref={cardRef} style={{ zIndex: -index }}>
            <Col xs="12" md={{ span: 10, offset: 1 }}>
                <Card  >
                    <Card.Header as="h5">{(index + 1) + ". " + title}</Card.Header>
                    <Row>
                        <Col xs="12" md="5">
                            <Card.Body>
                                <Card.Text>
                                    {description}
                                </Card.Text>
                                <Badge bg="dark">{value}</Badge>
                                <Form.Range defaultValue={value} max={5} min={0} onChange={handleChange} />
                            </Card.Body>
                        </Col>
                        <Col xs="12" md="7">
                            <Card.Body className='d-flex flex-column' >
                                <Card.Text className="text-center">
                                    Seleccione mediante los siguientes grados:
                                </Card.Text>
                                <ListGroup numbered variant="flush">
                                    {grades.map((value, _i) => {
                                        return <>
                                            <ListGroup.Item key={_i} >
                                                <Badge bg='dark'>{_i}</Badge>
                                                <Card.Text className='d-inline ms-2'>
                                                    {value}
                                                </Card.Text>
                                            </ListGroup.Item>
                                        </>
                                    })
                                    }
                                </ListGroup>
                                <Button className='w-50 align-self-end mb-2 me-4' variant="dark" onClick={handleNext} last={last ? 1 : 0}>
                                    {last ? "Terminar" : "Siguiente"}
                                </Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </div>

    </>
}