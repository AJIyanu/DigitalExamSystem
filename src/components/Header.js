import { Stack, NavLink } from 'react-bootstrap';

import '../global.css';

function Header() {
    return (
        <Stack direction="horizontal" gap={4} className="primary-bg-color">
            <NavLink href="/">
                <h3 className="m-4">AJ Digital Exam System</h3>
            </NavLink>
            <i className="bi bi-bell-fill ms-auto icon-font"></i>
            {/* <Image
                roundedCircle
                src="https://img.icons8.com/officel/40/person-male.png"
                alt="person-avatar"
                className="ms-2"
            /> */}
            <i className="bi bi-wrench-adjustable-circle icon-font me-5" />
        </Stack>
    );
}

export default Header;
