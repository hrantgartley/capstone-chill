require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Provide static directory for frontend
app.use(express.static("static"));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

app.get("/", async (req, res) => {
    client.connect;
    let mongoResult = await client
        .db("quebec-database")
        .collection("drinks")
        .find()
        .toArray();
    // console.log("get/: ", result);
    console.log(mongoResult);
    // ('res.send("here for a second: " + result[0].name)');
    res.render("index", {
        drinkOptions: mongoResult,
        selectedFreezingTime: 0,
    });
});

app.post("/addCustomDrink", async (req, res) => {
    try {
        //get the new dev name
        // console.log("body: ", req.body);
        // console.log("user Name: ", req.body.devName);

        const customDrinkName = req.body.customDrinkName;
        if (!customDrinkName) {
            return res.status(400).send("Drink name is required.");
        }

        const collection = client.db("quebec-database").collection("drinks");

        // Insert the custom drink into the database
        await collection.insertOne({
            drinkName: customDrinkName,
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(
            "An error occurred while adding the custom drink.",
        );
    }
});

app.post("/selectDrink", async (req, res) => {
    try {
        const selectedDrink = req.body.selectedDrink;
        console.log("selectedDrink:", selectedDrink);

        if (selectedDrink === "select") {
            return res.status(400).send("Please select a drink.");
        }

        // Assuming you have a MongoDB collection named "drinks"
        const collection = client.db("quebec-database").collection("drinks");

        // Find the selected drink's freezing time
        const drink = await collection.findOne({ drinkName: selectedDrink });
        console.log("drink:", drink);

        if (drink) {
            // Get the freezing time of the selected drink
            const freezingTime = drink.freezingTime;

            // Get the drink options
            let mongoResult = await collection.find().toArray();
            // console.log(mongoResult);

            // Send the freezing time as a response
            res.render("index", {
                drinkOptions: mongoResult,
                selectedFreezingTime: freezingTime,
            });
        } else {
            // Handle the case where the drink is not found
            res.status(404).send("Selected drink not found in the database.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the request.");
    }
});

app.get("/mail", (req, res) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.grant_email,
            pass: process.env.grant_pass,
        },
    });

    var mailOptions = {
        from: process.env.grant_email,
        to: process.env.grant_email,
        text: "Test email",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});

app.listen(port, () =>
    console.log(`Server is running...on http://localhost:${port}`),
);
