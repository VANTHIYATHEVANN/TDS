//data-testid="avatar-dialog" to the Dialog component
it("Should display poster as an icon in the dialog box", () => {
        const { getByAltText } = render(
            <SeatSelectionDialog
                selectedShow={selectedShow}
                open={openDialog}
                onClose={onClose}
                updateShowsRevenue={updateShowRevenue}
                isadmin={true}
            />
        );

        const image = getByAltText("Movie");

        expect(image.src).toContain(
            "https://camo.githubusercontent.com/ce4aeeb65d16cc893612014277a5457e0f928d859b83ee36eb362b7e460f5c71/68747470733a2f2f692e696d6775722e636f6d2f5a324d594e626a2e706e672f6c617267655f6d6f7669655f706f737465722e706e67"
        );
    });

it("Should render image inside Dialog when opened", () => {
        const { getByAltText, getByTestId } = render(
            <SeatSelectionDialog
                selectedShow={testSelectedShow}
                updateShowsRevenue={testUpdateShowsRevenue}
                open={testOpen}
                onClose={testOnClose}
            />
        );

        fireEvent.click(getByAltText("Movie")); // Open the dialog

        const dialog = getByTestId("avatar-dialog");
        expect(dialog).toBeInTheDocument();

        const avatarImageInDialog = getByAltText("Movie");
        expect(avatarImageInDialog).toBeInTheDocument();
    });
