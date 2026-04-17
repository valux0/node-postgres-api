const multer = require("multer");

// Guardar en memoria (no en disco)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
