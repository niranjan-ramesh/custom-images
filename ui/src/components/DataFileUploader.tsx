import React, { useRef } from 'react'

import {
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  FormErrorMessage,
  Icon,
  InputLeftElement,
  InputRightElement,
  Tooltip
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FcDataSheet } from 'react-icons/fc'

const DataFileUploader = ({ isDisabled, filename, onFileChanged, onFileUpload, file }: {
  isDisabled: boolean | undefined,
  filename: string,
  onFileChanged: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFileUpload: () => void
  file: File | null
}) => {
  const inFile = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const invalid = false
  return (
    <>
      <FormControl
        isInvalid={Boolean(invalid)}
        isRequired={false}
        isDisabled={isDisabled}
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
          onClick={onFileUpload}
        >
          {t('safeInputs.upload')}
        </Button>
      )}
    </>
  )
}

export default DataFileUploader;