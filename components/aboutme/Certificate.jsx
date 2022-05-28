//react bootstrap
import { Col, Card, Image } from "react-bootstrap";
//nextjs
import Link from "next/link";
// import Image from "next/image";

const Certificate = ({ id, business, year, month, title, credencial, type }) => {
  console.log(type)
  return (
    <Col xs="12" md="6" xl="4">
      <Card>
        <Card.Body>
          <Image
            fluid
            layout="responsive"
            src={`https://server-miguel.herokuapp.com//certificate/images/${id}`}
          ></Image>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text>
            <div className="d-flex">
              {type == "E" ? 'Empresa: ' : 'Universidad o institución: '} {`${business}`}
              <br />
              Fecha: {(month, year)}
            </div>
          </Card.Text>

          <div className="d-flex justify-content-center">
            <Link
              href={credencial}
              passHref
            >
              {type == 'E' ? <a className="btn btn-outline-dark" target="_blank">
                Ver Credenciales
              </a> : <></>}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default Certificate;
