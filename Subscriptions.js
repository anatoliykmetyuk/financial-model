var monthly_range = "A3:B21";
var other_range = "D3:G22";

function subscriptions_main() {
  sortRng(monthly_range, [{column: 2, ascending: false}]);
  sortRng(other_range, [
    {column: 5, ascending: true},
    {column: 6, ascending: false}
  ]);
}
