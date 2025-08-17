import api from "../api";

export const submitAccidentReport = async (reportData) => {
    try {
        const response = await api.post('/reports', reportData);
        return response.data;
    } catch (err) {
        console.error('Error submitting accident report:', err.response?.data || err.message);
        throw new Error(err.response?.data?.message || 'Failed to submit accident report');
    }
};

export const getAllReports = async (status = "all") => {
    try {
        const query = status !== "all" ? `?status=${status}` : "";
        const response = await api.get(`/reports${query}`);
        return response.data.reports;
    } catch (err) {
        console.error("Error fetching reports:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Failed to fetch reports");
    }
};

export const getReportById = async (id) => {
    try {
        const response = await api.get(`/reports/${id}`);
        return response.data.report;
    } catch (err) {
        console.error("Error fetching report:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Failed to fetch report");
    }
};

export const updateReportStatus = async (id, status) => {
    try {
        const response = await api.patch(`/reports/${id}/status`, { status });
        return response.data.report;
    } catch (err) {
        console.error("Error updating report status:", err.response?.data || err.message);
        throw new Error(err.response?.data?.message || "Failed to update report status");
    }
};
