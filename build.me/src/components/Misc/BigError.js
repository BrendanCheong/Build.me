import { store } from 'react-notifications-component';


export const ErrorHandlingNotif = (message) => {
    store.addNotification({
        title: "Verification Token Error",
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
