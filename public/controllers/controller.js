var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    $scope.ticket = {};
    $scope.statusList = ["New","Open","Closed"];
    $scope.area = ["a1","a2","a3"];
    $scope.ticket.assignedTo = undefined;
    $scope.selectedArea = "a1";

var refresh = function() {
  $http.get('/ticketlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.ticketlist = response;
    $scope.ticket = "";
  });
};
refresh();

$scope.logTicket = function() {
  if($scope.ticket.c_info === undefined || $scope.ticket.createdBy === undefined){
    alert("Customer Information and createdBy should not be empty");
    return;
  }
  if($scope.ticket.status === "Closed" && $scope.ticket.assignedTo === undefined){
    alert("Status should not be set closed until it assigned to someone");
    return;
  }else if($scope.ticket.status !== "Closed" && $scope.ticket.assignedTo !== undefined){
    alert("Status should be closed when it is assigned to someone");
    return;
  }
  console.log($scope.ticket);
  if($scope.ticket.assignedTo !== undefined){
      $scope.ticket.assignedTo = $scope.ticket.assignedTo.name;
  }
  $scope.ticket.areaBelongs = $scope.selectedArea;
  $http.post('/ticketlist', $scope.ticket).success(function(response) {
    console.log(response);
    refresh();
  });
};  

$scope.$watch("ticket.assignedTo",function(val){
  if(val !== undefined){
    $scope.ticket.status = "Closed";
  }
});

$scope.update = function(id,ind) {
  console.log($scope.assignedTo,$scope.status);
  if($scope.status[ind] === "Closed" && $scope.assignedTo[ind] === undefined){
    alert("Status should not be set closed until it assigned to someone");
    return;
  }else if($scope.status[ind] !== "Closed" && $scope.assignedTo[ind] !== undefined){
    alert("Status should be closed when it is assigned to someone");
    return;
  }
  $scope.ticketEdit = "";
  $scope.ticketlist[ind].assignedTo = $scope.assignedTo[ind].name;
  $scope.ticketlist[ind].status = $scope.status[ind];
  $scope.assignedTo[ind] = undefined;
  $scope.status[ind] = undefined;
  console.log($scope.ticketlist[ind]);
  $http.put('/ticketlist/' + id, $scope.ticketlist[ind]).success(function(response) {
    refresh();
  })
};
$http.get("data/operators.json")
    .success(function(response) {
      console.log(response);
      $scope.operators = response.operators;
    });

}]);