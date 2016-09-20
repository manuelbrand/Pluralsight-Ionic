(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', '$scope', TeamsCtrl]);

    function TeamsCtrl(eliteApi, $scope) {
        var vm = this;


        $scope.$on('$ionicView.enter', function() {
            eliteApi.getLeagueData().then(function (callback) {
                console.log(callback.teams);
                vm.teams = callback.teams;
            });
        });

        // eliteApi.getLeagueData().then(function (callback) {
        //     console.log(callback.teams);
        //     vm.teams = callback.teams;
        // });
    }
})();