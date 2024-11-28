import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';

function ScheduledExams() {
    return (
        <div>
            <UserInfo />
            <hr />
            <Row xs={1} md={4} className="g-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        <SubjectCard
                            name="Nursing"
                            duration="30 minutes"
                            instruction="Once exam is started, no quitting... Goodluck!"
                            img="https://img.icons8.com/3d-fluency/94/nurse-female--v4.png"
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

function SubjectCard({ name, instruction, duration, img }) {
    return (
        <Card>
            <Card.Img
                as="img"
                alt={`${name}-icon`}
                src={img}
                variant="top"
                width="10px"
                // height="200px"
            />
            <Card.Body>
                <Card.Header>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>
                        {
                            <b>
                                <i>Exam Duration: </i>
                            </b>
                        }
                        {<i>{duration}</i>}
                    </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    {
                        <b>
                            <i>Read the instructions carefully</i>
                        </b>
                    }
                    {<br />}
                    {instruction}
                </Card.Body>
            </Card.Body>
            <Card.Footer className="d-grid">
                <Button xs={6}>Start</Button>
            </Card.Footer>
        </Card>
    );
}

export default ScheduledExams;
