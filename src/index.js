import { module, controller } from 'angular';
import 'bootstrap/dist/css/bootstrap.min.css';
import uniqid from 'uniqid';

module('appMessage', [])
  .controller('appCtrl', ($scope, $http) => {

      $scope.students = [];

      $scope.select = 'firstName';

      $http.get('/students.json')
        .then(function(result) {
          $scope.students = result.data.students;
        })
        .catch((result) => {
          console.log(`${result.status} errors`);
        });

      $scope.handleAddStudent = () => {
        $scope.students.push({
          id: uniqid(),
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          birthday: $scope.birthday,
        });
        refreshInput();
      };

      const refreshInput = () => {
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.birthday = null
      };

      $scope.handleStudentRemove = (id) => {
        $scope.students = $scope.students.filter(item => item.id !== id);
      };
    },
  );