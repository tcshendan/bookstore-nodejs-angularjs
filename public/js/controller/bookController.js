var bookApp = angular.module('bookApp', []);

bookApp.controller('bookController', ['$scope', '$http', function($scope, $http) {
  $scope.book = {};
  $scope.books = [];

  $http.get('/book.json')
    .success(function(data, status, headers, config) {
      $scope.books = data;
    });

  $scope.saveBook = function() {
    $http({
      method: $scope.book.id?'PUT':'POST',
      url: '/addBook',
      data: $scope.book
    }).success(function(data, status, headers, config) {
      console.log(data);
      if(data.success === 1) {
        alert(data.message);
        if(!$scope.book.id) {
          $scope.books.push(data.book);
          $scope.clearBook();
        }
      }
    });
  }

  $scope.clearBook = function () {
    $scope.book = {};
  }

  $scope.editBook = function(selectBook) {
    $scope.book = selectBook;
  }

  $scope.delBook = function(id, index) {
    $http.delete('/addBook', {params: {id: id}})
      .success(function(data, status, headers, config) {
        console.log(data);
        if(data.success === 1) {
          alert(data.message);
          $scope.books.splice(index, 1);
        }
      });
  }

}]);
