(function() {
    'use strict';

    angular.module('eliteApp').controller('StandingsCtrl', ['eliteApi', StandingsCtrl]);

    function StandingsCtrl(eliteApi) {
        var vm = this;

        eliteApi.getLeagueData(function(callback) {
            vm.standings = callback.standings;
        });

    }
})();