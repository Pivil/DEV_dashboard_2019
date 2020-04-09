const PornHub = require('pornhub.js')
const pornhub = new PornHub()

async function search(name) {
    return new Promise(function (resolve, reject) {
        pornhub.search('Video', name).then(res => {
            resolve(res);
        });
    });
}

module.exports = {
    search: search
}