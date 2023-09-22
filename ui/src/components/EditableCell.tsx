import React, { useState } from 'react';

import { Input, Tooltip } from '@chakra-ui/react';
function EditableCell({ modifyData, cell, isError, dataType, onUpdate }:
    {
        modifyData: (value: string | number) => void;
        cell: string|number;
        isError: string|undefined|boolean;
        dataType: string;
        onUpdate: () => void;
    }) {

    const [editedValue, setEditedValue] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const handleUpdate = () => {
        if (editedValue) {
            if (dataType === 'number') {
                modifyData(parseInt(editedValue));
            } else {
                modifyData(editedValue);
            }
            onUpdate()
            setEditedValue('')
        }
        setIsEdit(false)
    }

    return (<Tooltip isDisabled={!isError} label={isError} placement="bottom">
        <Input
            value={isEdit ? editedValue : cell}
            onChange={(e) => setEditedValue(e.target.value)}
            size="sm"
            variant="outline"
            width="auto"
            border={isError ? '1px solid red' : 'none'}
            onClick={() => {
                setEditedValue(cell.toString());
                setIsEdit(true);
            }}
            onBlur={() => handleUpdate()}
        />
    </Tooltip>)
}

export default EditableCell;