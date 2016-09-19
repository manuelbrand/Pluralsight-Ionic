(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', eliteApi]);

  function eliteApi($http, $q, $ionicLoading) {

    var currentLeagueId = 1;

    function getLeagues(){
      var deferred = $q.defer();

      $http.get('http://elite-schedule.net/api/leaguedata')
          .then(function onSuccess(response) {
                console.log("getLeagues - SUCCESS")
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


      $ionicLoading.show({ template: 'Loading...'})

      $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
          .then(function onSucces(response) {
            console.log("getLeagueData - SUCCESS");
            $ionicLoading.hide();
            deferred.resolve(response.data)
          }, function onError() {
            console.log("getLeagueData - FAIL");
            $ionicLoading.hide();
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
