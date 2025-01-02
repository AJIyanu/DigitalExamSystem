import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';

import Header from './Header';
import SidePanel from './SidePanels';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}): React.JSX.Element => {
    return (
        <>
            <Header />
            <Container fluid className="">
                <Row>
                    <Col
                        xs={4}
                        md={3}
                        lg={3}
                        xl={2}
                        className="primary-bg-color m-1 mt-2 p-2 pt-4 rounded pageheight"
                    >
                        <SidePanel />
                    </Col>
                    <Col className="white-bg rounded m-1 mt-2">
                        <main>{children}</main>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DashboardLayout;
