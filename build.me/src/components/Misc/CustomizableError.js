import { store } from 'react-notifications-component';


export const ErrorHandlingNotif = (title, message) => {
    store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["fadeIn"],
        animationOut: ["fadeOut"],
        dismiss: {
        duration: 500000,
        }
    });
}