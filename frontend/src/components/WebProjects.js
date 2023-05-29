/*
WebProjects component displays the list of projects from the file webprojects.json
*/

import React, { useState, useEffect } from "react";

function WebProjects() {
  // useState hook to initialise the state
  const [items, setItems] = useState([]);

  // useEffect hook to fetch data from the server
  useEffect(() => {
    // provide the path to the resource (server)
    fetch("/api")
      .then((res) => res.json())
      // setItems is called to update the component with fetched data
      .then((data) => setItems(data))
      // catch error
      .catch((error) => console.log("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <h1>Web Projects</h1>
      <ul>
        {/* map over items and display as a list*/}
        {items.map((item) => (
          // unqiue key is the id
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.URL}>Visit Website</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WebProjects;
