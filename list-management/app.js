(function() {
  'use strict'

  angular.module('app', [])
    .component('cart', {
      controller: function(){
        const vm = this
        let items = [
          {
            name: "Banana",
            quantity: 3
          },
          {
            name: "Apples",
            quantity: 5
          },
          {
            name: "Oranges",
            quantity: 8
          }
        ]
        vm.items = items
        vm.addItem = function(){
          items.push(vm.newItem)
          delete vm.newItem
        },
        vm.deleteItem = function (eve, item){
          eve.preventDefault()
          vm.items.splice(vm.items.indexOf(item), 1)
        }
      },
      template: `<form ng-submit="$ctrl.addItem()">
        <p>
          <label for="name">Name</label>
          <input  ng-model="$ctrl.newItem.name" id="name">
        </p>
        <p>
          <label for="quantity">Quantity</label>
          <input ng-model="$ctrl.newItem.quantity" id="quantity">
        </p>
        <p>
          <button type="submit">Add Item</button>
        </p>
      </form>

      <div  ng-repeat="item in $ctrl.items" class="item">
        {{item.name}} {{item.quantity}}
        <a href="#" ng-click="$ctrl.deleteItem($event, item)">Delete</a>
      </div>`
    })

}());
