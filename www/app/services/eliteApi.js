(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', '$q', eliteApi]);

  function eliteApi($http, $q) {

    var currentLeagueId;

    function getLeagues(){
      var deferred = $q.defer();

      $http.get('http://elite-schedule.net/api/leaguedata')
          .then(function onSuccess(response) {
                deferred.resolve(response.data)
              }, function onError() {
                console.log("getLeagues - FAIL");
            deferred.reject()
              }
          )
      return deferred.promise;
    }

    function getLeagueData(){
      var deferred = $q.defer();

      $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
          .then(function onSucces(response) {
            console.log(response);
            deferred.resolve(response.data)
          }, function onError() {
            console.log("getLeagueData - FAIL");
            deferred.reject()
              }
          )
      return deferred.promise;
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
