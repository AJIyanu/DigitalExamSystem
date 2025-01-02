import DashboardLayout from '../../src/components/DashboadLayout';
import ScheduledExams from '../../src/pages/ScheduledExams';

import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';

const ScheduledExamsPage: NextPageWithLayout = () => {
    return <ScheduledExams />;
};

ScheduledExamsPage.getLayout = function getLayout(page: ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
export default ScheduledExamsPage;
