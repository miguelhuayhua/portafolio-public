//main component
import Budged from '../../components/workspace/budged/Budged';
//react bootstrap 
import { Container } from 'react-bootstrap';
const BudgedPage = () => {

    return <>
        <Container fluid className='p-0'>
            <Budged />
        </Container>
    </>

}


export default BudgedPage;