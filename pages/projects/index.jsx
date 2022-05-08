//react
import { Component } from 'react';

//react bootstrap
import { Container } from 'react-bootstrap';
//components
import NavbarMain from '../../components/NavbarMain';
import FooterMainRedux from '../../components/FooterMain';
import Project from '../../components/projects';
export default class ProjectMain extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Container className='shadow rounded'>
                    <NavbarMain />
                    <Project />

                    <FooterMainRedux />
                </Container>
            </>
        );
    }

}