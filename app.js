const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const fs = require("fs");

// body-parser middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getItems() {
  try {
    const data = fs.readFileSync("webprojects.json");
    const items = JSON.parse(data);
    return items;
  } catch (e) {
    return e;
  }
}

function addItem(newItem) {
  const items = getItems();
  items.push(newItem);
  fs.writeFileSync("webprojects.json", JSON.stringify(items));
}

function deleteItem(id) {
  const items = getItems();
  const index = items.findIndex((object) => {
    return object.id == id;
  });
  if (index >= 0) {
    items.splice(index, 1);
    fs.writeFileSync("webprojects.json", JSON.stringify(items));
    return true;
  }
  return false;
}

app.get("/api", (req, res) => {
  const items = getItems();
  res.send(items);
});

// POST request that adds an additional item to the list of Web Project items
app.post("/add", (req, res) => {
  const items = getItems();
  const newItem = {
    id: items.length + 1,
    title: req.body.title,
    description: req.body.description,
    URL: req.body.URL,
  };
  if (
    items.some(
      (item) =>
        item.title === newItem.title &&
        item.description === newItem.description &&
        item.URL === newItem.URL
    )
  ) {
    res.send("Item already exists");
  } else {
    addItem(newItem);
    res.send("Item added");
  }
});

// DELETE request that deletes an item with a specific id from the list of Web Project items.
app.delete("/delete", (req, res) => {
  const id = req.body.id;
  const deleted = deleteItem(id);
  if (deleted) {
    res.send("Item deleted");
  } else {
    res.send("Item not found");
  }
});

// PUT request to update the title or description of an item on the list of Web Project items.
app.put("/update", (req, res) => {
  const id = req.body.id;
  const items = getItems();

  const itemToUpdate = items.find((item) => item.id == id);

  if (itemToUpdate) {
    itemToUpdate.title = req.body.newTitle || itemToUpdate.title;
    itemToUpdate.description =
      req.body.newDescription || itemToUpdate.description;
    fs.writeFileSync("webprojects.json", JSON.stringify(items));
    res.send("Success, updated item");
  } else {
    res.send("Item does not exist");
  }
});

app.listen(port, () => console.log("Listening engaged on port 8080"));
