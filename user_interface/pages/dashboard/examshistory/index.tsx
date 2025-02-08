import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

import UserInfo from '../../../src/components/UserInfo';
import { getCookie } from '../../../src/components/UserInfo';

import DashboardLayout from '../../../src/components/DashboadLayout';

import type { NextPageWithLayout } from '../../_app';
import type { ReactElement } from 'react';

const ExamsHistoryPage: NextPageWithLayout = () => {
    return (
        <div>
            <UserInfo />
            <hr />
            <div className="d-flex flex-column align-items-center">
                <ExamHistory />
                {/* <h1>Your Exam history is here!</h1> */}
            </div>
        </div>
    );
};

ExamsHistoryPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
// export default ExamsHistoryPage;

interface TableData {
    id: number;
    name: string;
    age: number;
    email: string;
}

interface ExamHistoryData {
    id: string;
    date: string;
    subject: string;
    timeStarted: string;
    timeEnded: string;
    score: string;
}

const data: TableData[] = [
    { id: 1, name: 'John Doe', age: 30, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { id: 3, name: 'Peter Jones', age: 40, email: 'peter.jones@example.com' },
    { id: 4, name: 'Emily Davis', age: 28, email: 'emily.davis@example.com' },
];

const ExamHistory: React.FC = () => {
    const [examHistoryData, setExamHistoryData] = useState<ExamHistoryData[]>(
        []
    );

    useEffect(() => {
        const fetchExamHistoryData = async () => {
            try {
                const data = await fetch(
                    `http://127.0.0.1:5000/api/v1/examhistory/${getCookie('userId')}`
                );
                if (!data.ok)
                    throw new Error('Exam History Request didnt go through');
                const jsondata: ExamHistoryData[] = await data.json();
                console.log(jsondata);
                setExamHistoryData(jsondata);
            } catch (err) {
                console.error(err);
            }
        };
        fetchExamHistoryData();
    }, []);

    const tableRowTailwind =
        'px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider';
    return (
        <div className={examHistoryData.length > 0 ? 'overflow-x-auto' : ''}>
            <table className="min-w-full divide-y divide-black table-auto">
                <thead className="bg-red-500">
                    <tr>
                        <th scope="col" className={tableRowTailwind}>
                            S/N
                        </th>
                        <th scope="col" className={tableRowTailwind}>
                            Date
                        </th>
                        <th scope="col" className={tableRowTailwind}>
                            Subject
                        </th>
                        <th scope="col" className={tableRowTailwind}>
                            Time Started
                        </th>
                        <th scope="col" className={tableRowTailwind}>
                            Time Ended
                        </th>
                        <th scope="col" className={tableRowTailwind}>
                            Score
                        </th>
                        <th scope="col" className={tableRowTailwind}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {examHistoryData.map((item, idx) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {idx + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.timeStarted}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                {item.timeEnded}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-black">
                                {item.score}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Button variant="outline-success" href="#">
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExamsHistoryPage;
