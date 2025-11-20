import { toast } from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";
import useUserToken from "../../context/userTokenStore";


export const getTasks = async () => {
    try {
        const { userToken } = useUserToken.getState();

        const response = await apiRequest({
            url: '/tasks',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
            return response.data;
        

    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message || "Something went wrong");
        }
    }
};
