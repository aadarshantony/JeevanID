import api from "../api";

export const registerUser = async (userData) => {
    try {
        const res = await api.post('/auth/register', userData);
        return res.data;
    } catch (err) {
        throw err.response?.data || err;

    }
}

export const fetchJeevanID = async (phone) => {
    try {
        const response = await api.get(`/auth/jeevanid/${phone}`);
        return response.data.user;
    } catch (err) {
        console.error('Error fetching JeevanID:', err.response?.data?.message || err.message);
        throw new Error(err.response?.data?.message || 'Failed to fetch JeevanID');
    }
};