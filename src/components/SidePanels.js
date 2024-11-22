import { Nav } from 'react-bootstrap';

function SidePanel() {
    return (
        <Nav variant="pills" className="flex-column">
            <Nav.Item className="">
                <Nav.Link eventKey="questions" href="/dashboard/questions">
                    Take Exam
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="examhistory" href="/dashboard/examhistory">
                    Exams History
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default SidePanel;
