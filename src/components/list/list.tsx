import './list.scss';
import Event from '../event/event'
import { getEvents } from '../../helper/getEvents';
import { useEffect, useState } from 'react';
import { isEmpty } from "lodash"
import Loader from '../loader/loader';

function List() {
    const [eventsJS, setEventsJS] = useState([{}]);
    const [eventsHS, setEventsHS] = useState([{}]);
    useEffect(() => {
        async function fetchData() {
            const eventsJS = await getEvents("jebelSifah");
            const eventsHS = await getEvents("havanaSalalah");
            setEventsJS(eventsJS);
            setEventsHS(eventsHS);
        }
        fetchData();
    }, []);

    return (
        <div className='content'>
            <div className="jebelSifah">
                <h1 className="title">JEBEL SIFAH EVENTS</h1>
                <div className='events'>
                    {isEmpty(eventsJS[0]) ? <Loader /> : < Event eventList={eventsJS} />}
                </div>
            </div>
            <div className="havanaSalalah">
                <h1 className="title">HAVANA SALALAH EVENTS</h1>
                <div className='events'>
                    {isEmpty(eventsHS[0]) ? <Loader /> : < Event eventList={eventsHS} />}
                </div>
            </div>
        </div>
    );
}


export default List;


