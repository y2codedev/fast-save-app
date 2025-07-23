import { toast } from "react-toastify";

 const Toast = (type: string, message: string) => {
    switch (type) {
        case "success":
            toast.success(message, {
                autoClose: 3000,
                toastId: message,
            });
            break;
        case "error":
            toast.error(message, {
                autoClose: 3000,
                toastId: message,
            });
            break;
        case "info":
            toast.info(message, {
                autoClose: 3000,
                toastId: message,
            });
            break;
        case "warning":
            toast.warn(message, {
                autoClose: 3000,
                toastId: message,
            });
            break;
        default:
            toast(message, {
                autoClose: 3000,
                toastId: message,
            });
            break;
    }
};

export default Toast;