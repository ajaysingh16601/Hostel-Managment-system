import { apiRequest } from "./request";

const getAllStudents = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const data = await apiRequest("student/get-all-students", "POST", { hostel });
    return data;
};

export default getAllStudents;
