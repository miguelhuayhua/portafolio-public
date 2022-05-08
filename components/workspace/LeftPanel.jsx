//next routes
import Link from "next/link";
import Router from "next/router";

//react bootstrap
import { Nav } from "react-bootstrap";

//react icons

import { AiTwotoneHome, AiFillSafetyCertificate } from 'react-icons/ai';
import { FaUsers, FaCalculator } from 'react-icons/fa';
import { MdTableView } from 'react-icons/md';
import { BsFillFileEarmarkCodeFill } from 'react-icons/bs';
import { RiLogoutBoxFill } from 'react-icons/ri';
export const LeftPanel = () => {


    const handleLogOut = () => {
        Router.back();
    }
    const toHome = () => {
        Router.replace("/workspace/home");
    }
    const toCustomers = () => {
        Router.replace("/workspace/customers")
    }
    const toCertificates = () => {
        Router.replace("/workspace/certificates");
    }
    const toUsers = () => {
        Router.replace("/workspace/users");
    }
    const toProjects = () => {
        Router.replace("/workspace/projects")
    }
    const toBudged = () => {
        Router.replace("/workspace/budged")
    }
    return <>
        <Nav style={{
            backgroundColor: '#334'
        }} variant="pills" className="flex-column h-100">
            <div className="position-sticky top-0">

                <Nav.Item className="mt-md-5" onClick={toHome}>
                    <Nav.Link className="d-flex align-items-center justify-content-start white"><AiTwotoneHome fontSize={20} className="me-4" />
                        <span>
                            Inicio
                        </span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item className="mt-1" onClick={toCustomers}>
                    <Nav.Link className="d-flex align-items-center justify-content-start white"><MdTableView fontSize={20} className="me-4" />
                        <span>
                            Clientes
                        </span>

                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1" onClick={toCertificates}>
                    <Nav.Link className="d-flex align-items-center justify-content-start white"><AiFillSafetyCertificate fontSize={20} className="me-4" />
                        <span>
                            Certificados
                        </span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1" onClick={toUsers}>
                    <Nav.Link className="d-flex align-items-center justify-content-start white"><FaUsers fontSize={20} className="me-4" />
                        <span>
                            Usuarios
                        </span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1" onClick={toProjects}>
                    <Nav.Link eventKey="pro" className="d-flex align-items-center justify-content-start white"><BsFillFileEarmarkCodeFill fontSize={20} className="me-4" />
                        <span>
                            Proyectos
                        </span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1 links" onClick={toBudged}>
                    <Nav.Link className="d-flex align-items-center justify-content-start white"><FaCalculator fontSize={20} className="me-4" />
                        <span>
                            Presupuestar Proyecto
                        </span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1 mb-2 mb-md-5">
                    <Nav.Link
                        onClick={handleLogOut}
                        className="d-flex align-items-center justify-content-start white"><RiLogoutBoxFill fontSize={20} className="me-4" />Cerrar Sesión
                    </Nav.Link>
                </Nav.Item>
            </div>

        </Nav>



    </>
}