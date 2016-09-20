(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'CacheFactory', eliteApi]);

  function eliteApi($http, $q, $ionicLoading, CacheFactory) {

    var currentLeagueId;

      self.leaguesCache = CacheFactory.get("leaguesCache");
      self.leaguesDataCache = CacheFactory.get("leagueDataCache");

    function getLeagues(){
      var deferred = $q.defer(),
          cacheKey= "leagues",
          leaguesData = self.leaguesCache.get(cacheKey);

        if (leaguesData) {
            console.log("(getLeagues)Got data from cache", leaguesData);
            deferred.resolve(leaguesData);
        } else {
            $http.get('http://elite-schedule.net/api/leaguedata')
                .then(function onSuccess(response) {
                        console.log("(getLeagues)Got data from HTTP");
                        self.leaguesCache.put(cacheKey, response.data);
                        deferred.resolve(response.data)
                    }, function onError(err) {
                        console.log("HTTP getLeagues failed: " + err);
                        deferred.reject()
                    }
                );
        }
      return deferred.promise;
    }

    function getLeagueData(){
      var deferred = $q.defer(),
          cacheKey = "leagueData-" + currentLeagueId,
          leagueData = self.leaguesDataCache.get(cacheKey);

        if (leagueData) {
            console.log("(getLeagueData)Got data from cache", leagueData);
            deferred.resolve(leagueData);
        } else {
            $ionicLoading.show({ template: 'Loading...'});

            $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
                .then(function onSuccess(response) {
                        console.log("(getLeagueData)Got data from HTTP");
                        self.leaguesDataCache.put(cacheKey, response.data)
                        $ionicLoading.hide();
                        deferred.resolve(response.data)
                    }, function onError(err) {
                        console.log("HTTP getLeagueData failed: " + err);
                        $ionicLoading.hide();
                        deferred.reject()
                    }
                );
        }
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
