import React from "react"

import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, TableContainer } from "@chakra-ui/react"
import { FcPlus, FcMinus } from "react-icons/fc"

import PaginatedTable from "./PaginatedTable"
import { SheetData } from "../worker";

function DataViewer({ sheets }: { sheets: SheetData[] }) {
    return (
        <>
            {sheets.map((sheet: SheetData, sheetNumber: number) => (
                <Accordion
                    key={sheetNumber}
                    allowToggle
                    defaultIndex={[0]}
                    fontFamily="Noto Sans"
                    fontSize={'16'}
                    color="#333"
                >
                    <AccordionItem>
                        {({ isExpanded }) => (
                            <>
                                <AccordionButton>
                                    {isExpanded ? (
                                        <>
                                            <Box flex="1" textAlign="left">
                                                {sheet.sheetName}
                                            </Box>{' '}
                                            <FcMinus fontSize="12px" />
                                        </>
                                    ) : (
                                        <>
                                            <Box flex="1" textAlign="left">
                                                {sheet.sheetName}
                                            </Box>{' '}
                                            <FcPlus fontSize="12px" />
                                        </>
                                    )}
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <TableContainer>
                                        {sheet.data && sheet.data.length && <PaginatedTable headers={Object.keys(sheet.data[0])} sheetData={sheet.data} errors={sheet.errors} />}
                                    </TableContainer>
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            ))}

        </>
    )
}

export default DataViewer