var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
    $scope.gridOptions = {
        enableFiltering: true,
        flatEntityAccess: true,
        showGridFooter: true,
        fastWatch: true
    };

    $scope.someProp = '{{entity.Id}}',
    $scope.showMe = function () {
        alert($scope.someProp);
};

    $scope.gridOptions.columnDefs = [
     { name: 'Id' ,
     cellTemplate: '<button class="btn primary" ng-click="grid.appScope.showMe()">{{row.entity.Id}}</button>'     },
     { name: 'Contact' },
     { name: 'Jurisdiction' },
     { field: 'ClientNumber' }
     
            //cellTemplate: '<button class="btn primary" ng-click="grid.appScope.showMe()">Click Me</button>'}
    ];

    $http.get('http://nl-svtsp02:2345/api/clients')
    .success(function (data) {
        for (var i = 0; i < 6; i++) {
            data = data.concat(data);
        }
        $scope.gridOptions.data = data;
    });

    $scope.toggleFlat = function () {
        $scope.gridOptions.flatEntityAccess = !$scope.gridOptions.flatEntityAccess;
    }
}]);