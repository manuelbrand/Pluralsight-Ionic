(function () {
    'use strict';

    angular.module('eliteApp').factory('myTeamsService', ['CacheFactory', myTeamsService]);

    function myTeamsService(CacheFactory) {
        var self = this;

        self.myTeamsCache = CacheFactory.get("myTeamsCache");

        function followTeam(team) {
            self.myTeamsCache.put(team.id, team);
        }

        function unfollowTeam(teamId) {
            self.myTeamsCache.remove(teamId.toString());
        }

        function getFollowedTeams() {
            var teams = [],
                keys = self.myTeamsCache.keys();

            for (var i = 0; i < keys.length; i++) {
                var team = self.myTeamsCache.get(key[i]);
                team.push(team);
            }
            return teams;
        }

        function isFollowingTeam(teamId) {
            return self.myTeamsCache.get(teamId);
        }

        return {
            followTeam: followTeam,
            unfollowTeam: unfollowTeam,
            getFollowedTeams: getFollowedTeams,
            isFollowingTeam: isFollowingTeam
        }
    }

})();