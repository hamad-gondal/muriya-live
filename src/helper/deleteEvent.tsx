import { doc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import initFirebase from "../helper/firebase";

initFirebase();
const db = getFirestore();
const notify = () => toast.success('Deleted Successfully', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const deleteEvent = async (eventId: string, eventType: string) => {
    try {
        await deleteDoc(doc(db, eventType, eventId));
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, eventId);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log("Event Deleted");
            notify();
            setTimeout(() => window.location.reload(), 1000);
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
        });

    } catch (error) {
        console.error(error);
    }
};
