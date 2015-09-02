

console.log("uri is "+process.env.MONGO_URI);
module.exports = {
  database: process.env.MONGO_URI || 'localhost',
  bingKey: "ArZ9iodclv6caCIXL7qFS8KBePoxP2a4etk2fVoy9Uw_BQEP3NEO7l_yNemfqQE2",
  fileStorage: "/public/images"
};