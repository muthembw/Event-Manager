import { useState, useContext, useEffect } from 'react'; 
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateEvent = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
        }
    }, [user, token, navigate]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            if (!token) {
                alert("You must be logged in to create an event.");
                return;
            }

            // Set token explicitly if it’s not already in Axios default headers
            if (!api.defaults.headers.common['Authorization']) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            await api.post("/event", form);

            alert("Event created successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error creating event:", err);
            if (err.response?.status === 401) {
                alert("Unauthorized. Please log in again.");
                navigate("/login");
            } else {
                alert("Error creating event");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
            <input
                className="border p-2 w-full"
                name="title"
                placeholder="Event Title"
                value={form.title}
                onChange={handleChange}
                required
            />
            <textarea
                className="border p-2 w-full"
                name="description"
                placeholder="Event Description"
                value={form.description}
                onChange={handleChange}
                required
            ></textarea>
            <input
                className="border p-2 w-full"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
            />
            <input
                className="border p-2 w-full"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white w-full">Create Event</button>
        </form>
    );
};

export default CreateEvent;
