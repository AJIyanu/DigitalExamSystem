import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

interface DecodedToken {
    firstName: string;
    lastName: string;
    middleName: string;
    accessToken: string;
    refreshToken: string;
    userId: string;
    username: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const cookies = parse(req.headers.cookie || '');
    const accessToken = cookies.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: 'No token found' });
    }

    try {
        const decoded = jwt.decode(accessToken) as DecodedToken | null;

        if (!decoded) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        return res.status(200).json({ user: decoded });
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}
