const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {


  res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});



require("./routes/scategoria.js")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
