//main component
import BudgedMain from '../../../components/workspace/budged';
//react bootstrap 
import { Container } from 'react-bootstrap';
const BudgedPage = () => {

    return <>
        <Container fluid className='p-0'>
            <BudgedMain />
        </Container>
    </>

}


export default BudgedPage;