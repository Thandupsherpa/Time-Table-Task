import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [data, setData] = useState([]);

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
  }, []);

  // Function to get booking information
  const getBooking = (day, time) => {

    // Check for a booking that matches the day and time
    const booking = data.find(
      (item) =>
        item.day.trim().toLowerCase() === day.trim().toLowerCase() &&
        item.time.trim() === time.trim()
    );

    return booking
      ? `${booking.course} - ${booking.userName}` // Display course and userName if booked
      : "Not booked"; // Display 'Not booked yet.' if not booked
  };

  // Define times and days
  const times = [
    "9:30 - 10:20",
    "10:20 - 11:10",
    "11:20 - 12:10",
    "12:10 - 1:00",
    "1:45 - 2:35",
    "2:35 - 3:25",
    "3:25 - 4:15",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <div className="bg-zinc-700 flex justify-center items-center min-h-screen">
        <div className="overflow-x-auto">
          <table className="border-collapse border border-black">
            <caption className="text-lg font-bold mb-2">Time Table</caption>
            <thead>
              <tr>
                <th className="border border-black p-2"></th>
                {times.map((time, index) => (
                  <th
                    key={index}
                    className="border border-black p-2 text-center "
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border border-black p-2 font-bold bg-amber-300">
                    {day}
                  </td>
                  {times.map((time, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-black p-2 bg-cyan-500 text-sm "
                    >
                      {getBooking(day, time)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
