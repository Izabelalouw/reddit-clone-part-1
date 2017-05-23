(function() {
  'use strict'

  angular.module('app')
    .component('houseShow', {
      controller: function (houseService, $stateParams) {
        const vm = this

        vm.$onInit = function () {
          const houseId = $stateParams.id
          vm.house = houseService.findById(houseId)
        }

      },
      template: `
        <h1>{{$ctrl.house.name}}</h1>

        <p>{{$ctrl.house.address}}</p>

          <a ui-sref="home">Return home page</a>
      `
    })

}());
