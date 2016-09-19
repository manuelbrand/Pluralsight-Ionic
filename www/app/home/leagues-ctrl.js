(function () {
  'use strict';

  angular.module('eliteApp').controller('LeaguesCtrl', ['$state', 'eliteApi', LeaguesCtrl]);

  function LeaguesCtrl($state, eliteApi) {
    var vm = this;

    eliteApi.getLeagues().then(function(callback) {
      vm.leagues = callback;
    });


    vm.selectLeague = function(leagueId) {
      eliteApi.setLeagueId(leagueId);
      $state.go("app.teams");
    };

  };
})();
