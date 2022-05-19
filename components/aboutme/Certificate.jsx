//react bootstrap
import { Col, Card } from "react-bootstrap";
//nextjs
import Link from "next/link";
import Image from "next/image";

const Certificate = ({ id, business, year, month, title }) => {
  return (
    <Col xs="12" md="6" xl="4">
      <Card>
        <Card.Body>
          <Image
            className=""
            width={100}
            height={60}
            alt={title}
            layout="responsive"
            src={`http://localhost:3100/certificate/images/${id}`}
          ></Image>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text>
            <div className="d-flex">
              <p className="mx-3 my-auto">{`${business}`}</p>
            </div>
            Fecha: {(month, year)}
          </Card.Text>

          <div className="d-flex justify-content-center">
            <Link
              href="https://www.sololearn.com/certificates/course/en/25363066/1024/landscape/png"
              passHref
            >
              <a className="btn btn-outline-dark" target="_blank">
                Ver Credenciales
              </a>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default Certificate;
