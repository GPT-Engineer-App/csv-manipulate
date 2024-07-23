import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const CSVManager = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

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
        <div className="mb-4">
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
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                  <TableCell>
                    <Button variant="outline" className="mr-2">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-2">Add Row</Button>
        </div>
      )}

      {/* Download Section */}
      {csvData.length > 0 && (
        <Button>Download CSV</Button>
      )}
    </div>
  );
};

export default CSVManager;