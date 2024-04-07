import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import React from "react";
import profileService from "./services/profileService";
import {when} from "jest-when";
import { __esModule } from "yup";
import { Button, Dialog, TextField } from "@material-ui/core";
import {shallow} from "enzyme";
//import { FormikTextField } from "../formik";
 
jest.mock('./services/profileService.js', () => ({
    __esModule: true,
    default: {
        fetchProfile: jest.fn(),
    },
}));
 
 
describe("Basic rendering", () => {
    
    it("Should display profile details", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };
 
        profileService.fetchProfile.mockResolvedValue(data)
 
        const {queryByDisplayValue} = render(<Profile/>)
 
        await waitFor (() => {
            expect(queryByDisplayValue("User Profile"))
            expect(queryByDisplayValue("Name: Admin User 1"))
            expect(queryByDisplayValue("Username: seed-user-1"))
            expect(queryByDisplayValue("Counter No: 1"))
        })
 
    });
    it("Should open password change popup window on click in profile page", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };
 
        profileService.fetchProfile.mockResolvedValue(data)
 
        render(<Profile />);
        
        await waitFor (() => {
            fireEvent.click(screen.getAllByText('Change Password')[0])
            expect(screen.getByText('Confirm Password')).toBeTruthy();
        })
 
    });
    it("Should not open password change popup window when not clicked on change password in profile page", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };
 
        profileService.fetchProfile.mockResolvedValue(data)
 
        render(<Profile />);
 
        await waitFor (() => {
            const confirmButton = screen.queryAllByText('Confirm Password')
            expect(confirmButton).toBeNull;
        })
 
    });
 
    it("New password and confirm password should match", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };
 
        profileService.fetchProfile.mockResolvedValue(data)
 
        render(<Profile />);
 
        await waitFor(() => {
            fireEvent.click(screen.getAllByText("Change Password")[0]);
 
            const currentPasswordField = screen.getAllByRole("input")[0];
 
            fireEvent.change(currentPasswordField, { target: { value: "hello@123" } });
 
            const ErrMsg = screen.queryAllByText('Password must contain a capital letter')
            expect(ErrMsg).toBeInTheDocument();
        });
 
    });
 
 
});