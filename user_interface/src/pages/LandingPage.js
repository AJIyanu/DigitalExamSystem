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
                        //fluid
                        // mx={9}
                        src="img/landingPage.webp"
                        height={500}
                        className="mx-auto"
                        alt="cbtonlinetest"
                    />
                    <h1>My Exam, My Confidence</h1>
                    <h5>
                        made in simplicity, totally secured, you are not
                        stressed!
                    </h5>
                    <hr style={{ width: '50%', marginTop: '80px' }} />
                    <p>
                        <i>
                            ...Revolutionize Your Exam Process with Digital
                            Efficiency
                        </i>
                    </p>
                </Col>
                <Col className={`d-flex ${vertHorCntr} white-bg`}>
                    <h2 className="mb-5">Digital Exam System</h2>
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
