const fetch = require("node-fetch");


async function getNotes(city) {
    return new Promise(function (resolve, reject) {
        let url =
            "https://intra.epitech.eu/auth-72fd8f35d58584abc436b48a00366649b3ab685a/user/remi.pontonnier@epitech.eu/notes?format=json"
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(json => {
                var data = [];
                var totalCredit = 0;
                var obtenus = 0;
                json.modules.forEach(module => {
                    module.credits = (module.title == "T6 - Part-time job" ? 25 : module.credits);
                    data.push({
                        moduleName: module.title,
                        grade: module.grade,
                        credits: module.credits
                    })
                    totalCredit += module.credits
                    if (module.grade != "-") {
                        obtenus += module.credits;
                    }

                });
                // console.log(json);
                data["totalCredit"] = totalCredit;
                data["creditObtenus"] = obtenus;
                resolve(data);
            });
    });
}

module.exports = {
    getNotes: getNotes
};


