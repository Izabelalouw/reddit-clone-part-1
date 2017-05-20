angular.module('app')
  .controller("ShowExpensesController", ShowExpensesController)

  function ShowExpensesController($http) {
    const vm = this

    vm.$onInit = function() {
      $http.get('/api/expenses').then(res => {
        vm.expenses = res.data
      })
    }

    vm.addExpense = function(){
      $http.post('/api/expenses', vm.newExpense).then(res => {
        $http.get('/api/expenses').then(res => {
          vm.expenses = res.data
        })
      })
    }

    vm.deleteExpense = function(id) {
      console.log(id);
      $http.delete('/api/expenses/' + id ).then(res => {
        $http.get('/api/expenses').then(res => {
          vm.expenses = res.data
          console.log(vm.expenses);
        })
      })
    }

    vm.selected = 1
    vm.setShow = function(num){
      vm.selected = num
    }

    vm.isSet = function(num) {
      return vm.selected === num
    }

    vm.edited = -1
    vm.editExpense = function(id) {
      vm.selected = 3
      vm.edited = id
    }

    vm.updateExpense = function() {
      $http.patch('/api/expenses/' + vm.edited, vm.editedExpense).then(res => {
        $http.get('/api/expenses').then(res => {
          vm.expenses = res.data
        })
      })
    }
  }
