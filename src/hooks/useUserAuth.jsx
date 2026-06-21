import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/UserContext";

const useUserAuth = () => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    useEffect(() => {
        const accessToken = localStorage.getItem("token");

        if (!accessToken) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.log("Auth failed", error);

                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUser();
    }, []);
};

export default useUserAuth;