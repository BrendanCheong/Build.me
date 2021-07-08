import { store } from 'react-notifications-component';

export const SuccessHandlingNotif = (message) => {
    store.addNotification({
        title: "Success!",
        message:message,
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
        duration: 5000,
        }
    });
}