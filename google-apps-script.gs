// ============================================================
//  Paste this whole file into Google Sheets → Extensions → Apps Script
//  It turns your Google Sheet into a tiny free database for the quiz.
// ============================================================

const SHEET_NAME = "Responses";

// Returns the "Responses" tab, creating it (with headers) the first time.
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["time", "mindAge", "answers"]);
  }
  return sh;
}

// Called when a phone SENDS answers (POST).
function doPost(e) {
  const lock = LockService.getScriptLock();   // stops 2 phones writing the same row at once
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    getSheet().appendRow([new Date(), data.mindAge, JSON.stringify(data.answers)]);
  } finally {
    lock.releaseLock();
  }
  return json({ ok: true });
}

// Called when a page ASKS for the results (GET).
function doGet() {
  const values = getSheet().getDataRange().getValues().slice(1);   // skip header row
  const rows = values.map(r => ({ mindAge: r[1], answers: JSON.parse(r[2] || "[]") }));
  return json({ rows: rows });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
