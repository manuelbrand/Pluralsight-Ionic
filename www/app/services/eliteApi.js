(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', eliteApi]);

  function eliteApi($http) {

    var leagues;
    var currentLeagueId;

    function getLeagues(callback){
      $http.get('http://elite-schedule.net/api/leaguedata')
          .then(function onSuccess(data) {
                callback(data.data);
              }, function onError(data) {
                console.log("error: " + data);
              }
          )
    }

    function getLeagueData(callback){
      $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
          .then(function onSucces(data) {
            console.log(data);
            callback(data.data)
          }, function onFail() {
            console.log("getLeagueData - FAIL");
              }
          )
    }

    function setLeagueId(leagueId) {
      currentLeagueId = leagueId;
    }

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };
  };
})();
