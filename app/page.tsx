'use client';

import { useState } from 'react';

export default function Home() {
  const [cellData, setCellData] = useState<{ [key: string]: string }>({});

  // chess coordinates
  const chessColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const chessRows = [8, 7, 6, 5, 4, 3, 2, 1];

  const totalColumns = 50;
  const totalRows = 100;
  
  const columns = Array.from({ length: totalColumns }, (_, i) => {
    if (i < 26) {
      return String.fromCharCode(65 + i);
    } else {
      const firstLetter = String.fromCharCode(65 + Math.floor((i - 26) / 26));
      const secondLetter = String.fromCharCode(65 + ((i - 26) % 26));
      return firstLetter + secondLetter;
    }
  });
  
  const rows = Array.from({ length: totalRows }, (_, i) => i + 1);

  const updateCell = (col: string, row: number, value: string) => {
    const key = `${col}${row}`;
    setCellData(prev => ({ ...prev, [key]: value }));
  };

  const getCellValue = (col: string, row: number) => {
    const key = `${col}${row}`;
    return cellData[key] || '';
  };

  const isChessCell = (col: string, row: number) => {
    return chessColumns.includes(col) && chessRows.includes(row);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="overflow-auto">
        <table className="border-collapse border border-gray-300 bg-white">
          {/* Header row with column labels */}
          <thead>
            <tr>
              <th className="w-12 h-12 border border-gray-300 bg-gray-100 text-xs font-medium text-gray-600 flex items-center justify-center"></th>
              {columns.map(col => (
                <th key={col} className="w-12 h-12 border border-gray-300 bg-gray-100 text-xs font-medium text-gray-600 text-center align-middle">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row}>
                {/* Row label */}
                <td className="w-12 h-12 border border-gray-300 bg-gray-100 text-xs font-medium text-gray-600 text-center align-middle">
                  {row <= 8 ? chessRows[row - 1] : row}
                </td>
                {/* Data cells */}
                {columns.map(col => {
                  const isChess = isChessCell(col, row);
                  const chessRank = isChess ? chessRows[row - 1] : null;
                  return (
                    <td key={`${col}${row}`} className="w-12 h-12 border border-gray-300 p-0">
                      <input
                        type="text"
                        value={getCellValue(col, row)}
                        onChange={(e) => updateCell(col, row, e.target.value)}
                        className={`w-12 h-12 px-1 text-xs border-none outline-none focus:bg-blue-50 ${
                          isChess 
                            ? 'bg-yellow-50 font-mono text-center' 
                            : 'bg-white'
                        }`}
                        placeholder={isChess ? `${col}${chessRank}` : ''}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
