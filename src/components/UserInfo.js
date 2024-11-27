import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Stack, Image } from 'react-bootstrap';

function UserInfo() {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
    });

    useEffect(() => {
        fetchUserDetails(
            `https://673d528b0118dbfe8606df63.mockapi.io/api/v1/users/${userId}`
        ).then((res) => {
            setUserInfo(res);
        });
    }, [userId]);

    return (
        <Stack direction="horizontal" className="p-4">
            <div>
                <h3>{`Welcome ${userInfo.lastName} ${userInfo.firstName}`}</h3>
            </div>

            <Image
                roundedCircle
                src={userInfo.profilePicture}
                alt="person-avatar"
                className="ms-auto"
                height={150}
                width={150}
            />
        </Stack>
    );
}

async function fetchUserDetails(url) {
    const res = await fetch(url);

    if (!res.ok)
        console.error(
            'Request didnt go through! Fecting user details gone wrong'
        );

    const userDetails = await res.json();

    return userDetails;
}

export default UserInfo;
