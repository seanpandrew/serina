'use strict'

angular.module('serinaApp').controller('LangCtrl', function ($rootScope, $scope, $routeParams, DataAccessor, Breadcrumb) {
  $rootScope.breadcrumb = Breadcrumb.init($routeParams.lang.toUpperCase(), '/lang/' + $routeParams.lang.toLowerCase())
  var originatorEv

  var getListGroupsAndTrad = function (content, groups) {
    $scope.listGroups = []
    $scope.listTrad = []

    if (!angular.isUndefined(groups)) {
      groups = groups.replace(/\//g, '.')
      content = eval('content.' + groups)
    }

    angular.forEach(content, function (trad, key) {
      if (angular.isObject(trad)) {
        $scope.listGroups.push(key)
      } else {
        $scope.listTrad.push({key: key, trad: trad, save: true})
      }
    })
  }

  $scope.btnBack = function () {
    window.history.back()
  }

  $scope.openMenu = function ($mdMenu, ev) {
    originatorEv = ev
    $mdMenu.open(ev)
  }

  $scope.currentLang = $routeParams.lang.toLowerCase()
  DataAccessor.openLang($scope.currentLang).then(function (response) {
    getListGroupsAndTrad(response.data, $routeParams.group)
    $rootScope.breadcrumb = Breadcrumb.build($rootScope.breadcrumb, $scope.currentLang, $routeParams.group)
  }, function (response) {
    console.error('Error on open language ' + $scope.currentLang, response)
  })
})
