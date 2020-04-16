const MongoClient = require("mongodb").MongoClient;

const uri =
    "mongodb+srv://forTest:carotte1802@cluster0-glvo1.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var getUserByToken = token => {
    return new Promise(function(resolve, reject) {
        client.connect(err => {
            const collection = client.db("epitech").collection("dashboard");

            collection.find({ gapi_token: token }).toArray(function(err, docs) {
                console.log("FOUND ONE USER");
                console.log(docs);
            });
        });
    });
};

var getUserByMail = (mail, password) => {
    return new Promise(function(resolve, reject) {
        client.connect(err => {
            const collection = client.db("epitech").collection("dashboard");

            collection
                .find({ username: mail, password: password })
                .toArray(function(err, docs) {
                    console.log("FOUND ONE USER");
                    console.log(docs);
                });
        });
    });
};

module.exports = {
    getUserByToken: getUserByToken,
    getUserByMail: getUserByMail
};