(function() {
    'use strict';

    angular.module('eliteApp').controller('GameCtrl', ['$stateParams', 'eliteApi', GameCtrl]);

    function GameCtrl($stateParams, eliteApi) {
        var vm = this;

        var gameId = Number($stateParams.id);
        eliteApi.getLeagueData().then(function(callback) {
            vm.game = _.find(callback.games, {"id": gameId});
        });

    }
})();