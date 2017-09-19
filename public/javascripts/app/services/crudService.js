module.exports = angular.module("angularjsSeed").factory("crudservice", ["$q", "NgTableParams", "$http", "url", function ($q, NgTableParams, $http, url) {

    return {

        newNgTableParams: function (data) {
            return new NgTableParams({}, { dataset: data });
        },

        fetchColumns: [{ field: "place", visible: true }, { field: "value", visible: true }],

        getEntity: function () {
            return {
                name: "expense",
                fields:
                [
                    { type: "text", name: "place", label: "Lugar", required: true, data: "" },
                    { type: "text", name: "value", label: "Monto", required: true, data: "" }/*,
                    { type: "radio", name: "color_id", label: "Colors", options: [{ id: 1, name: "orange" }, { id: 2, name: "pink" }, { id: 3, name: "gray" }, { id: 4, name: "cyan" }], required: true, data: "" },
                    { type: "email", name: "emailUser", label: "Email", required: true, data: "" },
                    { type: "password", name: "pass", label: "Password", min: 6, max: 20, required: true, data: "" },
                    { type: "select", name: "teacher_id", label: "Teacher", options: [{ name: "Mark" }, { name: "Claire" }, { name: "Daniel" }, { name: "Gary" }], required: true, data: "" },
                    { type: "checkbox", name: "car_id", label: "Cars", options: [{ id: 1, name: "bmw" }, { id: 2, name: "audi" }, { id: 3, name: "porche" }, { id: 4, name: "jaguar" }], required: true, data: "" }*/
                ]
            };
        },

        fetchAll: function () {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(url + "apiv1/notes").then(function (response) {
                defered.resolve(response.data);
            });
            return promise;
        },

        remove: function (item) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.delete(url + "apiv1/notes/" + item.id, item).then(function (response) {
                defered.resolve(response.data);
            });
            return promise;
        },

        edit: function (item) {
            console.log("edit " + JSON.stringify(item));
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(url + "apiv1/notes/" + item.id).then(
                function (response) {
                    defered.resolve(response.data);
                });
            return promise;
        },

        add: function (item) {
            console.log("add " + JSON.stringify(item));
            return $http.post(url + "apiv1/notes", item);
        },
        update: function (item) {
            console.log("update " + JSON.stringify(item));
            var defered = $q.defer();
            var promise = defered.promise;
            $http.put(url + "apiv1/notes/" + item.id, item).then(
                function (response) {
                    defered.resolve(response.data);
                });
            return promise;
        }

    };

}]);