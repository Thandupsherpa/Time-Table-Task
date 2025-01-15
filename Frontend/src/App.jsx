import React, { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [name, setname] = useState("");
  const [Course, setCourse] = useState("");

  const submit = (e) => {
    e.preventDefault();

    setname("");
    setCourse("");
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className="flex justify-center items-center">
          <div className="h-72 w-72 bg-zinc-700 mt-40 rounded-md p-3">
            <div className="items-center justify-center flex mb-5">
              <h1 className="text-xl">Login Form</h1>
            </div>
            <hr />
            <div className=" mt-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="full name"
                className="w-full p-2 mb-3 rounded-md outline-none bg-zinc-600 mt-2"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="">
              <label htmlFor="Course">Course Name</label>
              <input
                type="text"
                placeholder="Course name"
                className="w-full p-2 mb-3 rounded-md outline-none bg-zinc-600 mt-2"
                value={Course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
            <div className=" items-center justify-center flex">
              <Link to="/appoimentForm" className="bg-blue-700 px-2 py-2 rounded">Submit</Link>

              {/* <button className="bg-blue-700 px-2 py-2 rounded" type="submit">
                submit
              </button> */}
            </div>
          </div>  
        </div>
      </form>
    </>
  );
}

export default App;
