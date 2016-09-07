(function(){
    angular.module('TimeWaste', ['ui.router', 'ngFileUpload'])
            .config(function($stateProvider, $urlRouterProvider){
        
            $urlRouterProvider.otherwise('/'); // Takes you back to url / if no other url is there.    
        
            $stateProvider
                .state('signUp', {
                url: '/signup',
                templateUrl: 'app/signup/signup.html',
                controller: 'SignUpController'
                })
                
                .state('editProfile', {
                url: '/edit-profile',
                templateUrl: 'app/profile/edit-profile-view.html',
                controller: 'EditProfileController'
                })
            
                .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController'
                })
            })
       
}());