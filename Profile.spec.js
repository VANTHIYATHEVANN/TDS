import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import React from "react";
import profileService from "./services/profileService";
import { Button, Dialog } from "@material-ui/core";
import { shallow } from "enzyme";

jest.mock('./services/profileService.js', () => ({
    __esModule: true,
    default: {
        fetchProfile: jest.fn(),
    },
}));

describe("Profile component", () => {
    
    it("should display profile details", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };

        profileService.fetchProfile.mockResolvedValue(data);

        const { queryByDisplayValue } = render(<Profile />);

        await waitFor(() => {
            expect(queryByDisplayValue("User Profile")).toBeInTheDocument();
            expect(queryByDisplayValue("Name: Admin User 1")).toBeInTheDocument();
            expect(queryByDisplayValue("Username: seed-user-1")).toBeInTheDocument();
            expect(queryByDisplayValue("Counter No: 1")).toBeInTheDocument();
        });
    });

    it("should open password change dialog on button click", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };

        profileService.fetchProfile.mockResolvedValue(data);

        const profileComponent = shallow(<Profile />);
        expect(profileComponent.find(Dialog)).toHaveLength(1);

        await waitFor(() => {
            const ButtonChangePassword = profileComponent.find(Button).at(0);
            ButtonChangePassword.simulate('click');
            expect(profileComponent.find(Dialog)).toHaveLength(1);
        });
    });

    it("should not open password change dialog when not clicked on 'Change Password'", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };

        profileService.fetchProfile.mockResolvedValue(data);

        const profileComponent = shallow(<Profile />);

        await waitFor(() => {
            expect(profileComponent.find(Dialog)).toHaveLength(1);
        });
    });

    it("should submit password change form with valid data", async () => {
         const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };

        profileService.fetchProfile.mockResolvedValue(data);

        const { getByText, getByLabelText } = render(<Profile />);

        await waitFor(() => {
            fireEvent.click(getByText("Change Password"));
        });

        const currentPasswordField = getByLabelText("Current Password");
        const newPasswordField = getByLabelText("New Password");
        const confirmPasswordField = getByLabelText("Confirm Password");

        fireEvent.change(currentPasswordField, { target: { value: "oldPassword" } });
        fireEvent.change(newPasswordField, { target: { value: "newPassword" } });
        fireEvent.change(confirmPasswordField, { target: { value: "newPassword" } });

        fireEvent.submit(getByText("Change Password"));
    });

    it("should toggle password visibility", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };

        profileService.fetchProfile.mockResolvedValue(data);

        const { getByLabelText, getByTestId } = render(<Profile />);

        await waitFor(() => {
            fireEvent.click(getByLabelText("Show current password"));
            fireEvent.click(getByLabelText("Show new password"));
            fireEvent.click(getByLabelText("Show confirm password"));
        });

        const currentPasswordField = getByTestId("current-password-field");
        const newPasswordField = getByTestId("new-password-field");
        const confirmPasswordField = getByTestId("confirm-password-field");

        expect(currentPasswordField.type).toBe("text");
        expect(newPasswordField.type).toBe("text");
        expect(confirmPasswordField.type).toBe("text");
    });

    it("should display error message for invalid form submission", async () => {
        const data = {
            name: "Admin User 1",
            username: "seed-user-1",
            CounterNumber: 1,
        };

        profileService.fetchProfile.mockResolvedValue(data);

        const { getByText, getByLabelText } = render(<Profile />);

        await waitFor(() => {
            fireEvent.click(getByText("Change Password"));
        });

        const currentPasswordField = getByLabelText("Current Password");
        const newPasswordField = getByLabelText("New Password");
        const confirmPasswordField = getByLabelText("Confirm Password");

        fireEvent.change(currentPasswordField, { target: { value: "oldPassword" } });
        fireEvent.change(newPasswordField, { target: { value: "newPassword" } });
        fireEvent.change(confirmPasswordField, { target: { value: "invalidConfirmPassword" } });

        fireEvent.submit(getByText("Change Password"));
    });
});
