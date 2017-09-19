var angular = require("./app.dependencies").angular;

var app = angular.module("angularjsSeed", ["ngMaterial", "ui.router", "ngTable", "ngMessages"]);

var url = "https://xampleapp.herokuapp.com/";
var __templateDir = "javascripts/app/template";

app.constant("url", url);
app.constant("__templateDir",__templateDir);

app.run(["$state", "$stateParams", "$rootScope", function ($state, $stateParams, $rootScope) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams,
        fromState, fromParams) {
        console.log("State Change: transition begins!");
        // redirectTo implementation
        if (toState.redirectTo) {
            event.preventDefault();
            $state.go(toState.redirectTo);
        }
    });

    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams,
        fromState, fromParams) {
        $(document).ready(function () {
            var toolbarTitle = $("#toolbarTitle");
            if (toState.name == "home") {
                toolbarTitle.html("Home");
            } else if (toState.name == "home.expenses") {
                toolbarTitle.html("Gastos");
            }
        });
        console.log("State Change: State change success!");
    });
}]);

require("./app.routes");
require("./components/index");
require("./services/index");
