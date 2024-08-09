const express = require("express");
const router = express.Router();

let myArray = [{ id: 111, data: "This is a message!" }];

router.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "GET to API - SUCCESSFUL",
      myArray,
      metadata: { hostname: req.hostname, method: req.method },
    });
  } catch {
    res.status(500).json({
      message: "500: An occurred within the server. Try again later.",
      metadata: { hostname: req.hostname, method: req.method },
    });
    console.log("Error retrieving data!");
  }
  console.log("Data was successfully retrieved");
});

router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = myArray.findIndex((obj) => obj.id === id);

    // Checks if the object exists
    if (index !== -1) {
      data = myArray[index].data;
      res.status(200).json({
        message: "GET by ID for /api - SUCCESSFUL",
        id,
        data,
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log(`Data with ID ${id} was successfully retrieved`);
    } else {
      // If the object doesn't exist, responds with a 404.
      res.status(404).json({
        message: "404: Requested ID was not found",
        id,
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log(`404: Requested ID (${id}) was not found`);
    }
  } catch {
    res.status(500).json({
      message: "500: An occurred within the server. Try again later.",
      metadata: { hostname: req.hostname, method: req.method },
    });
    console.log(`Error while retrieving for ID ${id}`);
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data } = req.body;

    // Checks if data is not empty
    if (data) {
      const index = myArray.findIndex((obj) => obj.id === id);
      let statusCode = 200;
  
      // If the object exists, update it. Otherwise, create it.
      if (index !== -1) {
        myArray[index].data = data;
      } else {
        myArray.push({
          id,
          data,
        });
        statusCode = 201;
      }
  
      res.status(statusCode).json({
        message: "PUT by ID for /api - SUCCESSFUL",
        id,
        data,
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log(
        `Data with ID ${id} was successfully ${
          statusCode === 200 ? "updated" : "created"
        }`
      );
    } else {
      // If data is empty, respond with a 400 status
      res.status(400).json({
        message: "400: Data cannot be empty.",
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log('PUT rejected due to data being empty');
    }
  } catch {
    res.status(500).json({
      message: "500: An occurred within the server. Try again later.",
      metadata: { hostname: req.hostname, method: req.method },
    });
    console.log(`Error while updating/creating for ID ${id}`);
  }
});

router.post("/", (req, res) => {
  try {
    const { data } = req.body;

    // Checks if data is not empty
    if (data) {
      // Creates a random ID
      let id = Math.floor(Math.random() * 100000);
      // Checks if ID already exists, if so, creates a new ID
      while (myArray.findIndex((obj) => obj.id === id) !== -1) {
        id = Math.floor(Math.random() * 100000);
      }

      myArray.push({
        id,
        data,
      });
      res.status(201).json({
        message: "POST to /api - SUCCESSFUL",
        id,
        data,
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log(`Data with ID ${id} was successfully created`);
    } else {
      // If empty, respond with a 400 status
      res.status(400).json({
        message: "400: Data cannot be empty.",
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log('POST rejected due to data being empty');
    }
  } catch {
    res.status(500).json({
      message: "500: An occurred within the server. Try again later.",
      metadata: { hostname: req.hostname, method: req.method },
    });
    console.log(`Error while posting for ID ${id} with data: ${data}`);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = myArray.findIndex((obj) => obj.id === id);

    // Checks if the object exists
    if (index !== -1) {
      myArray.splice(index, 1);
      res.status(200).json({
        message: "DELETE by ID for /api - SUCCESSFUL",
        id,
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log(`Data with ID ${id} was successfully deleted`);
    } else {
      // If not, respond with a 404
      res.status(404).json({
        message: "404: Requested ID was not found",
        id,
        metadata: { hostname: req.hostname, method: req.method },
      });
      console.log(`404: Requested ID (${id}) was not found`);
    }
  } catch {
    res.status(500).json({
      message: "500: An occurred within the server. Try again later.",
      metadata: { hostname: req.hostname, method: req.method },
    });
    console.log(`Error while deleting for ID ${id}`);
  }
});

module.exports = router;
