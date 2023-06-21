const { appendFile } = require("fs/promises");

async function debugMiddleware(req, res, next) {
  const time = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  await appendFile(
    "log.txt",
    `Time: ${time}, Method: ${method}, Url: ${url} \n`
  );
  next();
}

module.exports={debugMiddleware}