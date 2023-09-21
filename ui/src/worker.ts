import Ajv from 'ajv';
import { read, utils, WorkBook } from 'xlsx'

import schema from './schema/schema.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

const signal = (evt: ParseEventLoadingState | ParseEventDoneState) =>
  postMessage({ type: 'ParseEvent', ...evt } as ParseEvent)

export const parse = async (file: File) => {
  const fileData = await file.arrayBuffer()
  signal({ state: 'LOADING' })
  const workbook = read(fileData)
  const sheets: { sheetName: string; data: any; failedRows: number; errors: any }[] = []
  let totalErrors = 0
  workbook.SheetNames.forEach((sheetName) => {
    const data = utils.sheet_to_json(workbook.Sheets[sheetName]);
    let failedRows = 0;
    const errors: { rowId: number; valid: boolean; error: any }[] = []
    data.forEach((row, rowId) => {
      const valid = validate(row);
      if (!valid) {
        failedRows += 1;
      }
      errors.push({
        rowId,
        valid,
        "error": validate.errors
      })
    });
    totalErrors += failedRows;
    sheets.push({
      sheetName,
      data,
      failedRows,
      errors
    })
  })
  if (workbook.SheetNames.length > 0) {
    signal({ state: 'DONE', filename: file.name, workbook, sheets, totalErrors })
    // const payload_str = JSON.stringify(payload)
  } else postMessage('ERROR!')
}

export type SheetData = { sheetName: string; data: any; failedRows: number; errors: any }

interface ParseEventLoadingState {
  state: 'LOADING'
}

interface ParseEventDoneState {
  state: 'DONE'
  filename: string
  workbook: WorkBook
  sheets: SheetData[],
  totalErrors: number
}

export type ParseEvent = { type: 'ParseEvent' } & (
  | ParseEventLoadingState
  | ParseEventDoneState
)
