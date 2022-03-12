import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from 'moment';
import ImageTools from '../helper/ImageTools';
import firebase from 'firebase/compat/app';
import { toast } from "react-toastify";

export const saveEvent = async (event: any) => {

    event.preventDefault();
    const db = getFirestore();
    const file = event.target.imageToUpload.files[0];
    if (!!file) {
        const imageTools = new ImageTools();
        const reSizedImage = imageTools.resize(file, { width: 768, height: 432 });
        const docId = uuidv4();
        const storage = getStorage();
        const storageRef = ref(storage, docId);
        const eventLocation = event.target.location.value === "Jebel Sifah" ? "jebelSifah" : "havanaSalalah";
        uploadBytes(storageRef, await reSizedImage).then(() => {
            console.log("Image Uploaded Successfully!");
            getDownloadURL(ref(storage, docId))
                .then((url) => {
                    setDoc(doc(db, eventLocation, docId), eventDetails(event, url, docId));
                    console.log("Data Saved Successfully");
                    notify('Added Successfully');
                    clearAllFields(event);
                })
                .catch((error) => {
                    console.log("Error in uploading image: ", error);
                });
        });
    }
};

export const updateEvent = async (event: any) => {
    event.preventDefault();
    const firestore = firebase.firestore();
    const file = event.target.imageToUpload?.files[0];
    const imageUrl = event.target.imageToUpload.dataset.src;
    const eventId = event.target.imageToUpload.dataset.id;
    const eventLocation = event.target.location.value === "Jebel Sifah" ? "jebelSifah" : "havanaSalalah";

    if (!!file) {
        const imageTools = new ImageTools();
        const reSizedImage = imageTools.resize(file, { width: 768, height: 432 });
        const docId = uuidv4();
        const storage = getStorage();
        const storageRef = ref(storage, docId);
        uploadBytes(storageRef, await reSizedImage).then(() => {
            console.log("Image Uploaded Successfully!");
            getDownloadURL(ref(storage, docId))
                .then((url) => {
                    eventDetails(event, url, docId);
                    firestore.collection(eventLocation)
                        .doc(eventId)
                        .update(eventDetails(event, url, docId));
                    console.log("Data Saved Successfully");
                    notify('Updated successfully');
                })
                .catch((error) => {
                    console.log("Error in uploading image: ", error);
                });
        });
    }

    if (!file) {
        firestore.collection(eventLocation).doc(eventId)
            .update(eventDetails(event, imageUrl, eventId));
        console.log("Data Updated Successfully");
        notify('Updated Successfully');
    }
};

export const clearAllFields = (event: any): void => {
    event.target.name.value = "";
    event.target.venue.value = "";
    event.target.startDate.value = "";
    event.target.startTime.value = "";
    event.target.endTime.value = "";
    event.target.phone.value = "";
    event.target.description.value = "";
    event.target.imageToUpload.value = "";
    event.target.booking.value = "";
};

export const notify = (eventText: string) => toast.success(eventText, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const eventDetails = (event: any, url?: string, docId?: string): any => {
    return {
        name: event.target.name.value,
        location: {
            location: event.target.location.value,
            venue: event.target.venue.value,
            latitude:
                event.target.location.value === "Jebel Sifah"
                    ? "23.4117"
                    : "17.0334",
            longitude:
                event.target.location.value === "Jebel Sifah"
                    ? "58.7875"
                    : "54.3003",
        },
        eventStart: {
            time: event.target.startTime.value,
            date: moment(event.target.startDate.value).format('ll'),
        },
        eventEnd: {
            time: event.target.endTime.value,
            date: '',
        },
        phone: event.target.phone.value,
        description: event.target.description.value,
        image: url,
        id: docId,
        booking: event.target.booking.value,
    }
};
