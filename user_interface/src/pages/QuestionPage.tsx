import { Stack, Button, Col, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import Question from '../components/question';
import Options from '../components/options';
import CountDownTimer from '../components/CountDownTimer';
import UserInfo from '../components/UserInfo';

// import type { InferGetServerSidePropsType } from 'next';
// import { getServerSideProps } from '../../pages/tests/[subject]';

// Interface and Types

interface AllQuestion {
    id: string;
    Question: string;
    options: string[];
    allowMultiple: boolean;
    instructions: string;
    selectedOption: string | null;
}

export interface QuestionObject {
    questionId: string;
    allQuestions: AllQuestion[];
    startTime: number;
    endTime: number;
    subject: string;
    academicClass: string;
}

interface ExamProps {
    allQuestions: AllQuestion[];
    endTime: QuestionObject['endTime'];
    submit: () => void;
}

// Components

const Exam: React.FC<ExamProps> = ({ allQuestions, endTime, submit }) => {
    const [questionNumber, setQuestionNumber] = React.useState(0);

    function handleNextButton() {
        if (questionNumber >= allQuestions.length - 1) {
            setQuestionNumber(0);
        } else {
            setQuestionNumber((questionNumber) => questionNumber + 1);
        }
    }

    function handlePrevButton() {
        if (questionNumber <= 0) {
            setQuestionNumber(allQuestions.length - 1);
        } else {
            setQuestionNumber((questionNumber) => questionNumber - 1);
        }
    }

    function setUserSelectedOption(userSelectedOption: string) {
        allQuestions[questionNumber].selectedOption = userSelectedOption;
    }

    return (
        <>
            <div className="m-5">
                <Stack direction="horizontal">
                    <h2>Question Number {questionNumber + 1}</h2>
                    <div className="ms-auto">
                        <CountDownTimer onTimerEnd={submit} endTime={endTime} />
                    </div>
                </Stack>
                <h4>
                    <i>Read the below instructions carefully</i>
                </h4>
                <p>
                    <i>{allQuestions[questionNumber].instructions}</i>
                </p>
                <hr />
                <Question>{allQuestions[questionNumber].Question}</Question>
                <div className="ms-5 mb-5">
                    <Options
                        optionsArray={allQuestions[questionNumber].options}
                        questionId={[
                            allQuestions[questionNumber].id,
                            allQuestions[questionNumber].selectedOption,
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
};

function QuestionPage({ ...questionObject }): React.JSX.Element {
    let submissionRetry = 0;
    const [disableButton, setDisableButton] = useState(false);

    async function handleSubmit() {
        setDisableButton(true);
        try {
            const res = await fetch('http://localhost:5000/api/v1/submit');
            if (!res.ok) {
                submissionRetry = submissionRetry + 1;
                if (submissionRetry < 3) {
                    throw new Error('Failed to submit');
                } else {
                    //implement a logic to save answers and resubmit on reconnection.

                    alert(`Exam has not been submitted. Please contact technnician.\n
                        Exam will resubmit when internet connection has been restablished`);
                    setDisableButton(false);
                }
            }
            window.location.href = '/examshistory';
        } catch (err) {
            console.error(err);
            setTimeout(() => handleSubmit(), 2000);
        }
    }

    return (
        <div>
            <UserInfo />
            <hr />
            <Exam
                submit={handleSubmit}
                allQuestions={questionObject.questionsObject.allQuestions}
                endTime={questionObject.questionsObject.endTime}
            />

            <div className="d-grid mt-3">
                <Button
                    disabled={disableButton}
                    onClick={handleSubmit}
                    variant="success"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

//Functions used by components

export function shuffleOptions(options: string[]) {
    for (let i = options.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
    }
    return options;
}

export default QuestionPage;
