import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { fetchUserByUsername } from './SignUpForm';

function SignInForm({ onFormChange }) {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
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
        e.preventDefault();
        setIsLoading(true);
        const conflict = await fetchUserByUsername(formData.userName);
        if (!conflict) {
            setIsLoading(false);
            setAlertText('Oops! Username does not exist');
        } else if (conflict.lastName !== formData.password) {
            setIsLoading(false);
            setAlertText(`Oops! Your lastname is your password`);
        } else {
            setIsLoading(false);
            window.location.href = '/dashboard/' + conflict.userName;
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
                    onClick={handleSubmitForm}
                >
                    Welcome Back!
                    {isLoading ? (
                        <span
                            className="spinner-border spinner-border-sm ms-3"
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
