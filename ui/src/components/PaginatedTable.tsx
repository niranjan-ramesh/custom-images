import React, { useMemo, useState } from 'react';

import { Table, Tbody, Thead, Tr, Th, Td, Input, Tooltip } from '@chakra-ui/react';
import { Pagination } from "@dts-stn/service-canada-design-system";

function PaginatedTable({ sheetData, headers, dataErrors, onUpdate }: { sheetData: any; headers: string[]; dataErrors: { valid: boolean; errors: any[] }[]; onUpdate: () => void }) {
    const PageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [editingCell, setEditingCell] = useState<{ rowIndex: number; colIndex: number } | null>(
        null
    );
    const [editedValue, setEditedValue] = useState<string | null>(null);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sheetData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sheetData]);

    const offSet = (currentPage - 1) * PageSize;

    const isErrorCell = (rowIndex: number, columnIndex: number) => {
        const error = dataErrors[offSet + rowIndex];
        if (!error || !error.errors || error.valid) {
            return false;
        }

        const match = error.errors.find((error: any) => error.instancePath.substring(1) === headers[columnIndex])
        return match && {
            "keyword" : match.keyword, 
            "message": match.message,
            "params": match.params
        }
    };

    const handleUpdate = () => {
        if (editedValue && editingCell) {
            const rowIndex = offSet + editingCell.rowIndex
            sheetData[rowIndex][headers[editingCell.colIndex]] = editedValue;
            onUpdate()
            setEditedValue(null)
            setEditingCell(null)
        }
    }

    const renderCellContent = (rowIndex: number, colIndex: number, cell: string) => {
        if (editingCell && editingCell.rowIndex === rowIndex && editingCell.colIndex === colIndex) {
            return (
                <Input
                    value={editedValue !== null ? editedValue : cell}
                    onChange={(e) => setEditedValue(e.target.value)}
                    height="100%"
                    onBlur={handleUpdate}
                />
            );
        }
        return <p>{cell}</p>;
    };

    return (
        <>
            <Table
                style={{ borderCollapse: "separate" }}
                variant="simple">
                <Thead>
                    <Tr>
                        {headers.map((header: string, headerIndex: number) => (
                            <Th key={headerIndex}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {currentTableData.map((row: any, rowIndex: number) => (
                        <Tr key={rowIndex}>
                            {Object.values(row).map((cell: any, colIndex: number) => {
                                const isError = isErrorCell(rowIndex, colIndex);
                                const label = isError && (isError.keyword === "enum" ? isError.message + isError.params.allowedValues: isError.message);
                                return (<Td
                                    key={colIndex}
                                    border={isError ? '1px solid red' : 'none'}
                                    onClick={() => {
                                        if (!editingCell || editingCell.rowIndex !== rowIndex || editingCell.colIndex !== colIndex) {
                                            setEditedValue(null)
                                            setEditingCell({ rowIndex, colIndex })
                                        }
                                    }}
                                >
                                    {isError ?
                                        <Tooltip label={label} placement="bottom">
                                            {renderCellContent(rowIndex, colIndex, cell)}
                                        </Tooltip>
                                        : <>{renderCellContent(rowIndex, colIndex, cell)}</>
                                    }
                                </Td>)
                            })}
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