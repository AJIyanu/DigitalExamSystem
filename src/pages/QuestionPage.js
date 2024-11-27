import { Stack, Image, Button, Col, Row } from 'react-bootstrap';

import Question from '../components/question';
import Options from '../components/options';
import CountDownTimer from '../components/CountDownTimer';

import '../App.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

let allQuestionObject = [
    {
        id: '',
        Question: '',
        answer: '',
        otherOptions: [],
        allowMultiple: false,
        instructions: '',
        selectedOption: null,
    },
];

// Components

function Exam({ submit }) {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [emptyQuestions, loadedQuestions] = useState(allQuestionObject);
    // console.log(allQuestionObject, emptyQuestions)

    useEffect(() => {
        const loadQuestions = async () => {
            await fetch(
                'https://673d528b0118dbfe8606df63.mockapi.io/api/v1/questions'
            )
                .then(async (response) => {
                    const userQuestions = await response.json();
                    userQuestions.forEach((eachQuestion) => {
                        eachQuestion.otherOptions.push(eachQuestion.answer);
                        shuffleOptions(eachQuestion.otherOptions);
                    });
                    allQuestionObject = userQuestions;
                    loadedQuestions(userQuestions);
                })
                .catch((err) => console.error(err));
        };

        loadQuestions();
    }, []);

    function handleNextButton() {
        if (questionNumber >= emptyQuestions.length - 1) {
            setQuestionNumber(0);
        } else {
            setQuestionNumber((questionNumber) => questionNumber + 1);
        }
    }

    function handlePrevButton() {
        if (questionNumber <= 0) {
            setQuestionNumber(emptyQuestions.length - 1);
        } else {
            setQuestionNumber((questionNumber) => questionNumber - 1);
        }
    }

    function setUserSelectedOption(userSelectedOption) {
        emptyQuestions[questionNumber].selectedOption = userSelectedOption;
    }

    // console.log(emptyQuestions);

    return (
        <>
            <div className="m-5">
                <Stack direction="horizontal">
                    <h2>Question Number {questionNumber + 1}</h2>
                    <div className="ms-auto">
                        <CountDownTimer
                            onTimerEnd={submit}
                            endTime="2024-11-27T15:40:21.629Z"
                        />
                    </div>
                </Stack>
                <h4>
                    <i>Read the below instructions carefully</i>
                </h4>
                <p>
                    <i>{emptyQuestions[questionNumber].instructions}</i>
                </p>
                <hr />
                <Question>{emptyQuestions[questionNumber].Question}</Question>
                <div className="ms-5 mb-5">
                    <Options
                        optionsArray={
                            emptyQuestions[questionNumber].otherOptions
                        }
                        questionId={[
                            emptyQuestions[questionNumber].id,
                            emptyQuestions[questionNumber].selectedOption,
                        ]}
                        cllbck={setUserSelectedOption}
                    />
                </div>
                <div>
                    <Row>
                        <Col xs={2}>
                            <div className="d-grid">
                                <Button
                                    onClick={handlePrevButton}
                                    variant="warning"
                                >
                                    Prev
                                </Button>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div className="d-grid">
                                <Button
                                    onClick={handleNextButton}
                                    variant="info"
                                >
                                    Next
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

function UserInfo() {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
    });

    useEffect(() => {
        fetchUserDetails(
            `https://673d528b0118dbfe8606df63.mockapi.io/api/v1/users/${userId}`
        ).then((res) => {
            setUserInfo(res);
        });
    }, [userId]);

    return (
        <Stack direction="horizontal" className="p-4">
            <div>
                <h3>{`Welcome ${userInfo.lastName} ${userInfo.firstName}`}</h3>
            </div>

            <Image
                roundedCircle
                src={userInfo.profilePicture}
                alt="person-avatar"
                className="ms-auto"
                height={150}
                width={150}
            />
        </Stack>
    );
}

function QuestionPage() {
    const [displayResult, setDisplayResult] = useState(false);
    const [buttonText, setButtonText] = useState('Submit');

    function handleSubmitButton() {
        console.log(markAnswers(allQuestionObject));
        setDisplayResult(true);
        setButtonText('View Solutions');
    }

    return (
        <div>
            <UserInfo />
            <hr />
            {displayResult ? (
                <DisplayResult
                    result={markAnswers(allQuestionObject)}
                    questions={allQuestionObject}
                />
            ) : (
                <Exam submit={handleSubmitButton} />
            )}
            {/* <Exam /> */}
            <Col xs={3}>
                <div className="d-grid mt-3">
                    <Button onClick={handleSubmitButton} variant="success">
                        {buttonText}
                    </Button>
                </div>
            </Col>
        </div>
    );
}

//Functions used by components

function markAnswers(studentQuestion) {
    let score = 0;
    studentQuestion.forEach((question) => {
        if (question.answer === question.selectedOption) score++;
    });
    return score;
}

function DisplayResult({ result, questions }) {
    return (
        <h3>
            Congratulations! You got {result} questions right out of{' '}
            {questions.length}
        </h3>
    );
}

function shuffleOptions(options = []) {
    for (let i = options.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
    }
    // return options
}

async function fetchUserDetails(url) {
    const res = await fetch(url);

    if (!res.ok)
        console.error(
            'Request didnt go through! Fecting user details gone wrong'
        );

    const userDetails = await res.json();

    return userDetails;
}

export default QuestionPage;
