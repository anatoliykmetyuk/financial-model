function onEdit(e) {
  var name = e.source.getActiveSheet().getName();
  if (['0', '1'].indexOf(name.charAt(0)) != -1) budget_main("A4:D30", 0);  // Only run the sorting logic on the sheets starting with the number of a month
  else if (name == "Cashflow") cashflow_main();
  else if (name == "Subscriptions") subscriptions_main();
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
