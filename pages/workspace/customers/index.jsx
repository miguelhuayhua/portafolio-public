//main component
import Customer from '../../../components/workspace/customers';
//react bootstrap 
import { Container } from 'react-bootstrap';
const CustomersPage = () => {

    return <>
        <Container fluid className='p-0'>
            <Customer />
        </Container>
    </>

}


export default CustomersPage;