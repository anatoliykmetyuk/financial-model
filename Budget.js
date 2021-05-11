var budget_entriesRange = "A4:D30";

function budget_main() {
  var rng = SpreadsheetApp.getActive().getRange(budget_entriesRange);

  fmtBasicStyle(rng);
  rng.sort([{column: 2, ascending: true}, {column: 3, ascending: true}]);  // Sort by date first and by amount second

  fmtAmounts(rng);
  fmtWeeks(rng);
  fmtEmptyCumulatives(rng);
  fmtCurrentDate(rng);
}

function onBudgetNextMonth() {
  const thisMonthName = SpreadsheetApp.getActiveSheet().getName();
  const nextMonthName = calculateNextMonth(thisMonthName);
  const monthStartDate = SpreadsheetApp.getActiveSheet().getRange('B3').getValue();
  const nextMonthStartDate = new Date(monthStartDate.setMonth(monthStartDate.getMonth()+1));

  SpreadsheetApp.getActiveSpreadsheet().duplicateActiveSheet();
  const newSheet = SpreadsheetApp.getActiveSheet()
  newSheet.setName(nextMonthName);
  newSheet.getRange('B3').setValue(nextMonthStartDate);
  newSheet.getRange('C3').setValue("='" + thisMonthName + "'!B31");
  newSheet.getRange('D3:D30').protect()
    .setDescription('Automatic Money on the Day value').setWarningOnly(true);

  newSheet.getRange('A4:C30').clear();
  newSheet.getRange('A4:C4').setValues([['Recurring Monthly', nextMonthStartDate, '=Cashflow!$B$16']]);
  newSheet.getRange('A4').setFontWeight('bold');
  budget_main();
}

function calculateNextMonth(thisMonthName) {
  const thisMonthTokens = thisMonthName.split('/');
  var nextMonthOrdinal = (+thisMonthTokens[0]) + 1;
  var nextYearOrdinal = (+thisMonthTokens[1]);
  if (nextMonthOrdinal > 12) {
    nextMonthOrdinal = 1;
    nextYearOrdinal = nextYearOrdinal + 1;
  }
  return ('0' + nextMonthOrdinal.toString()).slice(-2) + '/' + nextYearOrdinal;
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

function fmtCurrentDate(rng) {
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

function fmtBasicStyle(rng) {
  var vals = rng.getValues()
  for (var r = 0; r < vals.length; r++) for (var c = 0; c < vals[r].length; c++)
    rng.getCell(r+1, c+1)
      .setBackground(c == 0 ? headerColColorBase : colorBase)
      .setFontColor(textColor)
      .setBorder(true, true, true, true, false, false, "black", SpreadsheetApp.BorderStyle.SOLID);
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
