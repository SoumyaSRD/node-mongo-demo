const http = require(`http`);

const app = require("./src/app/app");

const { PORT } = require("./src/config/keys");

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
