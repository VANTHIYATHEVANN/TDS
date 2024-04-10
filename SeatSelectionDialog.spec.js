
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
            duration: "1hr 30mins",
            imdbRating: "7.9",
            poster:""
        },
        slot: {startTime: "start time 1"}
    };
 
    it("Should display the show info", () => {
        const {queryByText, queryByDisplayValue} = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                                               open={openDialog} onClose={onClose}
                                                                               updateShowsRevenue={updateShowRevenue}
                                                                               isadmin={true}/>);
 
        expect(queryByText(selectedShow.movie.name)).toBeTruthy();
        expect(queryByText(selectedShow.movie.plot)).toBeTruthy();
        expect(queryByText(selectedShow.movie.duration)).toBeTruthy();
        expect(queryByText("Seats")).toBeTruthy();
        expect(queryByDisplayValue("1")).toBeTruthy();
    });
 
    it("Should display IMDb rating for respective movie", () => {
        const { queryByText } = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                            open={openDialog} onClose={onClose}
                                                            updateShowsRevenue={updateShowRevenue}
                                                            isadmin={true}/>);
 
            console.log(selectedShow.movie)
            expect(queryByText('IMDb Rating: 7.9')).toBeTruthy();
    });
 
    it("Should display total cost when number of seats is selected", () => {
        const {queryByText, getByDisplayValue} = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                                             open={openDialog} onClose={onClose}
                                                                             updateShowsRevenue={updateShowRevenue}
                                                                             isadmin={true}/>);
 
        expect(queryByText("₹150.00")).toBeTruthy();
        fireEvent.change(getByDisplayValue("1"), {target: {value: '2'}});
 
        expect(queryByText("₹300.00")).toBeTruthy();
    });
    
 
    it("Should display customer details input on next", () => {
        const {getByText} = render(<SeatSelectionDialog selectedShow={selectedShow} open={openDialog}
                                                        onClose={onClose}
                                                        updateShowsRevenue={updateShowRevenue}
                                                        isadmin={true}/>);
 
        expect(getByText("Customer Details is closed")).toBeTruthy();
 
        fireEvent.click(getByText("Next"));
 
        expect(getByText("Customer Details is open")).toBeTruthy();
    });
    it("Should display poster as an icon in the dialog box",async () => {
    const { getByAltText } = await render(<moviePicture/>);
 
    const image = getByAltText('Movie');
 
    expect(image.src).toContain('https://camo.githubusercontent.com/ce4aeeb65d16cc893612014277a5457e0f928d859b83ee36eb362b7e460f5c71/68747470733a2f2f692e696d6775722e636f6d2f5a324d594e626a2e706e672f6c617267655f6d6f7669655f706f737465722e706e67');
    });
});
 