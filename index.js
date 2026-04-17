require('dotenv').config();

const server = require('./server');
const PORT = process.env.PORT || 4500;
server.listen(PORT,'0.0.0.0', () => console.log(`Server is alive at localhost:${PORT}`));
