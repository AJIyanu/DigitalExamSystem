import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Placeholder } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
import '../global.css';

function ScheduledExams() {
    const [userScheduledExams, setUserScheduledExams] = useState({ length: 4 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {}, []);
    return (
        <div>
            <UserInfo />
            <hr />
            <Row xs={1} md={2} lg={3} xl={4} className="g-3">
                {Array.from(userScheduledExams).map((_, idx) => (
                    <Col key={idx}>
                        <LoadingCard
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
                className="card-img"
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

function LoadingCard() {
    return (
        <Card>
            <Placeholder
                as={Card.Img}
                alt="Container icons created by Iconjam - Flaticon"
                title="container icons"
                src="/img/container-truck.png"
                variant="top"
                className="card-img"
                animation="glow"
            />
            <Card.Body>
                <Card.Header>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Subtitle} animation="glow">
                        <Placeholder xs={8} />
                    </Placeholder>
                </Card.Header>
                <Card.Body>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                        <Placeholder xs={8} />
                    </Placeholder>
                </Card.Body>
            </Card.Body>
            <Card.Footer className="d-grid">
                <Placeholder.Button xs={8} />
            </Card.Footer>
        </Card>
    );
}

// Other Functions - not components

export async function fetchDetails(url) {
    const res = await fetch(url).catch((err) => console.error(err));
    if (!res.ok) console.error(`request to ${url} didnt go through`);
    return await res.json();
}
export default ScheduledExams;
