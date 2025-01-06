import Header from '../../src/components/Header';
import QuestionPage from '../../src/pages/QuestionPage';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { QuestionObject } from '../../src/pages/QuestionPage';
import { shuffleOptions } from '../../src/pages/QuestionPage';

import React from 'react';

export const getServerSideProps = (async () => {
    try {
        // console.log('Fetching questions...');
        const res = await fetch('http://localhost:5000/api/v1/questions');
        if (!res.ok) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
        const questionsObject: QuestionObject = await res.json();
        // console.log('Questions fetched successfully');
        questionsObject.allQuestions.forEach((question) => {
            // console.log(question.options);
            shuffleOptions(question.options);
        });
        return { props: { questionsObject } };
    } catch (err) {
        console.error(err);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}) satisfies GetServerSideProps<{
    questionsObject: QuestionObject;
}>;

function TestPage({ ...questionsObject }): React.JSX.Element {
    return (
        <>
            <Header />
            <QuestionPage {...questionsObject} />
        </>
    );
}

export default TestPage;
