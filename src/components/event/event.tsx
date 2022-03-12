import { Suspense } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { deleteEvent } from '../../helper/deleteEvent';
import './event.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Img } from 'react-image'
import placeholder from '../../assets/placeholder-grey.jpg'

function Event(eventList: any) {
    const removeJsEvent = async (event: any) => {
        const clickedEventType = event.target.dataset.type;

        switch (clickedEventType) {
            case 'Jebel Sifah':
                deleteEvent(event.target.dataset.id, 'jebelSifah');
                break;
            case 'Havana Salalah':
                deleteEvent(event.target.dataset.id, 'havanaSalalah');
                break;
            default:
                console.log('Wrong event type');
        }
    };

    const navigate = useNavigate();
    const editEvent = (event: any) => {
        navigate({
            pathname: "/add-event",
            search: `?${createSearchParams({
                id: event.target.dataset.id,
                type: event.target.dataset.type
            })}`
        });
    }
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            {eventList.eventList.map((item: any) => (
                <div className='eventDetails' key={item.id}>
                    <div className='eventImage'>
                        {<Suspense fallback={placeholder}>
                            <Img src={item?.image} loader={<img src={placeholder} alt='event' />} />
                        </Suspense>}
                    </div>
                    <div className='eventText'>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Title:</strong></p>
                            <p className='detailText'>{item?.name}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Location:</strong></p>
                            <p className='detailText'>{item?.location?.location}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Venue:</strong></p>
                            <p className='detailText'> {item?.location?.venue}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Phone:</strong></p>
                            <p className='detailText'>{item?.phone}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Date:</strong></p>
                            <p className='detailText'>{item?.eventStart?.date}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Start Time:</strong></p>
                            <p className='detailText'>{item?.eventStart?.time}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>End Time:</strong></p>
                            <p className='detailText'>{item?.eventEnd?.time}</p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Booking:</strong></p>
                            <p className='detailText'>
                                <a className='bookingLink'
                                    href={item?.booking}
                                    target="_blank"
                                    rel="noreferrer"
                                    title={item?.booking}>
                                    {item?.booking}
                                </a>
                            </p>
                        </div>
                        <div className='itemText'>
                            <p className='detailTitle'> <strong>Description:</strong></p>
                        </div>
                        <p className='descriptionText'>{item?.description}</p>
                    </div>
                    <div className='actionButtons'>
                        <button
                            onClick={removeJsEvent}
                            data-id={item?.id}
                            data-type={item?.location?.location}
                            className='btn'>
                            Delete
                        </button>
                        <button onClick={editEvent}
                            data-id={item?.id}
                            data-type={item?.location?.location === "Jebel Sifah" ? 'jebelSifah' : 'havanaSalalah'}
                            className='btn'>
                            Edit
                        </button>

                    </div>
                </div>
            ))
            }
        </>
    );
}

export default Event;
