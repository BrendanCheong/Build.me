import { store } from 'react-notifications-component';


export const ErrorHandlingNotif = () => {
    store.addNotification({
        title: "Error when Loading Data",
        message:"Something went wrong when loading data",
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
        duration: 5000,
        }
    });
}


