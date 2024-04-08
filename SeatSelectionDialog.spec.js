import React from "react";
import {fireEvent, render} from "@testing-library/react";
import SeatSelectionDialog from "./SeatSelectionDialog";

jest.mock("./CustomerDetailsDialog", () => {
    return ({open}) => <div>Customer Details is {open ? "open" : "closed"}</div>
});

describe("Basic rendering and functionality", () => {
    const openDialog = true;
    const onClose = jest.fn();
    const updateShowRevenue = jest.fn();

    const selectedShow = {
        id: 1,
        cost: 150,
        movie: {
            name: "Movie 1",
            plot: "Suspense movie",
            duration: "1hr 30m"
        },
        slot: {startTime: "start time 1"}
    };

    it("Should display the show info", () => {
        const {queryByText, queryByDisplayValue} = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                                               open={openDialog} onClose={onClose}
                                                                               updateShowsRevenue={updateShowRevenue}/>);

        expect(queryByText(selectedShow.movie.name)).toBeTruthy();
        expect(queryByText(selectedShow.movie.plot)).toBeTruthy();
        expect(queryByText(selectedShow.movie.duration)).toBeTruthy();
        expect(queryByText("Seats")).toBeTruthy();
        expect(queryByDisplayValue("1")).toBeTruthy();
    });

    it("Should display total cost when number of seats is selected", () => {
        const {queryByText, getByDisplayValue} = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                                             open={openDialog} onClose={onClose}
                                                                             updateShowsRevenue={updateShowRevenue}/>);

        expect(queryByText("₹150.00")).toBeTruthy();
        fireEvent.change(getByDisplayValue("1"), {target: {value: '2'}});

        expect(queryByText("₹300.00")).toBeTruthy();
    });

    it("Should display customer details input on next", () => {
        const {getByText} = render(<SeatSelectionDialog selectedShow={selectedShow} open={openDialog}
                                                        onClose={onClose}
                                                        updateShowsRevenue={updateShowRevenue}/>);

        expect(getByText("Customer Details is closed")).toBeTruthy();

        fireEvent.click(getByText("Next"));

        expect(getByText("Customer Details is open")).toBeTruthy();
    });
});
