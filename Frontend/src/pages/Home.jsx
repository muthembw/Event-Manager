import {useEffect, useState} from 'react';
import EventCard from '../components/EventCard';
import api  from '../api';

const Home = () =>{
    const[events, setEvents] =useState([]);

    useEffect(() =>{
        const fetchEvents = async ()=>{
            const res = await api.get("/event");
            setEvents(res.data);
        };
        fetchEvents();
    },[]);
    return(
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
            {events.length > 0?(
                events.map((event) => <EventCard key={event._id} event={event} />)
            ):(
                <p>No events found</p>
            )}
        </div>
    );
};
export default Home;