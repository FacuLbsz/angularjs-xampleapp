module.exports = angular.module("angularjsSeed").directive("expensesForm", function () {

    return {

        restrict: "E",
        templateUrl: "app/components/expenses/expensesform/expensesform.html",
        controller: "ExpensesController",
        link: function (scope, element, attrs, ExpensesController) {

            scope.$on("editExpense", function (event, expense) {
                scope.expense = expense;
                scope.expensesForm.$setDirty();
                $("#place")[0].focus();
            });

            scope.add = function () {
                if (!scope.expense.id) {
                    ExpensesController.add(scope.expense).then(function () {
                        scope.successMesageAndClean("Agregado correctamente");
                    });
                } else {
                    ExpensesController.update(scope.expense).then(function () {
                        scope.successMesageAndClean("Actualizado correctamente");
                    });
                }
            };

            scope.successMesageAndClean = function (message) {
                ExpensesController.successMessage(message);
                scope.expense = {};
                scope.expensesForm.$setPristine();
                ExpensesController.fetchAllExpenses();
                $("#place")[0].focus();
            };

            scope.save = function () {
                ExpensesController.update(scope.expense).then(function () {
                    this.successMesage("Guardado correctamente");
                });
                scope.expense = {};
                scope.expensesForm.$setPristine();
            };

            $("#place")[0].focus();
        }
    };

});

