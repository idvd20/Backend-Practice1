const express = require("express");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

const dbLink = process.env.MONGO_URI;

mongoose
	.connect(dbLink, { useNewUrlParser: true }, { useUnifiedTopology: true })
	.then(() => {
		if (process.env.NODE_ENV !== "test") {
			console.log("Server is connected to MongoDB ... \n");
			console.log("CTRL C to stop the process...");
		}
	})
	.catch((err) => {
		console.error("Server error: ", err.message);
		process.exit(1);
	});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

readdirSync("./src/route").map((r) =>
	app.use("/api", require("./src/route/" + r))
);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
