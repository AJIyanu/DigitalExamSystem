import { Stack, Image, Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import Question from '../components/question';
import Options from '../components/options';

import '../App.css';

import { useEffect, useState } from 'react';

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

function shuffleOptions(options = []) {
    for (let i = options.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
    }
    // return options
}

function Exam() {
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
                <h2>Question Number {questionNumber + 1}</h2>
                <h4>
                    <i>Read the below instructions carefully</i>
                </h4>
                <p>
                    <i>{emptyQuestions[questionNumber].instructions}</i>
                </p>
                <hr />
                <Question>{emptyQuestions[questionNumber].Question}</Question>
                <Options
                    optionsArray={emptyQuestions[questionNumber].otherOptions}
                    questionId={[
                        emptyQuestions[questionNumber].id,
                        emptyQuestions[questionNumber].selectedOption,
                    ]}
                    cllbck={setUserSelectedOption}
                />
            </div>
            <Row>
                <Col xs={2}>
                    <div className="d-grid">
                        <Button onClick={handlePrevButton} variant="warning">
                            Prev
                        </Button>
                    </div>
                </Col>
                <Col xs={2}>
                    <div className="d-grid">
                        <Button onClick={handleNextButton} variant="info">
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

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

function UserInfo() {
    return (
        <Stack direction="horizontal" className="p-4">
            <div>
                <h3>{`Welcome Lastname Firstname`}</h3>
            </div>

            <Image
                roundedCircle
                src="https://img.icons8.com/officel/150/person-male.png"
                alt="person-avatar"
                className="ms-auto"
                height={150}
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
                <Exam />
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

export default QuestionPage;
