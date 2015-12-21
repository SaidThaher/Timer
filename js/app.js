
var app = angular.module("timerApp", []);

app.controller("timerController", ["$scope", "$interval", function($scope, $interval) {

 
 $scope.timeStatus = 0;
 $scope.startTime = 0;
 $scope.lapTime = 0;
 $scope.pausedTime = 0;
 $scope.laps =[];
 $scope.running = false;
 $scope.paused = false;
   
   
   $scope.startTimer = function() {
  
    if($scope.timeRun){
      $interval.cancel($scope.timeRun);
      $scope.running = true;
    }

    $scope.timeUpdate = function(){
        $scope.timeStatus++;
    }

    if(!$scope.paused){
	    $scope.startTime = $scope.timeStatus;

	    }else{
	    	$scope.stratTime = $scope.timeStatus - $scope.pausedTime;
	    	$scope.paused = false;
	    	$scope.running = true;
	    }

    $scope.timeRun = $interval($scope.timeUpdate,10);
    
  }

  $scope.stopTimer = function(){
  	if($scope.timeRun){
  	$interval.cancel($scope.timeRun);
  		
  	}
  	$scope.pausedTime = $scope.timeStatus - $scope.startTime;
  	$scope.running = false;
  	$scope.paused = true;
  	console.log($scope.timeStatus /100);
  	
  }
  
  $scope.resetTimer = function(){
  	if($scope.timeRun){
      $interval.cancel($scope.timeRun);
    }
    $scope.paused = false;
    $scope.running = false;
    $scope.timeStatus = 0;
    $scope.laps = [];
    
  }

  $scope.lapTimer = function(){
  	//console.log("Start Time 0: " + $scope.startTime);
  	if($scope.running){
  	
  	$scope.lapTime = $scope.timeStatus - $scope.startTime;
  	//console.log("Status Time : " + $scope.timeStatus);
  	//console.log($scope.lapTime + " = " + $scope.timeStatus + " - " +  $scope.startTime);
  	
  	$scope.startTime = $scope.timeStatus;
  	//console.log("Start Time : " + $scope.startTime);
  	
  	$scope.laps.push($scope.lapTime);
  	//console.log("=========================");
  	}
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

  	var ms      = Math.floor(time) % 100;
  	var seconds = Math.floor(time / 100) % 60;
  	var minutes = Math.floor(time / 6000) % 60;
  	var hours   = Math.floor(time / 360000) ;
   
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (ms      < 10) {ms      = "0"+ms;}
    
    return hours +':'+ minutes +':'+ seconds +':'+ ms;
    
  }
});

