import { Container, Row, Col } from 'react-bootstrap';

import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';

// import '../common.css';
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
                        className="h-[500px]"
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
                    <h2 className="mb-1">Digital Exam System</h2>
                    {signup ? (
                        <SignInForm
                            onFormChange={handleSigningFormChange}
                            formUserType="student"
                            formTitle="Student Login"
                        />
                    ) : (
                        <SignInForm
                            onFormChange={handleSigningFormChange}
                            formTitle="Staff Login"
                            formUserType="staff"
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default LandingPage;
