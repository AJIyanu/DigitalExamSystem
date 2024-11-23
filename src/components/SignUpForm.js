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

    check = allUser.some((user) => user.userName === username);

    return check;
}

async function addUserToAPI(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making POST request:', error);
    }
}

function SignUpForm({ onFormChange }) {
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alertText, setAlertText] = useState('');

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value,
        }));
    }

    async function handleSubmitForm(e) {
        // e.preventDefault();
        setIsLoading(true);
        const conflict = await handleConflict(formData.userName);
        if (!conflict && formData.firstName && formData.lastName) {
            const res = await addUserToAPI(
                'https://673d528b0118dbfe8606df63.mockapi.io/api/v1/users',
                formData
            );
            if (!res) {
                console.error('User not updated');
            } else {
                window.location.href = '/dashboard/' + res.id;
            }
        } else if (conflict) {
            setIsLoading(false);
            setAlertText(`Oops! Username already exists...`);
        } else {
            setIsLoading(false);
            setAlertText(`Oops! Did you forget firstname/lastname?`);
        }
    }

    return (
        <Form>
            {alertText ? (
                <div
                    className="alert alert-danger text-align-center"
                    role="alert"
                >
                    {alertText}
                </div>
            ) : (
                <></>
            )}
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
                    disabled={isLoading}
                    onClick={(e) => {
                        e.preventDefault();
                        // window.location.href = '/dashboard';
                        handleSubmitForm();
                    }}
                >
                    Welcome on board!
                    {isLoading ? (
                        <span
                            class="spinner-border spinner-border-sm ms-3"
                            role="status"
                            aria-hidden="true"
                        />
                    ) : (
                        <></>
                    )}
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
