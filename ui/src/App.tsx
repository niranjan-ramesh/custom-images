import React, { useRef, useState, useEffect } from 'react'

// import { gql, useMutation } from '@apollo/client'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Spinner,
  TableContainer,
} from '@chakra-ui/react'
import { Collapse } from '@dts-stn/service-canada-design-system'
import { FcMinus, FcPlus } from 'react-icons/fc'

import DataFileUploader from './components/DataFileUploader'
import PaginatedTable from './components/PaginatedTable'
import { ParseWorker } from './serviceWorker'
import { validateData } from './utils/errorUtils'
import { ParseEvent, SheetData } from './worker'
import './App.css'


export default function App({ parseWorker }: { parseWorker: ParseWorker }) {

  const inFile = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [parserStatus, setParserStatus] = useState<ParseEvent>()
  const [dataErrors, setDataErrors] = useState<any[] | null>(null)

  const handleMessages = (msg: any) => {
    if (typeof msg.data === 'object' && msg.data.type === 'ParseEvent') {
      setParserStatus(msg.data)
      if (msg.data.sheets)
        setDataErrors(validateData(msg.data.sheets));
    }
  }
  useEffect(() => {
    parseWorker.addEventListener('message', handleMessages)

    return () => {
      parseWorker.removeEventListener('message', handleMessages)
    }
  }, [parseWorker])

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParserStatus(undefined)
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    } else {
      setFile(null)
      setFilename('')
    }
  }

  const p =
    (parserStatus &&
      parserStatus.state === 'DONE' &&
      parserStatus.workbook.Props) ||
    undefined

  return (
    <>
      <Box className="App">
        <Box className="Page-header" mb={2}>
          TB Upload PoC
        </Box>
        <Box>
          A place for Provincial and Territorial Epidemologists to securely upload Tuberculosis Reporting Data.
        </Box>

        <DataFileUploader
          isDisabled={parserStatus && parserStatus.state === 'LOADING'}
          inFile={inFile}
          filename={filename}
          onFileChanged={onFileChanged}
          onFileUpload={() => {
            file && parseWorker.parse(file)
          }}
          file={file} />

        {parserStatus && parserStatus.state === 'LOADING' && <Spinner />}
        {parserStatus && parserStatus.state === 'DONE' && p && dataErrors && (
          <Box>
            <br />
            <Box fontSize="2.375rem" fontWeight={700} color="#333" fontStyle="normal" fontFamily="Lato">
              {`${parserStatus.totalErrors} inconsistencies found`}
            </Box>
            <Box>
              {`We found ${parserStatus.totalErrors} fields that are inconsistent with our new data standard. Not to worry; we’ll still accept data with inconsistencies. However, if you resolve these inconsistencies before uploading, we’ll be able to process your data faster.`}
            </Box>
            <Collapse
              id="errors"
              title={`Show details of ${parserStatus.totalErrors} inconsistencies`}
            >
              {parserStatus.sheets.map((sheet: SheetData, sheetNumber: number) => (

                  sheet.data && sheet.data.length && (
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
                                {<PaginatedTable headers={Object.keys(sheet.data[0])} sheetData={sheet.data} dataErrors={dataErrors[sheetNumber]} onUpdate={()=>setDataErrors(validateData(parserStatus.sheets))}/>}
                              </TableContainer>
                            </AccordionPanel>
                          </>
                        )}
                      </AccordionItem>
                    </Accordion>
                  )
                
              )
              )}

            </Collapse>
            <Button
              bg="#26374a"
              color="#FFFFFF"
              _hover={{ bg: '#0000DD' }}
              onClick={() => {
                // console.log("click here")
                // mutation({variables: {file}});
              }}
            >
              Upload Anyway
            </Button>
            <br />

            <br />
            <br />

            

            <br />
          </Box>
        )}
      </Box>
      <br />
    </>
  )
}
