module.exports = angular.module("angularjsSeed").directive("expensesTable", function () {

    return {

        restrict: "E",
        templateUrl: "app/components/expenses/expensestable/expensestable.html",
        controller: "ExpensesController",
        link: function (scope, element, attrs, ExpensesController) {

            scope.columns = [{ field: "firstColumn", visible: true }, { field: "secondColumn", visible: true }];

            scope.items = [{ firstColumn: "firstValue", secondColumn: "firstValueSecondColumn" }, { firstColumn: "secondValue", secondColumn: "secondValueSecondColumn" }];

            scope.getColumnByItem = function (column, item) {
                return item[column];

            };

            ExpensesController.fetchAllExpenses();

            scope.$on("fetchAllExpenses", function (event, expenses) {
                scope.expenses = expenses;
                scope.tableParams = ExpensesController.newNgTableParams(expenses);
            });

            scope.remove = function (expense) {
                ExpensesController.remove(expense);
            };

            scope.edit = function (expense) {
                ExpensesController.edit(expense);
            };
        }

    };

});