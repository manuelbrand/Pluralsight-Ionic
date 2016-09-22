(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamDetailCtrl', ['$stateParams', '$ionicPopup', 'eliteApi', 'myTeamsService', TeamDetailCtrl]);

    function TeamDetailCtrl($stateParams, $ionicPopup, eliteApi, myTeamsService) {
        var vm = this,
            team = null,
            leagueData = null;

        vm.teamId = Number($stateParams.id);


        eliteApi.getLeagueData().then(function (callback) {
            var data = callback;
            console.log(data);

            // New snippet
            team = _.chain(data.teams)
                .map("divisionTeams").flatten()
                .find({"id": vm.teamId})
                .value();
            console.log("Team", team);

            setTeam(team);

            // Own snippet
            // var flattenDivision = _.map(data.teams, function(team) {
            //     return team.divisionTeams;
            // });
            // var team = _.find(_.flatten(flattenDivision), {id: vm.teamId});

            vm.teamName = team.name;

            vm.games = _.chain(data.games)
                .filter(isTeamInGame)
                .map(function (item) {
                    var isTeam1 = (item.team1Id === vm.teamId ? true : false);
                    var opponentName = isTeam1 ? item.team2 : item.team1;
                    var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
                    return {
                        gameId: item.id,
                        opponent: opponentName,
                        time: item.time,
                        location: item.location,
                        locationUrl: item.locationUrl,
                        scoreDisplay: scoreDisplay,
                        homeAway: (isTeam1 ? "vs." : "at")
                    };
                })
                .value();

            // Original snippet
            // vm.teamStanding = _.chain(data.standings).value();
            // .flatten("divisionStandings")
            // .find({ "teamId": vm.teamId })
            // .value();

            // New snippet
            vm.teamStanding = _.chain(data.standings)
                .map("divisionStandings").flatten()
                .find({"teamId": vm.teamId})
                .value();

            // Own snippet
            // var flattenStanding = _.map(data.standings, function(team) {
            //     return team.divisionStandings;
            // });
            // vm.teamStanding = _.find(_.flatten(_.flatten(flattenStanding), {id: vm.teamId}))
        });

        vm.following = false;
        console.log("Team2", team);

        vm.toggleFollow = function () {
            if (vm.following) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Unfollow?',
                    template: 'Are you sure you want to unfollow?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        vm.following = !vm.following;
                        myTeamsService.unfollowTeam(team.id);
                    }
                });
            } else {
                vm.following = !vm.following;
                console.log("team3",team);
                myTeamsService.followTeam({ id: team.id, name: team.name, leagueId: leagueData.id, leagueName: leagueData.name });
            }
        };


        function isTeamInGame(item) {
            return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        }

        function setTeam(teamObj) {
            team = teamObj;
        }

        function getScoreDisplay(isTeam1, team1Score, team2Score) {
            if (team1Score && team2Score) {
                var teamScore = (isTeam1 ? team1Score : team2Score);
                var opponentScore = (isTeam1 ? team2Score : team1Score);
                var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
                return winIndicator + teamScore + "-" + opponentScore;
            }
            else {
                return "";
            }
        }
    };
})();
