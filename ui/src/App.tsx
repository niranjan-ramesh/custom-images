import React, { useRef, useState, useEffect } from 'react'

// import { gql, useMutation } from '@apollo/client'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  FormErrorMessage,
  Icon,
  Spinner,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  Text
} from '@chakra-ui/react'
import { Collapse } from '@dts-stn/service-canada-design-system'
import { useTranslation } from 'react-i18next'
import { FcDataSheet } from 'react-icons/fc'

import DataViewer from './components/DataViewer'
import { ParseWorker } from './serviceWorker'
import { ParseEvent } from './worker'
import './App.css'
// import { useQuery } from '@apollo/client'
// import { SAY_HELLO } from './graphql.js'

function DeferredRender({
  children,
  idleTimeout,
}: {
  children: JSX.Element
  idleTimeout: number
}) {
  const [render, setRender] = React.useState(false)

  React.useEffect(() => {
    if (render) setRender(false)
    const id = requestIdleCallback(() => setRender(true), {
      timeout: idleTimeout,
    })

    return () => cancelIdleCallback(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleTimeout])

  if (!render) return <Spinner />

  return children
}

export default function App({ parseWorker }: { parseWorker: ParseWorker }) {
  // const { loading, error, data } = useQuery(SAY_HELLO)

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Oh no... {error.message}</p>
  const inFile = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [parserStatus, setParserStatus] = useState<ParseEvent>()

  const handleMessages = (msg: any) => {
    if (typeof msg.data === 'object' && msg.data.type === 'ParseEvent') {
      setParserStatus(msg.data)
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

  const invalid = false

  const p =
    (parserStatus &&
      parserStatus.state === 'DONE' &&
      parserStatus.workbook.Props) ||
    undefined

  const { t } = useTranslation()
  // const TEST = gql`
  //                   mutation saveFile($file: Upload!) {
  //                     saveFile(file: $file)
  //                   }
  //                 `
  // const [mutation, { loading, error, data }] = useMutation(TEST);

  return (
    <>
      <Box className="App">
        <Box className="Page-header" mb={2}>
          TB Upload PoC
        </Box>
        <Box>
          A place for Provincial and Territorial Epidemologists to securely upload Tuberculosis Reporting Data.
        </Box>

        <FormControl
          isInvalid={Boolean(invalid)}
          isRequired={false}
          isDisabled={parserStatus && parserStatus.state === 'LOADING'}
        >
          <FormLabel htmlFor="writeUpFile"></FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FcDataSheet} />}
            />
            <input
              type="file"
              ref={inFile}
              onChange={onFileChanged}
              accept="
application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
application/vnd.ms-excel,
.xlsb,
.ods
"
              style={{ display: 'none' }}
            />
            <Input
              placeholder={t('safeInputs.inputBar') || ''}
              onClick={() =>
                inFile && inFile.current && inFile.current.click()
              }
              readOnly
              value={filename}
              style={{ borderRadius: '16px', border: '0.50px black solid' }}
            />
            <InputRightElement w="auto"></InputRightElement>
          </InputGroup>
          <FormErrorMessage>{invalid}</FormErrorMessage>
        </FormControl>
        <br />

        {file === null ? (
          <Tooltip
            hasArrow
            label={t('safeInputs.inputBar')}
            aria-label="A tooltip"
          >
            <Button
              cursor={'not-allowed'}
              color="#FFFFFF"
              bg="#26374a"
              _hover={{ bg: '#1616FF99' }}
              as="button"
            >
              {t('safeInputs.upload')}
            </Button>
          </Tooltip>
        ) : (
          <Button
            bg="#26374a"
            color="#FFFFFF"
            _hover={{ bg: '#0000DD' }}
            onClick={() => {
              file && parseWorker.parse(file)
            }}
          >
            {t('safeInputs.upload')}
          </Button>
        )}

        {parserStatus && parserStatus.state === 'LOADING' && <Spinner />}
        {parserStatus && parserStatus.state === 'DONE' && p && (
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
                <DataViewer sheets={parserStatus.sheets} />
              </Collapse>
              <Button
                bg="#26374a"
                color="#FFFFFF"
                _hover={{ bg: '#0000DD' }}
                onClick={()=>{
                  // console.log("click here")
                  // mutation({variables: {file}});
                }}
              >
                Upload Anyway
              </Button>
              <br />

              <br />
            <br />

            <Box textAlign={'left'}>
              <Text>{t('safeInputs.preview')} </Text>
              <Box
                h="600px"
                overflowY={'auto'}
                overflow="wrap"
                bg="#eee"
                border="1px dotted #284162"
                padding="5px"
                text-align="left"
              >
                {/* <DeferredRender idleTimeout={1000}>
                  <pre>{JSON.stringify(parserStatus.sheets.map((sheet) => sheet.errors), null, 2)}</pre>
                </DeferredRender> */}
              </Box>
            </Box>

            {/* <GQL /> */}
            <br />
          </Box>
        )}
      </Box>
      <br />
    </>
  )
}
