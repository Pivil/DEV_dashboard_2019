const SteamAPI = require('steamapi');
const steam_2 = new SteamAPI('B90F6E491B41ED72034BFE0DC74B90F7');

async function getSteamLvl(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserLevel(id).then(data => resolve(data))
  })
}

async function getSteamFriends(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserFriends(id).then(data => resolve(data))
  })
}

async function getUserInfo(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserSummary(id).then(data => {
      resolve(data)
    })
  })
}

async function getSteamInfo() {
  return new Promise(function (resolve, reject) {
    steam_2.resolve('https://steamcommunity.com/id/LuluLaGlue').then(id => {
      console.log(id);
      steam_2.getUserSummary(id).then(summary => {
        getSteamLvl(summary.steamID).then(lvl => {
          summary.level = lvl;
          getSteamFriends(id).then(friends => {
            summary.friends = 0;
            friends.map((value, index) => {
              summary.friends++;
            })
            resolve(summary)
          })
        })
      });
    });
  })
}



module.exports = {
  getSteamInfo: getSteamInfo,
  getSteamLvl: getSteamLvl,
  getUserInfo: getUserInfo
}