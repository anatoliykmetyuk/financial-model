var headerColColorBase = '#d9ead3';
var colorBase          = '#fff2cc';
var headerColColorAlt  = '#a4c2f4';
var colorAlt           = '#c9daf8';
var textColor          = 'black';
var negativeColor      = 'red';
var todayNegativeColor = 'LightPink';
var todayBgColor       = '#cc0000';
var todayTextColor     = 'white';

var cashflow_expensesRange = "A3:B21"

function onEdit(e) {
  var name = e.source.getActiveSheet().getName();
  if (['0', '1'].indexOf(name.charAt(0)) != -1) mainMonthlyBudget("A4:D30", 0);  // Only run the sorting logic on the sheets starting with the number of a month
  else if (name == "Cashflow") mainCashflow();
  else if (name == "Subscriptions") mainSubscriptions();
}


function mainMonthlyBudget(rangeStrSpec, startCol) {  // E.g. "A4:D30", 0
  var rng = SpreadsheetApp.getActive().getRange(rangeStrSpec);
  sort(rng, startCol);
  computeDelta(rng);
}

function mainCashflow() {
  var rng = SpreadsheetApp.getActive().getRange(cashflow_expensesRange);
  rng.sort([{column: 2, ascending: false}]); // Sort by expense amount
  
  cashflow_processLiving(); 
}

function cashflow_processLiving() {
  var rng = SpreadsheetApp.getActive().getRange(cashflow_expensesRange);
  var vals = rng.getValues();
  var livingAmt = 0;
  for (var r = 0; r < vals.length; r++) if (vals[r][0] == "Living") {
    [rng.getCell(r+1, 1), rng.getCell(r+1, 2)].forEach(function (c) {
      c.setFontWeight("bold");
    });
    livingAmt = vals[r][1];
    break;
  }
  
  var totalCashflow = SpreadsheetApp.getActive().getRange("E21").getValue();
  SpreadsheetApp.getActive().getRange("E22").setValue(totalCashflow + livingAmt);
}

function mainSubscriptions() {
  var rng = SpreadsheetApp.getActive().getRange("A3:D22");
  rng.sort([{column: 2, ascending: true}, {column: 3, ascending: false}]); // Sort by next payment and its amount
}


function sort(rng, startCol) {
  fmtBasicStyle(rng);
  rng.sort([{column: startCol+2, ascending: true}, {column: startCol+3, ascending: true}]);  // Sort by date first and by amount second
  
  fmtAmounts(rng);
  fmtWeeks(rng);
  fmtEmptyCumulatives(rng);
  fmtCurrentDate(rng);
}

function computeDelta(rng) {
  var vals = rng.getValues(); // get values array from range
  var targetDay = SpreadsheetApp.getActive().getRange("G18").getValue();
  var row = budgetRowForDay(vals, targetDay);  // get the target day's budget row
  var cumulativeProjected = vals[row][3]; // get the cumulative value for that row
  SpreadsheetApp.getActive().getRange("G20").setValue(cumulativeProjected); // set the "Projected Total" to that value
}

function fmtAmounts(rng) {
  var vals = rng.getValues();
  
  for (var i = 0; i < vals.length; i++)
    for (var j = 2; j < vals[i].length; j++)
      if (vals[i][j] < 0) rng.getCell(i+1, j+1).setFontColor(negativeColor);
}

function fmtWeeks(rng) {
  var vals = rng.getValues();
  
  for (var row = 0; row < vals.length; row++) {
    var date = vals[row][1];
    if (date && getWeekNumber(date) % 2 == 0) {
      rng.getCell(row+1, 0+1).setBackground(headerColColorAlt);
      for (col = 1; col < vals[row].length; col++) rng.getCell(row+1, col+1).setBackground(colorAlt);
    }
  }
}

function fmtEmptyCumulatives(rng) { 
  var vals = rng.getValues();
  for (var row = 0; row < vals.length; row++) if (!vals[row][0])
    [3].forEach(function (col) { rng.getCell(row+1, col+1).setFontColor(colorBase) });
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

function fmtCurrentDate(rng) { // var rng = sheet.getRange("A4:E30");
  var vals = rng.getValues();
  var minRow = budgetRowForDay(vals, new Date());
  
  if (minRow >= 0) {  // When we are viewing sheets for the future months, this will be -1
    for (var col = 0; col < vals[minRow].length; col++) {
      var cell = rng.getCell(minRow+1, col+1);
      cell.setBackground(todayBgColor);
      if (col >= 2 && col <= 4 && vals[minRow][col] < 0) cell.setFontColor(todayNegativeColor);
      else cell.setFontColor(todayTextColor);
    }
  }
}

function fmtBasicStyle(rng) {  // var rng = sheet.getRange("A4:E30");
  var vals = rng.getValues()
  for (var r = 0; r < vals.length; r++) for (var c = 0; c < vals[r].length; c++)
    rng.getCell(r+1, c+1)
      .setBackground(c == 0 ? headerColColorBase : colorBase)
      .setFontColor(textColor);
}

// https://stackoverflow.com/a/6117889
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}


























