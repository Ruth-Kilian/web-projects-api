/*
Modify Data component updates a project(title and/or description) by it's id
*/

import React, { useState } from "react";

function ModifyData() {
  // state variables
  const [id, setId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [message, setMessage] = useState("");

  // asynchronous function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetches the endpoint path
    const response = await fetch("/update", {
      // PUT request
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // id, newTitle, newDescription values are the request body as a JSON object
      body: JSON.stringify({ id, newTitle, newDescription }),
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

  return (
    <div>
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Title:
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          New Description:
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default ModifyData;
