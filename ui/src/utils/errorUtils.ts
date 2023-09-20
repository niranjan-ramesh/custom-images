import Ajv from 'ajv';

import schema from '../schema/test.json';
import { SheetData } from '../worker';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export const validateData = (sheetDataList: SheetData[]) => {
    const dataErrors: object[][] = [];
    sheetDataList.forEach(({ data, sheetName }: { data: any, sheetName: string }, index: number) => {
        const errors: any[] = [];
        data.forEach((row: any, index: number) => {
            const valid = validate(row);
            errors.push({ valid, "errors": validate.errors })
        });
        dataErrors.push(errors);
    });
    return dataErrors;
}
