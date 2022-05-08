//main component
import Home from "../../../components/workspace/home";

//react bootstrap 
import { Container } from 'react-bootstrap';
const HomePage = () => {

    return <>
        <Container fluid className="p-0">
            <Home />
        </Container>
    </>

}


export default HomePage;