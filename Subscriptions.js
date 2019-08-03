function subscriptions_main() {
  sortRng(subscriptions_range, [{column: 2, ascending: true}, {column: 3, ascending: false}]); // Sort by next payment and its amount
}
