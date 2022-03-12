import { useEffect, useMemo } from 'react';
import { saveEvent, updateEvent } from '../../helper/saveEvent';
import './add-event.scss';
import { useLocation } from "react-router-dom";
import { getSingleEvent } from '../../helper/getEvents';
import { setFormValue } from '../../helper/setFormValues';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddEvent() {
    let query = useQuery();
    const location = useLocation();
    let eventId: string = query.get("id") || '';
    let eventType: string = query.get("type") || '';

    const saveEventDetails = async (event: any) => {
        eventId ? updateEvent(event) : await saveEvent(event);
    };

    const editEvents = async () => {
        if (eventId) {
            const eventDetails: any = await getSingleEvent(eventType, eventId);
            setFormValue(eventDetails);
        }
    }

    function useQuery() {
        const { search } = useLocation();
        return useMemo(() => new URLSearchParams(search), [search]);
    }

    useEffect(() => {
        if (eventId) {
            editEvents();
        }
    }, [location.pathname]);

    return (
        <div className="wrapper">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="eventDetails">
                <form id="eventDetailsForm" onSubmit={saveEventDetails}>
                    <h1 className='pageTitle'>EVENT DETAILS</h1>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Title: </label>
                        <input
                            name="name"
                            className='inputField'
                            type="text"
                        >
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Location: </label>
                        <select className="inputField dateTime" name="location" >
                            <option value="Jebel Sifah">Jebel Sifah</option>
                            <option value="Havana Salalah">Havana Salalah</option>
                        </select>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Venue: </label>
                        <input
                            name="venue"
                            className='inputField'
                            type="text">
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Start Time: </label>
                        <input
                            name="startTime"
                            className='inputField dateTime'
                            type="time">
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>End Time: </label>
                        <input
                            name="endTime"
                            className='inputField dateTime'
                            type="time">
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Date: </label>
                        <input
                            name="startDate"
                            className='inputField dateTime'
                            type="date">
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Phone: </label>
                        <input
                            name="phone"
                            className='inputField'
                            type="text">
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Booking URL: </label>
                        <input
                            name="booking"
                            className='inputField'
                            type="text">
                        </input>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Description: </label>
                        <textarea className='inputField descriptionField' name="description" id="description" rows={5} cols={60} >
                        </textarea>
                    </div>
                    <div className="sectionDetail">
                        <label className='fieldTitle'>Image: </label>
                        <input
                            name="imageToUpload"
                            id="imageToUpload"
                            className='fileUpload'
                            type="file">
                        </input>
                    </div>
                    <button className='btn' type="submit" value="Submit">Save</button>
                </form>
            </div>
        </div>

    );
}

export default AddEvent;

