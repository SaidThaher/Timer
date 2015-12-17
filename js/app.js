
var app = angular.module("timerApp", []);

app.controller("timerController", ["$scope", "$interval", function($scope, $interval) {

 
 $scope.timeStatus = 0;
 $scope.startTime = 0;
 $scope.lapTime = 0;
 $scope.laps =[];
   
   
   $scope.startTimer = function() {
    $scope.startTime = $scope.timeStatus;
    
    
    if($scope.timeRun){
      $interval.cancel($scope.timeRun);
    }

    $scope.timeUpdate = function(){
        $scope.timeStatus++;
    }
    $scope.timeRun = $interval($scope.timeUpdate,10);
  }


  $scope.stopTimer = function(){
  	if($scope.timeRun){
  		$interval.cancel($scope.timeRun);
  		$scope.startTime = $scope.timeStatus;
  	}
  	
  	console.log($scope.timeStatus /100);
  	$scope.result = $scope.timeStatus;
  }
  
  $scope.resetTimer = function(){
    $scope.timeStatus = 0;
    $scope.laps = [];
    $interval.cancel($scope.timeRun);
  }

  $scope.lapTimer = function(){
  	//console.log("Start Time 0: " + $scope.startTime);
  	
  	$scope.lapTime = $scope.timeStatus - $scope.startTime;
  	//console.log("Status Time : " + $scope.timeStatus);
  	//console.log($scope.lapTime + " = " + $scope.timeStatus + " - " +  $scope.startTime);
  	
  	$scope.startTime = $scope.timeStatus;
  	//console.log("Start Time : " + $scope.startTime);
  	
  	$scope.laps.push($scope.lapTime);
  	//console.log("=========================");
  	
  }

  $scope.getTotal = function(){
  	var total = 0;
  	if ($scope.laps.length == 0){
  		total = 0;
  	
  }else{
  	for (var i = 0; i < $scope.laps.length; i++){
  		total += $scope.laps[i];
  	}
  	return total/100 + " Sec";
  }
}

}]);

app.filter('timerFilter', function () {
	
  return function (time) {

  	var ms = time ;
  	var seconds = Math.floor(ms / 100) % 60;
  	var minutes = Math.floor(ms / 6000);
  	var hours = Math.floor(ms / 360000) ;
   
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    return hours+':'+minutes+':'+seconds+':'+(ms%100);
    
  }
});

