const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//setting up the server
// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
