function checklist_reset_button() {
  SpreadsheetApp.getActiveSheet().getRange('D2:D20').setValue(false);
}
