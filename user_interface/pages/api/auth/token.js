import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Parse cookies from the request
    const cookies = parse(req.headers.cookie || '');

    const accessToken = cookies.access_token;

    if (!accessToken) {
        return res.status(401).json({ error: 'No token found' });
    }

    try {
        const decoded = jwt.decode(accessToken);
        return res.status(200).json({ user: decoded });
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}
