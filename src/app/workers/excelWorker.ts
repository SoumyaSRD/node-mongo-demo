import { parentPort, workerData } from "worker_threads";
import ExcelJS from "exceljs";

if (!parentPort) {
  throw new Error("Worker must have a parentPort");
}

parentPort.on("message", async (message: any) => {
  try {
    if (message.action === "read") {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(workerData.filePath);

      const worksheet = workbook.worksheets[0];
      const jsonData: any[] = [];

      worksheet.eachRow({ includeEmpty: true }, (row) => {
        const rowData = row.values as any[];
        const rowObject = rowData.reduce<Record<string, any>>((acc, cell, index) => {
          acc[`column${index}`] = cell;
          return acc;
        }, {});

        jsonData.push(rowObject);
      });

      parentPort?.postMessage({ action: "read", data: jsonData });
    } else if (message.action === "write") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");
      worksheet.columns = message.columns;
      worksheet.addRows(message.rows);
      await workbook.xlsx.writeFile(workerData.filePath);
      parentPort?.postMessage({ action: "write", status: "success" });
    }
  } catch (error: any) {
    parentPort?.postMessage({ action: "error", error: error.message });
  }
});

