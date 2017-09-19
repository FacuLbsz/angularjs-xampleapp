module.exports = angular.module("angularjsSeed")
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "__templateDir",
        function ($stateProvider, $urlRouterProvider, $locationProvider, __templateDir) {
            console.log("configurating app");

            $urlRouterProvider.otherwise("/home");

            $stateProvider.state("home", {
                url: "/home",
                templateUrl: __templateDir + "/home.html",
                controller: "HomeController"

            }).state("home.expenses", {
                url: "/expenses",
                templateUrl: __templateDir + "/expenses.html",
                controller: function () { }

            });

            $locationProvider.html5Mode(true);
        }]);