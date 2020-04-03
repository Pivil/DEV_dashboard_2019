const SteamAPI = require('steamapi');
const steam_2 = new SteamAPI('B90F6E491B41ED72034BFE0DC74B90F7');

async function getSteam() {
  return new Promise(function (resolve, reject) {
    steam_2.resolve('https://steamcommunity.com/id/pivil').then(id => {
      console.log(id);
      steam_2.getUserSummary(id).then(summary => {
        console.log(summary);
        resolve(summary)
      });
    });
  })

}

module.exports = {
  getSteam: getSteam
}