(function () {
  'use strict';

  angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'CacheFactory', eliteApi]);

  function eliteApi($http, $q, $ionicLoading, CacheFactory) {

    // Handle Caching
    self.leaguesCache = CacheFactory.get("leaguesCache");
    self.leaguesDataCache = CacheFactory.get("leagueDataCache");
    self.staticCache = CacheFactory.get("staticCache");

    self.leaguesCache.setOptions({
      onExpire: function (key, value) {
          getLeagues()
              .then(function onSuccess() {
                  console.log("Leagues Cache was automatically refreshed", new Date());
              }, function onError() {
                  console.log("(Leagues)Error getting data. Putting expired item back in the cache.", new Date());
                  self.leaguesCache.put(key, value);
              });
      }
    });

    self.leaguesDataCache.setOptions({
      onExpire: function (key, value) {
          getLeagueData()
              .then(function onSuccess() {
                  console.log("LeaguesData Cache was automatically refreshed", new Date());
              }, function onError() {
                  console.log("(LeaguesData)Error getting data. Putting expired item back in the cache.", new Date());
                  self.leaguesDataCache.put(key, value);
              });
      }
    });

    function setLeagueId(leagueId) {
        self.staticCache.put("currentLeagueId", leagueId);
        console.log("Current LeagueID:", leagueId);
    }

    function getLeagueId() {
        return self.staticCache.get("currentLeagueId");
    }

    // Handle HTTP-requests
    function getLeagues() {
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

    function getLeagueData() {
      var deferred = $q.defer(),
          cacheKey = "leagueData-" + getLeagueId(),
          leagueData = self.leaguesDataCache.get(cacheKey);

        if (leagueData) {
            console.log("(getLeagueData)Got data from cache", leagueData);
            deferred.resolve(leagueData);
        } else {
            $ionicLoading.show({ template: 'Loading...'});

            $http.get("http://elite-schedule.net/api/leaguedata/" + getLeagueId())
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



    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    };

  }
})();
