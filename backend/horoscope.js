const fetch = require("node-fetch");

async function getDaily(sign) {
    return new Promise(function (resolve, reject) {

        let url =
            "https://aztro.sameerkumar.website?sign=" + sign + "&day=today"
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(json => {
                resolve(json);
            });
    });



}

module.exports = {
    getDaily: getDaily
}