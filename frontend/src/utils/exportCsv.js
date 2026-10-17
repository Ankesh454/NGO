/**
 * Export an array of objects to a downloadable CSV file.
 * Handles escaped quotes, commas, and proper encoding.
 * 
 * @param {Array<Object>} data - Array of record objects to export
 * @param {string} filename - Desired output filename (e.g. "contacts.csv")
 */
export const exportToCSV = (data, filename = "export.csv") => {
  if (!data || !data.length) {
    return false;
  }

  // Extract keys while skipping internal fields like __v
  const headers = Object.keys(data[0]).filter((key) => key !== "__v");

  const csvRows = [];

  // Header row
  csvRows.push(headers.map((h) => `"${h}"`).join(","));

  // Content rows
  for (const row of data) {
    const values = headers.map((header) => {
      let val = row[header];
      if (val === null || val === undefined) {
        val = "";
      } else if (typeof val === "object") {
        val = JSON.stringify(val);
      } else {
        val = String(val);
      }
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  }

  const blob = new Blob([csvRows.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
