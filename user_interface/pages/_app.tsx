import '../style/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import DashboardLayout from '@/components/DashboardLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    const isDashboardRoute = router.pathname.startsWith('/dashboard');

    if (isDashboardRoute) {
        return (
            <DashboardLayout>
                <Component {...pageProps} />
            </DashboardLayout>
        );
    }
    // console.log(getLayout);

    return getLayout(<Component {...pageProps} />);
}
export default MyApp;
