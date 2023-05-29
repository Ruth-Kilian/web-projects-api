/*
DeleteData component deletes a project from a list by it's ID
*/

import React, { useState } from "react";

function DeleteData() {
  // variables to hold the id and message
  const [itemId, setItemId] = useState("");
  const [message, setMessage] = useState("");

  // asynchronous function
  const handleDelete = async (e) => {
    e.preventDefault();
    // fetches the endpoint path
    const response = await fetch("/delete", {
      // DELETE request
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // itemId is the request body as a JSON object
      body: JSON.stringify({ id: itemId }),
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
      <h2>Delete Project</h2>
      <form onSubmit={handleDelete}>
        <label>
          Item:
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
        </label>
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteData;
