const app = require('./app');
//setting up the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
