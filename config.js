//user: MUSEO
// Access Key ID:
// AKIAJYWVROWVRCBYLD3A
// Secret Access Key:
// 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

var db = "mongodb://observatorio:admin@ds035633.mongolab.com:35633/observatorio_urbano";

console.log("uri is "+process.env.MONGO_URI);
module.exports = {
  database: process.env.MONGO_URI || 'localhost',
  bingKey: "ArZ9iodclv6caCIXL7qFS8KBePoxP2a4etk2fVoy9Uw_BQEP3NEO7l_yNemfqQE2",
  fileStorage: "/public/images"
};