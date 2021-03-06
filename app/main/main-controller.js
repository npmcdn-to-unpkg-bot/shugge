(function(){
    angular.module('TimeWaste')
    .controller('MainController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
        
        if(localStorage['User-Data'] !== undefined){
            $scope.user = JSON.parse(localStorage['User-Data']);
            console.log($scope.user);
        }
        
        $scope.sendWaste = function(event){
            if(event.which === 13){
                var request = {
                        user: $scope.user.username || $scope.user.email,
                        userId: $scope.user._id,
                        userImage: $scope.user.image,
                        content: $scope.newWaste
                }
                
                $http.post('api/waste/post', request).success(function(response){
                    console.log(response);
                    $scope.wastes = response;
                }).error(function(error){
                    console.log(error);
                })
            }
        };
        
        function getWastes(initial){
            $http.get('api/waste/get').success(function(response){
                if(initial){
                    $scope.wastes = response;
                } else {
                    if (response.length > $scope.wastes.length){
                    $scope.incommingWastes = response;
                    }
                }
            })
        };
        
        $interval(function(){
            getWastes(false);
            if($scope.incommingWastes){
            $scope.difference = $scope.incommingWastes.length - $scope.wastes.length;
            }
            console.log('this is working:)');
        }, 5000);
        
        $scope.setNewWastes = function(){
            $scope.wastes = angular.copy($scope.incommingWastes);
            $scope.incommingWastes = undefined;
        }
             
        //Init
        getWastes(true);
        
    }]);
}());