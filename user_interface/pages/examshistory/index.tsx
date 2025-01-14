import React from 'react';
import Header from '../../src/components/Header';
import UserInfo from '../../src/components/UserInfo';
import { GetServerSideProps } from 'next';
import { Button } from 'react-bootstrap';

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

export const getServerSideProps = (async () => {
    try {
        const data = await fetch('');
        if (!data.ok) throw new Error('Exam History Request didnt go through');
        const jsondata = data.json();
        return { props: { jsondata } };
    } catch (err) {
        console.error(err);
    }
}) satisfies GetServerSideProps<{
    examHistoryDataArray: ExamHistoryData[];
}>;

const ExamHistory: React.FC = () => {
    const tableRowTailwind =
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-500 table-auto">
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
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.age}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.email}
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

const ExamHistoryPage: React.FC = () => {
    return (
        <div>
            <Header />
            <UserInfo />
            <hr />
            <div className="d-flex flex-column align-items-center">
                <ExamHistory />
                <h1>Your Exam history is here!</h1>
            </div>
        </div>
    );
};

export default ExamHistoryPage;
