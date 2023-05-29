/*
PostData component makes a POST request to the server to add another project to the webprojects file
*/

import React, { useState } from "react";

function PostData() {
  // state variable -> an object containg three properties as the ID is formatted automatically
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    URL: "",
  });
  const [message, setMessage] = useState("");

  // asynchronous function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetches the endpoint path
    const response = await fetch("/add", {
      // POST request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // formData is the request body as a JSON object
      body: JSON.stringify(formData),
    });
    // .text() is used becuase the response is in sting format (app.js has res.send not res.json -> response.json() would be used instead)
    const data = await response.text();
    // if status code is 200
    if (response.ok) {
      setMessage(data);
    } else {
      setMessage(data.error);
    }
  };

  // function handles input changes - updates formData variable with new values
  function handleInputChange(event) {
    // creates new object using spread operator to copy the existing formData object and then replaces the values
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          URL:
          <input type="text" name="URL" onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostData;
