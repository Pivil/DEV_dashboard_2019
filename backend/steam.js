const SteamAPI = require("steamapi");
const steam_2 = new SteamAPI("B90F6E491B41ED72034BFE0DC74B90F7");

async function getSteamLvl(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserLevel(id).then(data => resolve(data));
  });
}

async function getSteamFriends(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserFriends(id).then(data => resolve(data));
  });
}

async function getUserInfo(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserSummary(id).then(data => {
      resolve(data);
    });
  });
}

async function getUserRecentGames(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserRecentGames(id).then(data => {
      resolve(data);
    });
  });
}

async function getUserOwnedGames(id) {
  return new Promise(function (resolve, reject) {
    steam_2.getUserOwnedGames(id).then(data => {
      resolve(data);
    });
  });
}

function cleanSum(summary) {
  delete summary.gameServerIP;
  delete summary.gameServerSteamID;
  delete summary.gameExtraInfo;
  delete summary.gameID;
  return summary;
}

function compare(a, b) {
  return b.playTime - a.playTime;
}

async function getSteamInfo(profile) {
  return new Promise(function (resolve, reject) {
    steam_2.resolve("https://steamcommunity.com/id/" + profile).then(id => {
      var steamData = Object;
      steam_2.getUserSummary(id).then(summary => {
        getSteamLvl(summary.steamID).then(lvl => {
          summary.level = lvl;
          getSteamFriends(id).then(friends => {
            summary.friends = 0;
            friends.map((value, index) => {
              summary.friends++;
            });
            getUserRecentGames(id).then(games => {
              summary.games = [];
              games.map((value, index) => {
                var game = {
                  name: value.name,
                  img: value.logoURL,
                  playTime: value.playTime
                };
                summary.games.push(game);
                return summary;
              });
              summary.mostPlayed_recent = summary.games;
              summary.games.sort((a, b) => compare(a, b));
              getUserOwnedGames(id).then(data => {
                summary.ownedGames = 0;
                summary.gamingTime = 0;
                summary.allGames = [];
                data.map((value, index) => {
                  var game = {
                    name: value.name,
                    img: value.logoURL,
                    playTime: value.playTime
                  };
                  summary.allGames.push(game);
                  summary.gamingTime += game.playTime;
                  summary.ownedGames++;
                  return summary;
                });
                summary.allGames.sort((a, b) => compare(a, b));
                summary = cleanSum(summary);
                resolve(summary);
              });
            });
          });
        });
      });
    });
  });
}

module.exports = {
  getSteamInfo: getSteamInfo,
  getSteamLvl: getSteamLvl,
  getUserInfo: getUserInfo
};
