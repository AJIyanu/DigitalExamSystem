import { Form, Button, Row, Col } from 'react-bootstrap';


function SignUpForm() {
    return(
        <Form>
            <Form.Group className='mb-3' controlId='username' as={Row}>
                <Form.Label>Username</Form.Label>
                <Col md={12}>
                    <Form.Control type="text" placeholder='Your Unique Username'/>
                    <Form.Text className='text-success'>This will be your unique id for logging in</Form.Text>
                </Col>
            </Form.Group>
            <Form.Group className='mb-3' controlId='firstName' as={Row}>
                <Form.Label>First Name</Form.Label>
                <Col md={12}>
                    <Form.Control type="text" placeholder='Firstname'/>
                </Col>
            </Form.Group>
            <Form.Group className='mb-4' controlId='lastName' as={Row}>
                <Form.Label>Last Name</Form.Label>
                <Col md={12}>
                    <Form.Control type="text" placeholder='Lastname'/>
                    <Form.Text className='text-success'>This will be used as your password</Form.Text>
                </Col>
            </Form.Group>
            <div className='d-grid'>
            <Button type='submit' variant='outline-success'>Get Started!</Button>
            </div>
        </Form>
    )
}

export default SignUpForm;