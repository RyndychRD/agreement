const schedule = require("node-schedule");
const {
  transferDocumentToArchive,
} = require("./jobs/transferDocumentToArchive");

function scheduler() {
  console.log("Запущено отслеживание задач");
  // Каждый день в 7 утра
  schedule.scheduleJob("0 7 * * *", transferDocumentToArchive);
}

module.exports = { scheduler };
