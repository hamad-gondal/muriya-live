import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import initFirebase from "../helper/firebase";

initFirebase();
const db = getFirestore();

export const getEvents = async (eventType: string) => {
    const eventsList: any[] = [];
    const querySnapshotJS = await getDocs(collection(db, eventType));
    querySnapshotJS.forEach((doc) => {
        doc.data().id = doc.id;
        eventsList.push(doc.data());
    });

    return eventsList;
};

export const getSingleEvent = async (eventType: string, id: string) => {
    const eventsList: any[] = [];
    const querySnapshotJS = await getDocs(collection(db, eventType));
    querySnapshotJS.forEach((doc) => {
        doc.data().id = doc.id;
        if (doc.data().id === id) {
            eventsList.push(doc.data());
        }
    });
    return eventsList;
};
