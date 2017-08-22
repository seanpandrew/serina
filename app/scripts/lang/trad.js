'use strict'

angular.module('serinaApp').directive('trad', function ($routeParams, $i18next, DataAccessor, DataManager, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/trad.html',
    link: function (scope) {

      scope.addTrad = function () {
        scope.listTrad.push({key: '', trad: '', save: false})
      }

      scope.sendTrad = function (trad, ev) {
        ev.stopPropagation()
        if (!trad.save) {
          if (trad.key !== '' && trad.trad !== '' && !DataManager.find(scope.listTrad, trad.key, 'trad')) {
            DataAccessor.addTrad(scope.currentLang, $routeParams.group, trad).then(function () {
              trad.save = true
              Toast.showCustomToast('check', $i18next.t('commons.toast.addTrad.success', {trad: trad.key}), 'good')
            }, function (response) {
              Toast.showCustomToast('warning', $i18next.t('commons.toast.addTrad.fail', {trad: trad.key}), 'fail')
              console.error('Error while adding new translation', response)
            })
          } else {
            Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addTrad.tradExist', {trad: trad.key}), 'medium')
            scope.listTrad = DataManager.remove(scope.listTrad, trad)
          }
        } else {
          // MAJ TRAD
          console.log('Maj trad ', trad)
        }
      }

      scope.deleteTrad = function (trad, ev) {
        ev.stopPropagation()
        if (!trad.save) {
          scope.listTrad = DataManager.remove(scope.listTrad, trad)
        } else {
          DataAccessor.deleteTrad(scope.currentLang, $routeParams.group, trad).then(function () {
            scope.listTrad = DataManager.remove(scope.listTrad, trad)
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteTrad.success', {trad: trad.key}), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteTrad.fail', {trad: trad.key}), 'fail')
            console.error('Unable to delete translation', response)
          })
        }
      }

    }
  }
})
