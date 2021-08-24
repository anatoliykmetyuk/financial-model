var budget_entriesRange = "A4:D30";
var budget_entriesRange_header = "A4:A30";
var budget_entriesRange_body = "B4:D30";
var budget_creditCardRange = "F3:I31";
var budget_creditCardRange_header = "F3:F31";
var budget_creditCardRange_body = "G3:I31";
var budget_bottomline_cell = "B21";
var budget_credit_bottomlineCell = "G32";
var budget_cumulativeRangeBank = "D3:D30";
var budget_cumulativeRangeCredit = "I3:I31";
var budget_credit_entriesRangeNoCumulative = "F3:H21";
var budget_bank_entriesRangeNoCumulative = "A4:C20";

function budget_main() {
  fmt_range(budget_entriesRange, budget_entriesRange_header, budget_entriesRange_body, 0);
  fmt_range(budget_creditCardRange, budget_creditCardRange_header, budget_creditCardRange_body, 5)
}

function fmt_range(rng_spec, rng_spec_header, rng_spec_body, offset) {
  const rng = SpreadsheetApp.getActive().getRange(rng_spec);

  fmtBasicStyle(rng,
    SpreadsheetApp.getActive().getRange(rng_spec_header),
    SpreadsheetApp.getActive().getRange(rng_spec_body));
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

function fmtBasicStyle(rng, header_col, body_rng) {
  header_col.setBackground(headerColColorBase);
  body_rng.setBackground(colorBase);
  rng
    .setFontColor(textColor)
    .setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
}


function onBudgetNextMonth() {
  // Establishing this and next month names
  const thisMonthName = SpreadsheetApp.getActiveSheet().getName();
  const nextMonthName = calculateNextMonth(thisMonthName);

  // Duplicate sheet
  SpreadsheetApp.getActiveSpreadsheet().duplicateActiveSheet();
  const newSheet = SpreadsheetApp.getActiveSheet()
  newSheet.setName(nextMonthName);

  // Fill in carryover; protect script-managed ranges
  newSheet.getRange('C3').setValue("='" + thisMonthName + "'!" + budget_bottomline_cell);
  newSheet.getRange(budget_cumulativeRangeBank).protect()
    .setDescription('Automatic Money on the Day value').setWarningOnly(true);
  newSheet.getRange(budget_cumulativeRangeCredit).protect()
    .setDescription('Automatic Money on the Day value').setWarningOnly(true);

  // Clear this month's transactions
  newSheet.getRange(budget_bank_entriesRangeNoCumulative).clear();  // Bank
  newSheet.getRange(budget_credit_entriesRangeNoCumulative).clear();  // Credit Card

  // Fill in recurring expenses and credit card repay
  newSheet.getRange('A4:C5').setValues([
    ['Recurring Monthly', 'W0', "='Financial Situation'!$B$16"],
    ['Credit Card', 'W0', "='" + thisMonthName + "'!" + budget_credit_bottomlineCell]
  ]);
  newSheet.getRange('A4:A5').setFontWeight('bold');

  // Fill in living expenses
  newSheet.getRange('F3:H6').setValues([
    ['Living', 'W0', "='Financial Situation'!$B$20"],
    ['Living', 'W1', "='Financial Situation'!$B$20"],
    ['Living', 'W2', "='Financial Situation'!$B$20"],
    ['Living', 'W3', "='Financial Situation'!$B$20"],
  ]);

  // Styling
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