import { apiRequest } from "./request";
import { removeToken } from "./auth";

const verifysession = async (navigate) => {
    let result = await apiRequest("auth/verifysession", "POST");

    if (result.success) {
        navigate(result.data.isAdmin ? "/admin-dashboard" : "/student-dashboard");
    } else {
        removeToken();
        navigate("/auth/login");
    }
};

export default verifysession;
