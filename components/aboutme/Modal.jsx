export const Modal = () => {


    return (

        <Modal size="lg" show={this.state.showModal}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    React + Redux
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image
                    src="https://www.sololearn.com/certificates/course/en/25363066/1060/landscape/png"
                    fluid
                ></Image>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-dark"
                    className="w-25"
                    onClick={(e) => {
                        this.setState((prev) => {
                            return { showModal: !prev.showModal };
                        });
                    }}
                >
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

