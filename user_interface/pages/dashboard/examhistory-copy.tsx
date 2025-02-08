import DashboardLayout from '../../src/components/DashboadLayout';

import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

const ExamsHistoryPage: NextPageWithLayout = () => {
    return <div>Exams History Page</div>;
};

ExamsHistoryPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
export default ExamsHistoryPage;
