import { useState, useEffect } from 'react';

function UserInfo() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');

    useEffect(() => {
        fetchUserDetails().then((res) => {
            res = res.user;
            try {
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setMiddleName(res.middleName);
            } catch (err) {
                console.error(err);
            }
        });
    }, []);

    return (
        <div className="text-3xl font-semibold">
            Welcome,{' '}
            <span className="text-4xl ">{`${lastName} ${firstName} ${middleName}`}</span>
        </div>
    );
}

async function fetchUserDetails() {
    let userData;
    try {
        userData = await fetch('/api/auth/token', {
            method: 'GET',
            credentials: 'include',
        });
        userData = await userData.json();
        // console.log(userData);
    } catch (err) {
        console.error(err);
    }
    return userData;
}

export default UserInfo;
