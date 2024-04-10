import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Shows from "./Shows";
import {when} from "jest-when";
import {dateFromSearchString, nextDateLocation, previousDateLocation} from "./services/dateService";
import useShows from "./hooks/useShows";
import SeatSelectionDialog from "./SeatSelectionDialog";
import useShowsRevenue from "./hooks/useShowsRevenue";
import {shallow} from "enzyme";
import ShowsRevenue from "./ShowsRevenue";
 
jest.mock("./services/dateService", () => ({
    dateFromSearchString: jest.fn(),
    nextDateLocation: jest.fn(),
    previousDateLocation: jest.fn()
}));
 
jest.mock("./hooks/useShows", () => ({
    __esModule: true,
    default: jest.fn()
}));
 
jest.mock("./hooks/useShowsRevenue", () => ({
    __esModule: true,
    default: jest.fn()
}));
 
jest.mock("./SeatSelectionDialog", () => {
    return () => <div>SeatSelection</div>;
});
 
describe("Basic rendering and functionality", () => {
    let testHistory;
    let testLocation;
    let testShowDate;
 
    beforeEach(() => {
        testHistory = {
            push: jest.fn()
        };
 
        testLocation = {
            search: "testSearch"
        };
 
        testShowDate = {
            format: jest.fn()
        };
 
        when(dateFromSearchString).calledWith("testSearch").mockReturnValue(testShowDate);
        when(nextDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Next Location");
        when(previousDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Previous Location");
        when(testShowDate.format).calledWith("Do MMM YYYY").mockReturnValue("Show Date");
        when(useShows).calledWith(testShowDate).mockReturnValue({
            showsLoading: false,
            shows: [
                {
                    id: 1,
                    cost: 150,
                    movie: {name: "Movie 1", imdb: "7.5"},
                    slot: {startTime: "start time 1"}
                }, {
                    id: 2,
                    cost: 160,
                    movie: {name: "Movie 2", imdb: "8.9"},
                    slot: {startTime: "start time 2"}
                }
            ]
        });
        when(useShowsRevenue).calledWith(testShowDate).mockReturnValue({
            showsRevenue: 549.99,
            showsRevenueLoading: false
        });
    });
 
    it("Should display the show info", () => {
        const shows = render(<Shows history={testHistory} location={testLocation} isAdmin={true}/>);
 
        shows.getByText("Shows (Show Date)");
 
        shows.getByText("Movie 1");
        shows.getByText("start time 1");
        shows.getByText("₹150");
 
        shows.getByText("Movie 2");
        shows.getByText("start time 2");
        shows.getByText("₹160");
    });
 
    it("Should push to history if next or previous clicked", () => {
        const shows = render(<Shows history={testHistory} location={testLocation} isAdmin={true}/>);
 
        const previousDayButton = shows.getByText("Previous Day");
        const nextDayButton = shows.getByText("Next Day");
 
        fireEvent.click(previousDayButton);
        fireEvent.click(nextDayButton);
 
        expect(testHistory.push).toBeCalledTimes(2);
        expect(testHistory.push).toHaveBeenNthCalledWith(1, "Previous Location");
        expect(testHistory.push).toHaveBeenNthCalledWith(2, "Next Location");
    });
 
    it("Should display seat selection when a show is selected", () => {
        const {getByText, queryByText} = render(<Shows history={testHistory} location={testLocation} isAdmin={true}/>);
 
        expect(queryByText("SeatSelectionDialog")).toBeNull();
 
        fireEvent.click(getByText("Movie 1"));
 
        expect(getByText("SeatSelection")).toBeTruthy();
    });
 
    it("Should display revenue when rendered", () => {
        const shows = shallow(<Shows history={testHistory} location={testLocation} isAdmin={true}/>);
 
        const showsRevenue = shows.find(ShowsRevenue);
 
        expect(showsRevenue.prop("showsRevenue")).toBe(549.99);
        expect(showsRevenue.prop("showsRevenueLoading")).toBe(false);
    });
});
 
describe("Unauthorized actions and access", () => {
    let testHistory;
    let testLocation;
    let testShowDate;
 
    beforeEach(() => {
        testHistory = {
            push: jest.fn()
        };
 
        testLocation = {
            search: "testSearch"
        };
 
        testShowDate = {
            format: jest.fn()
        };
 
        when(dateFromSearchString).calledWith("testSearch").mockReturnValue(testShowDate);
        when(nextDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Next Location");
        when(previousDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Previous Location");
        when(testShowDate.format).calledWith("Do MMM YYYY").mockReturnValue("Show Date");
        when(useShows).calledWith(testShowDate).mockReturnValue({
            showsLoading: false,
            shows: [
                {
                    id: 1,
                    cost: 150,
                    movie: {name: "Movie 1"},
                    slot: {startTime: "start time 1"}
                }, {
                    id: 2,
                    cost: 160,
                    movie: {name: "Movie 2"},
                    slot: {startTime: "start time 2"}
                }
            ]
        });
        when(useShowsRevenue).calledWith(testShowDate).mockReturnValue({
            showsRevenue: 549.99,
            showsRevenueLoading: false
        });
    });
 
    it("Should show revenue if user is admin", () => {
        const shows = shallow(<Shows history={testHistory} location={testLocation} isAdmin={true}/>);
 
        const showsRevenue = shows.find(ShowsRevenue);
 
        expect(showsRevenue.prop("showsRevenue")).toBe(549.99);
        expect(showsRevenue.prop("showsRevenueLoading")).toBe(false);
    })
 
    it("Should NOT show revenue if user is non-admin", () => {
        const shows = render(<Shows history={testHistory} location={testLocation} isAdmin={false}/>);
 
        const showsRevenue = shows.queryByText('Revenue');
 
        expect(showsRevenue).toBeNull();
    })
 
    it("Should proceed to booking window when clicked on Show Div by Admin", () => {
        const {getByText, queryByText} = render(<Shows history={testHistory} location={testLocation} isAdmin={true}/>);
 
        expect(queryByText("SeatSelectionDialog")).toBeNull();
 
        fireEvent.click(getByText("Movie 1"));
 
        expect(getByText("SeatSelection")).toBeTruthy();
    })
 
    it("Should NOT proceed to booking window when clicked by non-admin", () => {
        const shows = render(<Shows history={testHistory} location={testLocation} isAdmin={false}/>);
 
        // expect(shows.queryByText("SeatSelectionDialog")).toBeNull();
 
        fireEvent.click(shows.getByText("Movie 1"));
 
        expect(shows.queryByText("SeatSelectionDialog")).toBeNull();
    })
})