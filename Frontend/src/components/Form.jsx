import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
  // State to hold form data
  const [formData, setFormData] = useState({
    userName: "",
    time: "",
    day: "",
    course: "",
  });

  // State to hold booked appointments
  const [data, setData] = useState([]);

  // State to hold error message
  const [errorMessage, setErrorMessage] = useState("");

  // Navigate for programmatic redirection
  const navigate = useNavigate();

  // Fetch the appointment data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-Appoinment-Data"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on component mount

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the selected time and day are already booked
    const isTimeBooked = data.some(
      (item) => item.time === formData.time && item.day === formData.day
    );

    if (isTimeBooked) {
      setErrorMessage(
        "This time and day are already booked, please choose another."
      );
      return;
    } else {
      setErrorMessage(""); // Clear the error message if no conflict

      try {
        // Make the POST request using axios
        await axios.post("http://localhost:3000/appointments-Data", formData);

        // Optionally, you can refresh the data after successful booking
        setData((prevData) => [...prevData, formData]);

        // Reset form data after submission
        setFormData({
          userName: "",
          time: "",
          day: "",
          course: "",
        });

        // Navigate to the "/table" page
        navigate("/table");
      } catch (error) {
        console.error("Error booking appointment:", error);
        setErrorMessage(
          "There was an error booking the appointment. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="max-w-lg m-16 p-6 bg-zinc-800 rounded-lg shadow-lg mt-16 text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Book a class</h1>
        <hr />
        <p className="text-[11px] mt-1 mb-2">
          Note: If a time frame is already booked it can't be booked again, try
          a different time.
        </p>

        {/* Display error message if exists */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded-md text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-white"
            >
              Name:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="bg-zinc-500 outline-none mt-1 block w-full px-4 py-2 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-white"
            >
              Time:
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="bg-zinc-500 outline-none mt-1 block w-full px-4 py-2 rounded-md shadow-sm"
              required
            >
              <option value="">Select a Time</option>
              <option value="9:30 - 10:20">9:30 - 10:20</option>
              <option value="10:20 - 11:10">10:20 - 11:10</option>
              <option value="11:20 - 12:10">11:20 - 12:10</option>
              <option value="12:10 - 1:00">12:10 - 1:00</option>
              <option value="1:45 - 2:35">1:45 - 2:35</option>
              <option value="2:35 - 3:25">2:35 - 3:25</option>
              <option value="3:25 - 4:15">3:25 - 4:15</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="day"
              className="block text-sm font-medium text-white"
            >
              Day:
            </label>
            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="bg-zinc-500 outline-none mt-1 block w-full px-4 py-2 rounded-md shadow-sm"
              required
            >
              <option value="">Select a Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-white"
            >
              Course:
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="bg-zinc-500 outline-none mt-1 block w-full px-4 py-2 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-end mr-64">
        <div className="h-[30rem] w-80 bg-gray-700 -mt-[35rem] rounded-sm border border-white p-5 overflow-y-auto">
          <h1 className="text-center text-xl">Already booked time Frame</h1>
          <hr />

          {/* Conditionally render booked times */}
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="border border-blue h-22 rounded-md mt-2 mb-2 p-2"
              >
                <div className="text-xs tracking-tighter">
                  <h6 className="text-sm">Teacher name : {item.userName}</h6>
                  <p>Booked Time : {item.time}</p>
                  <p>Course : {item.course}</p>
                  <p>Day : {item.day}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-300">
              No appointments booked.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
