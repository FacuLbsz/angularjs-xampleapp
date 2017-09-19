module.exports = angular.module("angularjsSeed").controller("HomeController", [
    "$rootScope",
    "$scope",
    "$http",
    "url",
    "$mdSidenav",
    function ($rootScope, $scope, $http, url, $mdSidenav) {

        $scope.openLeftMenu = function () {
            $mdSidenav("left").toggle();
        };

        $http.defaults.headers.common["x-access-token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBhc3N3b3JkIjoicGFzc3dvcmQiLCJ1c2VyIjoidXNlciIsImlkIjoiNTliOThkZGE3ZTBmOTIwMDEyN2U2YTVmIn0sImlhdCI6MTUwNTc3MDE0OSwiZXhwIjoxNTA1NzcxNTg5fQ.IWff0NKGyp4QDfs07qLpA58W9sva9chaRdp8Vj7H0f0";

        var self = this;
    }

]);