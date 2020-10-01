const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const PORT = 1337;
const app = express();

// ========= Syncing Databases and Initialize Server ===========
async function init() {
  // Check if Connected to Database
  await db.authenticate().then(() => {
    console.log("connected to the database");
  });

  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();

// ============= Setting up Parsers ============

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json());

// ============== Setting Up Middleware ==========
app.use(morgan("dev"));

// ========= Views ===============
app.use(express.static(__dirname + "/public"));
const layout = require("./views/layout.js");

// ========= Routes ===============
app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.redirect("/wiki");
});
