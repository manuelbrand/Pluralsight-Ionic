(function() {
    'use strict';

    angular.module('eliteApp').controller('TeamsCtrl',['eliteApi', TeamsCtrl]);

    function TeamsCtrl(eliteApi) {
        var vm = this;

        eliteApi.getLeagueData().then(function(callback) {
            vm.teams = callback.teams;
        });


    }
})();