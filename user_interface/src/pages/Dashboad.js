import { Col, Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import QuestionPage from './QuestionPage';
import SidePanel from '../components/SidePanels';
import ExamHistory from './ExamHistory';
import ScheduledExams from './ScheduledExams';

import '../global.css';

function UserDashboard() {
    return (
        <>
            <Header />
            <Container fluid className="">
                <Row>
                    <Col
                        xs={4}
                        md={3}
                        lg={3}
                        xl={2}
                        className="primary-bg-color m-1 mt-2 p-2 pt-4 rounded pageheight"
                    >
                        <SidePanel />
                    </Col>
                    <Col className="white-bg rounded m-1 mt-2">
                        <Routes>
                            <Route
                                path="/:userId"
                                element={<ScheduledExams />}
                            />
                            <Route
                                path="/:userId/questions/:subject"
                                element={<QuestionPage />}
                            />
                            <Route
                                path="/examhistory"
                                element={<ExamHistory />}
                            />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserDashboard;
