import React, { useMemo, useState } from 'react';

import { Table, Tbody, Thead, Tr, Th, Td } from '@chakra-ui/react';
import { Pagination } from "@dts-stn/service-canada-design-system";

function PaginatedTable({ sheetData, headers, errors }: { sheetData: any; headers: string[]; errors: any[] }) {
    const PageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sheetData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sheetData]);

    const offSet = (currentPage - 1) * PageSize;

    const isErrorCell = (rowIndex: number, columnIndex: number) => {
        const error = errors[offSet + rowIndex];
        if (!error || !error.error) {
            return false;
        }

        // Assuming instancePath is in the format '/ColumnName'
        const columnNames = error.error.map((error: any) => error.instancePath.substring(1));
        
        return columnNames.includes(headers[columnIndex]);
    };

    return (
        <>
            <Table 
            style={{borderCollapse:"separate"}} 
            variant="simple">
                <Thead>
                    <Tr>
                    {headers.map((header: string, headerIndex: number) => (
                        <Th key={headerIndex}>{header}</Th>
                    ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {currentTableData.map((row: any, index: number) => (
                        <Tr key={index}>
                            {Object.values(row).map((cell: any, cellIndex: number) => (
                            <Td 
                            key={cellIndex}
                            border={isErrorCell(index, cellIndex) ? '1px solid red': 'none'}
                            >
                                {cell}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <div className="flex flex-row">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={sheetData.length}
                    pageSize={PageSize}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    browser
                />
            </div>
        </>
    );
}
export default PaginatedTable;