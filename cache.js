// middlewares/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 });

module.exports = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log('Cache hit');
    res.json(cachedResponse);
  } else {
    console.log('Cache miss');
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
};