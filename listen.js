const PORT = process.env.PORT || require("./config").PORT;
const app = require("./app");

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
