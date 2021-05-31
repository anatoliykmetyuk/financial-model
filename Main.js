var budget_sheetName_startChars = ['0', '1'];
var subscriptions_sheetName     = "Subscriptions";
var cashflow_sheetName          = "Financial Situation";

function onEdit(e) {
  var name = e.source.getActiveSheet().getName();
  if (budget_sheetName_startChars.indexOf(name.charAt(0)) != -1) budget_main();
  else if (name == cashflow_sheetName) cashflow_main();
  else if (name == subscriptions_sheetName) subscriptions_main();
}
