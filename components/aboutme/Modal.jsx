//react bootstrap components
import { Modal, Image, Button } from "react-bootstrap";

export const ImageModal = ({ src, show, closeModal }) => {


    return (

        <Modal size="lg" show={show} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    React + Redux
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image
                    src={src}
                    fluid
                />
            </Modal.Body>

        </Modal>
    )
}

