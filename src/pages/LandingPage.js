import { Container, Row, Col } from 'react-bootstrap';

import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';

import '../global.css';
import { useState } from 'react';

const vertHorCntr = 'flex-column align-items-center justify-content-center';

function LandingPage() {
    const [signup, setSignup] = useState(true);

    function handleSigningFormChange() {
        setSignup(!signup);
    }

    return (
        <Container fluid className="bg-img">
            <Row>
                <Col
                    xs={7}
                    className={`pageheight primary-bg-color d-none d-md-flex ${vertHorCntr}`}
                >
                    <img
                        fluid
                        // mx={9}
                        src="img/landingPage.webp"
                        height={500}
                        className="mx-auto"
                        alt="cbtonlinetest"
                    />
                    <h1>Exam Mastery Hub</h1>
                    <h6>subtitle goes here</h6>
                </Col>
                <Col className={`d-flex ${vertHorCntr} white-bg`}>
                    <h3 className="mb-5">Sign up Exam Success</h3>
                    {signup ? (
                        <SignUpForm onFormChange={handleSigningFormChange} />
                    ) : (
                        <SignInForm onFormChange={handleSigningFormChange} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage;