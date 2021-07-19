function sortRng(rngStrSpec, sortSpec) {
  var rng = SpreadsheetApp.getActive().getRange(rngStrSpec);
  rng.sort(sortSpec);
}
