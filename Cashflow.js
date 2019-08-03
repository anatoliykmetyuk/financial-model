function cashflow_main() {
  sortRng(cashflow_expensesRange, [{column: 2, ascending: false}]);
  cashflow_processLiving(); 
}

function cashflow_processLiving() {
  var rng = SpreadsheetApp.getActive().getRange(cashflow_expensesRange);
  var vals = rng.getValues();
  var livingAmt = 0;
  for (var r = 0; r < vals.length; r++) if (vals[r][0] == cashflow_livingEntryName) {
    [rng.getCell(r+1, 1), rng.getCell(r+1, 2)].forEach(function (c) {
      c.setFontWeight("bold");
    });
    livingAmt = vals[r][1];
    break;
  }
  
  var totalCashflow = SpreadsheetApp.getActive().getRange(cashflow_total).getValue();
  SpreadsheetApp.getActive().getRange(cashflow_totalNoLiving).setValue(totalCashflow + livingAmt);
}
