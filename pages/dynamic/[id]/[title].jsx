//react
import { Component } from 'react';

//react bootstrap
import { Container } from 'react-bootstrap';
//components
import Router from 'next/router';
export default class ProjectMain extends Component {

    constructor(props) {
        super(props)
    }
    
    componentDidUpdate() {
        console.log(Router.query)

    }
    render() {

        return (
            <>
                <Container className='shadow rounded'>
                    wtf
                    f
                </Container>
            </>
        );
    }

}