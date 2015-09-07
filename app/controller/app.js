var app = angular.module('expenseApp',[]);

app.controller("expenseCntrl",function($scope, $http){
	/*$scope.expenses = [
	{payee: 'xyz', description:'paid for gas', amount: '20'}
	];*/

	var getExpenseDetails = function(){
		$http.get('expenseDetails').then(function(response){
			//alert(data);
			console.log('expense--> '+JSON.stringify(response.data));
			console.log('expense size--> '+response.data.length);
			$scope.expenses=response.data;
		});
	};

	getExpenseDetails();

	$scope.submitForm= function(){
		//alert(JSON.stringify($scope.userdata));
		//alert($scope.expenseForm.$valid);

		if($scope.expenseForm.$valid){
			$http.post('saveExpenseDetails',$scope.userdata).then(function(response){
				console.log(JSON.stringify(response));
				getExpenseDetails();
			});
		}		
	}
});