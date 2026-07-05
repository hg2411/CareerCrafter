const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Clean the base URL by stripping trailing slashes or /api/v1
export const BASE_URL = rawApiUrl.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
export const API_BASE_URL = `${BASE_URL}/api/v1`;

export const USER_API_END_POINT = `${API_BASE_URL}/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/company`;
export const NOTIFICATION_API_END_POINT = `${API_BASE_URL}/notifications`;
export const STATS_API_END_POINT = `${API_BASE_URL}/stats`;