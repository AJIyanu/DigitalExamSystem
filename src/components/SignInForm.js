import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function SignInForm({ onFormChange }) {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="username" as={Row}>
                <Form.Label>Username</Form.Label>
                <Col md={12}>
                    <Form.Control
                        type="text"
                        placeholder="Your unique username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group className="mb-4" controlId="lastName" as={Row}>
                <Form.Label>Password</Form.Label>
                <Col md={12}>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    <Form.Text className="text-success">
                        Your Password is your Lastname
                    </Form.Text>
                </Col>
            </Form.Group>
            <div className="d-grid mb-5">
                <Button
                    type="submit"
                    variant="outline-success"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/dashboard';
                    }}
                >
                    Welcome Back!
                </Button>
            </div>
            <hr />
            <Form.Group as={Row} className="mt-4">
                <Form.Label className="text-danger" column>
                    First time here?
                </Form.Label>
                <Col xs={7}>
                    <div className="d-grid">
                        <Button
                            typeof="button"
                            variant="success"
                            className="me-0"
                            onClick={() => onFormChange()}
                        >
                            Let's Walk You in!
                        </Button>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default SignInForm;
