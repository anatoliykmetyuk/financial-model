var budget_entriesRange = "A4:D20";
var budget_creditCardRange = "F3:I21";

function budget_main() {
  fmt_range(budget_entriesRange, 0);
  fmt_range(budget_creditCardRange, 5)
}

function fmt_range(rng_spec, offset) {
  const rng = SpreadsheetApp.getActive().getRange(rng_spec);

  fmtBasicStyle(rng);
  rng.sort([{column: 2+offset, ascending: true}, {column: 3+offset, ascending: true}]);  // Sort by date first and by amount second

  fmtAmounts(rng);
  fmtWeeks(rng);
  fmtEmptyCumulatives(rng);
  fmtCurrentDate(rng);
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
    var week = vals[row][1];
    if (+week[1] % 2 == 0) {
      rng.getCell(row+1, 1).setBackground(headerColColorAlt);  // Set header col color
      for (col = 1; col < vals[row].length; col++) rng.getCell(row+1, col+1).setBackground(colorAlt);  // Set data color
    }
  }
}

function fmtEmptyCumulatives(rng) {
  var vals = rng.getValues();
  for (var row = 0; row < vals.length; row++) if (!vals[row][0])  // If the entry's name is empty...
    [3].forEach(function (col) { rng.getCell(row+1, col+1).setFontColor(colorBase) });  // ... blend the cumulative color w/background
}

function fmtCurrentDate(rng) {
  const vals = rng.getValues();
  const current_week = SpreadsheetApp.getActive().getRange("L1").getValue()[1];

  // Determine the latest expense of the given week
  var latestRow = -1;
  for (var row = 0; row < vals.length; row++) {
    if (vals[row][1]) {
      var row_week = +vals[row][1][1];  // '1' from 'W1'
      if (row_week == current_week) latestRow = row;
    }
  }

  // Color the found row
  if (latestRow >= 0) {  // When we are viewing sheets for the future months, this will be -1
    for (var col = 0; col < vals[latestRow].length; col++) {
      var cell = rng.getCell(latestRow+1, col+1);
      cell.setBackground(todayBgColor);
      if (col >= 2 && col <= 4 && vals[latestRow][col] < 0) cell.setFontColor(todayNegativeColor);
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


function onBudgetNextMonth() {
  // Establishing this and next month names
  const thisMonthName = SpreadsheetApp.getActiveSheet().getName();
  const nextMonthName = calculateNextMonth(thisMonthName);

  SpreadsheetApp.getActiveSpreadsheet().duplicateActiveSheet();
  const newSheet = SpreadsheetApp.getActiveSheet()
  newSheet.setName(nextMonthName);
  newSheet.getRange('C3').setValue("='" + thisMonthName + "'!B16");
  newSheet.getRange('D3:D15').protect()
    .setDescription('Automatic Money on the Day value').setWarningOnly(true);

  newSheet.getRange('A4:C15').clear();
  newSheet.getRange('A4:C4').setValues([['Recurring Monthly', 'W1', "='Financial Situation'!$B$16"]]);
  newSheet.getRange('A5:C5').setValues([['Credit Card', 'W1', "=-'" + thisMonthName + "'!B35"]]);
  newSheet.getRange('A4:A5').setFontWeight('bold');

  newSheet.getRange('A22:C34').clear();
  newSheet.getRange('C21').setValues([[0]]);
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