export const BASE_URL = import.meta.env.VITE_BASE_URL;

// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getuser",
    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard/"
    },
    INCOME: {
        ADD_INCOME: "/api/income/add",
        GET_INCOME: "/api/income/get",
        DELETE_INCOME: (incomeId) => `/api/income/delete/${incomeId}`,
        DOWNLOAD_INCOME: "/api/income/download"
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/expense/add",
        GET_EXPENSE: "/api/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/expense/delete/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/expense/download"
    },
    IMAGE: {
        UPLOAD_PFP: "/api/auth/upload-pfp"
    },
};