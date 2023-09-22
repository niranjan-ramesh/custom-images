import React, { useMemo, useState } from 'react';

import { Table, Tbody, Thead, Tr, Th, Td } from '@chakra-ui/react';
import { Pagination } from "@dts-stn/service-canada-design-system";
import { ErrorObject } from 'ajv';

import EditableCell from './EditableCell';
import { headers, constructErrorMessage } from '../utils/errorUtils'

function PaginatedTable({ sheetData, dataErrors, onUpdate }: { sheetData: Record<string, string | number>[]; dataErrors: { valid: boolean; errors: ErrorObject[] }[]; onUpdate: () => void }) {
    const PageSize = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const currentTableData: Record<string, string | number>[] = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sheetData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, sheetData]);

    const offSet: number = (currentPage - 1) * PageSize;

    const isErrorCell = (rowIndex: number, header: string) => {
        const error = dataErrors[offSet + rowIndex];
        if (!error || !error.errors || error.valid) {
            return false;
        }

        const match = error.errors.find((error: ErrorObject) =>
            (error.instancePath.substring(1) === header)
            || (error.params.missingProperty === header))

        return match && constructErrorMessage(match);
    };

    return (
        <>
            <Table
                variant="simple">
                <Thead>
                    <Tr>
                        {headers.map(({ header }: { header: string }, headerIndex: number) => (
                            <Th key={headerIndex}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {currentTableData.map((row: Record<string, string | number>, rowIndex: number) => (
                        <Tr key={rowIndex}>
                            {headers.map(({ header, type }: { header: string; type: string }, colIndex: number) => {
                                const isError = isErrorCell(rowIndex, header);
                                const cell = row[header] || '';
                                const modifyData = (value: string | number): void => {
                                    sheetData[offSet + rowIndex][header] = value;
                                }
                                return (<Td
                                    key={colIndex}
                                >
                                    <EditableCell
                                        modifyData={modifyData}
                                        cell={cell}
                                        isError={isError}
                                        dataType={type}
                                        onUpdate={onUpdate} />
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