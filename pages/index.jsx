//react with redux
import { Component } from "react";
import { connect } from "react-redux";
import { INCREMENT, DECREMENT } from '../redux';
//components
import NavbarMain from "../components/NavbarMain";
import Welcome from "../components/welcome";
//redux
import Head from 'next/head';
//react bootstrap
import { Container } from 'react-bootstrap';
import FooterMain from '../components/FooterMain'
class Main extends Component {

  render() {
    return (
      <>
        {/* Header configs */}
        <Head>
          <title>Miguel Huayhua</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/icono.ico" />
        </Head>
        {/*Rest of the Body*/}
        {/*Navbar component*/}
        <NavbarMain />

        <Container className="rounded shadow">
          <Welcome />
          <FooterMain />
        </Container>

        {/*Main section*/}
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return { counter: state.reducer }
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment() {
      dispatch(INCREMENT())
    },
    decrement() {
      dispatch(DECREMENT())
    }
  }
};

const Root = connect(mapStateToProps, mapDispatchToProps)(Main)
export default Root;


