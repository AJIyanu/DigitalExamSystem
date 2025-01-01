import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Placeholder } from 'react-bootstrap';
import UserInfo from '../components/UserInfo';
// import '../common.css';
import { useParams } from 'react-router-dom';

function ScheduledExams() {
    const [userScheduledExams, setUserScheduledExams] = useState({ length: 4 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDetails(
                'http://127.0.0.1:5000/api/v1/scheduledexams'
            );
            setUserScheduledExams(data);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsLoading(false);
        }
        fetchData();
    }, []);

    // useEffect(() => {}, []);
    return (
        <div>
            <UserInfo />
            <hr />
            <Row
                xs={1}
                md={2}
                lg={3}
                xl={4}
                className="g-3"
                style={{ display: 'flex', alignItems: 'stretch' }}
            >
                {Array.from(userScheduledExams).map((_, idx) => (
                    <Col key={idx}>
                        {isLoading ? <LoadingCard /> : <SubjectCard {..._} />}
                    </Col>
                ))}
            </Row>
        </div>
    );
}

function SubjectCard({ name, instruction, duration, img }) {
    const { userId } = useParams();

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
                <Button
                    xs={6}
                    as="a"
                    href={`/dashboard/${userId}/questions/${name.replace(/\s+/g, '')}`}
                >
                    Start
                </Button>
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
