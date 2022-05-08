import Link from 'next/link';
import { Component } from 'react';
//nextjs
import Head from 'next/head'
//react bootstrap
import { Container } from 'react-bootstrap'
//Components
import AboutMeMiguel from '../../components/aboutme'
import NavbarMain from '../../components/NavbarMain'
import FooterMainRedux from '../../components/FooterMain';
export default class AboutMe extends Component {

    render() {
        return (
            <>
                <Head>
                    <title>Sobre Mi</title>
                </Head>
                <Container className="shadow rounded">
                    <NavbarMain />
                    <AboutMeMiguel />
                    <FooterMainRedux />
                </Container>
            </>
        )
    }
}