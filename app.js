const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(__dirname + "/closed"));


app.use((req, res, next) => {
  const currentHour = new Date().getHours();
  const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const options = { weekday: "long" };
  const day = new Date().toLocaleDateString("en-US", options);

  if (weekDay.includes(day) && 9 <= currentHour && currentHour < 17) {
    next();
  } else {
    res.status(503).sendFile(__dirname + "/closed/close.html");
  }
});

app.get("/", (req, res) => {
  res.render("home.pug", { title: "express", message: "hello" });
});

app.get("/contact", (req, res) => {
  res.render("contact.pug", { title: "Contact Us" });
});

app.get("/service", (req, res) => {
  res.render("service.pug", { title: "Our Service" });
});

app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(
        `Notre application Node est démarrée sur : http://localhost:${port}`
      );
});
