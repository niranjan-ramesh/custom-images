import { screen, render, act, fireEvent } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import EditableCell from '../components/EditableCell'

const data = [
    { SerialNumber: 1, name: "Object-1", price: "500" },
    { SerialNumber: 2, name: "Object-2", price: 250 },
];

const modifyData = (value) => {
    data[0]["price"] = value;
    console.log("test")
};

const isError = "test";
const onUpdate = () => { };

describe('test EditableCell component', () => {

    const cellValue = data[0].price;

    it('renders EditableCell component', async () => {
        await render(<EditableCell
            modifyData={modifyData}
            cell={cellValue}
            isError={isError}
            dataType="number"
            onUpdate={onUpdate} />);
        const inputs = await screen.findAllByRole("textbox");
        expect(inputs).toHaveLength(1);
        expect(inputs[0].value).toEqual(cellValue);
        expect(inputs[0]).toHaveStyle({border: '1px solid red'})
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
            
    it('test Tooltip on hover over input', async () => {
        await render(<EditableCell
            modifyData={modifyData}
            cell={cellValue}
            isError={isError}
            dataType="number"
            onUpdate={onUpdate} />);
        const input = await screen.findByRole("textbox");
        await userEvent.hover(input);
        const tooltips = await screen.findAllByRole('tooltip')
        expect(tooltips).toHaveLength(1);    
        expect(await screen.findByText(isError)).toBeInTheDocument();
        expect(await screen.findByText(isError)).toBe(tooltips[0]);
    });

    it('test click and type value in input text box', async () => {
        await render(<EditableCell
            modifyData={modifyData}
            cell={cellValue}
            isError={isError}
            dataType="number"
            onUpdate={onUpdate} />);
        const input = await screen.findByRole("textbox");
        await userEvent.click(input);
        await userEvent.keyboard("_EDITED_VALUE");
        expect(input.value).toEqual(`${cellValue}_EDITED_VALUE`);
    });

    it('test moving away from input text box', async () => {
        const {debug } = await render(<EditableCell
            modifyData={modifyData}
            cell={cellValue}
            isError={isError}
            dataType="number"
            onUpdate={onUpdate} />);
        const input = await screen.findByRole("textbox");
        await userEvent.click(input);
        await userEvent.keyboard("\b\b\b300");
        console.log(input.value)
        await fireEvent.blur(input);
        // expect(data[0].price).toEqual(500);
        // debug()
    })

})