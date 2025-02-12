import { useState } from 'react';
// import { cookies } from 'next/headers';
import { Form, Button, Row, Col } from 'react-bootstrap';

function SignInForm({ onFormChange, formTitle, formUserType }) {
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
        formData.userType = formUserType;
        const data = await fetch(
            `http://localhost:8000/api/${formUserType}s/login/`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }
        );

        const response = await data.json();
        if (response.msg === 'Login successful!') {
            // window.location.href = '/dashboard';
            let userdata = await fetch('/api/auth/token', {
                method: 'GET',
                credentials: 'include',
            });
            userdata = await userdata.json();
            console.log(userdata);
            setIsLoading(false);
        } else {
            setAlertText(response.msg);
            setIsLoading(false);
        }
    }

    return (
        <Form>
            <hr className="border-t-5 border-black-400 mb-4" />
            <div className="text-center text-2xl font-medium mb-4">
                {formTitle}
            </div>
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
                <Form.Label>
                    {formUserType === 'student'
                        ? 'Admission Number'
                        : 'Username'}
                </Form.Label>
                <Col md={12}>
                    <Form.Control
                        type="text"
                        placeholder={
                            formTitle === 'student'
                                ? 'Admission Number'
                                : 'Username'
                        }
                        required
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
                        {formUserType === 'student'
                            ? 'Your Password is your Lastname in lowercase'
                            : ''}
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
                    {`Not a ${formUserType}?`}
                </Form.Label>
                <Col xs={7}>
                    <div className="d-grid">
                        <Button
                            typeof="button"
                            variant="success"
                            className="me-0"
                            onClick={() => onFormChange()}
                        >
                            {`Switch to ${formUserType === 'student' ? 'Staff' : 'Student'}`}
                        </Button>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default SignInForm;
