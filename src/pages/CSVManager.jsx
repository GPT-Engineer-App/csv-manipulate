import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const CSVManager = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editingRow, setEditingRow] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => line.split(','));
        setHeaders(headers);
        setCsvData(data);
        toast.success("CSV file uploaded successfully");
      };
      reader.readAsText(file);
    }
  };

  const handleEdit = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSave = (rowIndex) => {
    setEditingRow(null);
    toast.success("Row updated successfully");
  };

  const handleDelete = (rowIndex) => {
    const newData = csvData.filter((_, index) => index !== rowIndex);
    setCsvData(newData);
    toast.success("Row deleted successfully");
  };

  const handleAddRow = () => {
    const newRow = new Array(headers.length).fill('');
    setCsvData([...csvData, newRow]);
    toast.success("New row added");
  };

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newData = [...csvData];
    newData[rowIndex][cellIndex] = value;
    setCsvData(newData);
  };

  const handleDownload = () => {
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'exported_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    toast.success("CSV file downloaded");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Manager</h1>
      
      {/* File Upload Section */}
      <div className="mb-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-2"
        />
        <p className="text-sm text-gray-500">Upload a .csv file to get started</p>
      </div>

      {/* Data Display Section */}
      {csvData.length > 0 && (
        <div className="mb-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {csvData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {editingRow === rowIndex ? (
                        <Input
                          value={cell}
                          onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
                        />
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {editingRow === rowIndex ? (
                      <Button onClick={() => handleSave(rowIndex)} variant="outline" className="mr-2">Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(rowIndex)} variant="outline" className="mr-2">Edit</Button>
                    )}
                    <Button onClick={() => handleDelete(rowIndex)} variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleAddRow} className="mt-2">Add Row</Button>
        </div>
      )}

      {/* Download Section */}
      {csvData.length > 0 && (
        <Button onClick={handleDownload}>Download CSV</Button>
      )}
    </div>
  );
};

export default CSVManager;