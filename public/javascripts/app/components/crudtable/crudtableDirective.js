module.exports = angular.module("angularjsSeed").directive("crudtable", function () {

    return {

        restrict: "E",
        scope: { crudServiceName: "@" },
        templateUrl: "javascripts/app/components/crudtable/crudtable.html",
        controller: function ($scope, $element, $attrs, $mdDialog, $q) {
            var crudservice = $element.injector().get($scope.crudServiceName);
            var self = this;

            self.columns = crudservice.fetchColumns;

            self.entity = crudservice.getEntity();

            self.getColumnByItem = function (column, item) {
                return item[column];
            };

            self.reload = function () {
                crudservice.fetchAll().then(function (items) {
                    self.items = items;
                    self.tableParams = crudservice.newNgTableParams(this.items);
                });
            };

            self.reload();


            self.remove = function (item) {
                crudservice.remove(item).then(function () {
                    self.reload();
                });
            };

            self.edit = function (item, $event) {
                crudservice.edit(item).then(function (res) {
                    //TODO SEGUIR AQUI RES = ITEM A EDITAR
                    self.showForm($event, res);
                });
            };

            self.update = function (item) {
                var defered = $q.defer();
                var promise = defered.promise;

                crudservice.update(item).then(function (res) {
                    self.reload();
                    defered.resolve(res);
                });
                return promise;
            };

            self.add = function (item) {
                var defered = $q.defer();
                var promise = defered.promise;

                crudservice.add(item).then(function (res) {
                    self.reload();
                    defered.resolve(res);
                });

                return promise;
            };

            self.showForm = function (ev, itemtoedit) {
                $mdDialog.show({
                    controller: FormController,
                    controllerAs: "formCtrl",
                    templateUrl: "app/components/crudtable/crudform.html",
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true, // Only for -xs, -sm breakpoints.,
                    locals: { entity: self.entity, itemtoedit: itemtoedit }
                })
                    .then(function (entity) {
                        console.log("Create new OBJECT\"" + JSON.stringify(entity) + "\".");

                        if (!entity.fields) {
                            console.log("No se encuentran campos para construir un objeto en: " + JSON.stringify(entity));
                            return;
                        }

                        var item = {};
                        entity.fields.forEach(function (element) {
                            item[element.name] = element.data;
                        }, this);

                        if (entity.id) {
                            item.id = entity.id;
                            self.update(item).then(function (response) {
                                entity.callback(null, response);
                            });
                        }
                        else {
                            self.add(item).then(function (response) {
                                entity.callback(null, response);
                            });
                        }

                    }, function () {
                        console.log("You cancelled the dialog.");
                    });
            };

            function FormController($scope, $mdDialog, entity, itemtoedit) {

                var self = this;
                self.entity = entity;

                if (itemtoedit && self.entity.fields) {
                    self.entity.fields.forEach(function (element) {
                        element.data = itemtoedit[element.name];
                    }, this);
                    self.entity.id = itemtoedit.id;
                }

                self.cancel = function () {
                    self.cleanDataModel();
                    $mdDialog.cancel();
                };

                self.create = function () {

                    self.entity.callback = function (err) {
                        if (err) {
                            console.log("No fue posible crear la entidad");
                            return;
                        }
                        self.cleanDataModel();

                    };

                    $mdDialog.hide(self.entity);
                };

                self.cleanDataModel = function () {
                    self.entity.fields.forEach(function (element) {
                        element.data = "";
                    }, this);
                    self.entity.id = null;
                    $scope.crudform.$setPristine();
                    $scope.crudform.$setUntouched();
                };

                self.isValidForm = function () {
                    return !$scope.crudform.$valid;
                };
            }
        },
        controllerAs: "crudtableCtrl",
        link: function (scope, element, attrs) {


        }

    };

}).directive("dynamicName", function ($compile) {
    return {
        restrict: "A",
        terminal: true,
        priority: 1000,
        link: function (scope, element, attrs) {
            element.attr("name", scope.$eval(attrs.dynamicName));
            element.removeAttr("dynamic-name");
            $compile(element)(scope);
        }
    };
});