'use strict'

angular.module('serinaApp').directive('basicSettings', function ($rootScope, $mdColorPalette, LocalStorage) {
  return {
    restrict: 'E',
    templateUrl: 'views/settings/basic-settings.html',
    link: function (scope) {

      scope.displayFormat = [
        { label: 'card', icon: 'view_agenda' },
        { label: 'list', icon: 'list' }
      ]

      scope.changeDisplayFormat = function (format) {
        $rootScope.settings.selectedDisplayFormat = format
        LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
      }

      scope.languages = [
        { code: 'en'},
        { code: 'fr'}
      ]

      scope.changeLocaleOfApplication = function (language) {
        $rootScope.settings.locale = language
        window.i18next.changeLanguage($rootScope.settings.locale)
        LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
      }

      scope.colors = ['indigo', 'green', 'orange', 'purple', 'brown', 'grey']

      scope.changeColor = function (color) {
        $rootScope.settings.theme = color
        LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
      }

    }
  }
})
