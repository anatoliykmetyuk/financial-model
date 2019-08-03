function onEdit(e) {
  var name = e.source.getActiveSheet().getName();
  if (budget_sheetName_startChars.indexOf(name.charAt(0)) != -1) budget_main();
  else if (name == cashflow_sheetName) cashflow_main();
  else if (name == subscriptions_sheetName) subscriptions_main();
}

function budgetRowForDay(vals, day) {
  var millisInDay = 24*60*60*1000;
  
  var minDelta = 365*24*60*60*1000;
  var minDay   = undefined;
  var minRow   = -1;
  for (var row = 0; row < vals.length; row++) if (vals[row][1]) {
    var date  = vals[row][1];
    var delta = day - date;
    
    if (delta >= 0 && (Math.abs(minDay - date) < millisInDay || delta < minDelta)) {
      minDelta = delta;
      minDay   = date;
      minRow   = row;
    }
  }

  return minRow;
}

function sortRng(rngStrSpec, sortSpec) {
  var rng = SpreadsheetApp.getActive().getRange(rngStrSpec);
  rng.sort(sortSpec);
}
