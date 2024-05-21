import { default as axios } from "axios";
import { expect, jest } from "@jest/globals";
import { fireEvent, screen, waitFor } from "@testing-library/react";

const changeMapping = async () => {
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: "MatrixForm[{{-5}, {5}, {1}}]" }));
    fireEvent.change(screen.getByTestId("mapping-cell-row-1-col-2"), { target: { value: '5' } })
    await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
}

const changeCommaBasis = async () => {
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: "MatrixForm[{{1, 0, -4}, {0, 1, 5}}]" }));
    fireEvent.change(screen.getByTestId("comma-basis-cell-col-0-row-1"), { target: { value: '-5' } })
    await waitFor(() => expect(screen.queryByText('loading...')).not.toBeTruthy());
}

export {
    changeMapping,
    changeCommaBasis,
}
