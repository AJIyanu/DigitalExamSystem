import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

async function handleConflict(username) {
    let check = false;
    const res = await fetch(
        'https://673d528b0118dbfe8606df63.mockapi.io/api/v1/users'
    );

    if (!res.ok) {
        console.error('Response not okay!');
    }
    const allUser = await res.json();

    check = allUser.some((user) => user.userName == username);

    return check;
}

function SignUpForm({ onFormChange }) {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    }

    async function handleSubmitForm(e) {
        // e.preventDefault();
        let conflict = true;
        await handleConflict(formData.userName).then((res) => console.log(res));
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
                    <Form.Text className="text-success">
                        This will be your unique id for logging in
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName" as={Row}>
                <Form.Label>First Name</Form.Label>
                <Col md={12}>
                    <Form.Control
                        type="text"
                        placeholder="Firstname"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group className="mb-4" controlId="lastName" as={Row}>
                <Form.Label>Last Name</Form.Label>
                <Col md={12}>
                    <Form.Control
                        type="text"
                        placeholder="Lastname"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    <Form.Text className="text-success">
                        This will be used as your password
                    </Form.Text>
                </Col>
            </Form.Group>
            <div className="d-grid mb-5">
                <Button
                    type="submit"
                    variant="outline-success"
                    onClick={(e) => {
                        e.preventDefault();
                        // window.location.href = '/dashboard';
                        handleSubmitForm();
                    }}
                >
                    Welcome on board!
                </Button>
            </div>
            <hr />
            <Form.Group as={Row} className="mt-4">
                <Form.Label className="text-danger" column>
                    Not your first time?
                </Form.Label>
                <Col xs={6}>
                    <div className="d-grid">
                        <Button
                            typeof="button"
                            variant="success"
                            className="me-0"
                            onClick={() => onFormChange()}
                        >
                            Get Back in!
                        </Button>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default SignUpForm;
