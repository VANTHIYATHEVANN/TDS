import React, { useState } from "react";
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import { Button } from "@material-ui/core";
import styles from "./styles/seatSelectionDialogStyles";
import { Dialog } from "@material-ui/core";

const Seat = ({ id, selected, onSelect }) => {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div
      className={`seat ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {id}
    </div>
  );
};

const SeatMapDialog = ({
  isOpen,
  noOfSeats,
  selectedShow,
  open,
  hasError,
  isAdmin,
  updateShowsRevenue,
  onclose
}) => {
  const classes = styles();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [proceed, setProceed] = useState(false);

  const handleClose = () => {
    setSelectedSeats([]);
    onclose();
  };

  const handleSelectSeat = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <div>
          <h1>Seat Map</h1>
        </div>
        <div className={`seat-map-dialog ${open ? "open" : ""}`}>
          <div className="seatMap">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="seatColumn">
                {[...Array(10)].map((_, i) => (
                  <Seat
                    key={index * 10 + i + 1}
                    id={index * 10 + i + 1}
                    selected={selectedSeats.includes(index * 10 + i + 1)}
                    onSelect={handleSelectSeat}
                  />
                ))}
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.dialogButton}
            disabled={hasError}
            onClick={() => {
              if (!hasError) {
                setProceed(true);
                onclose();
              }
            }}
          >
            Next
          </Button>
          <div>Selected Seats: {selectedSeats.join(",")}</div>
        </div>
      </Dialog>
      <CustomerDetailsDialog
        seats={selectedSeats.length}
        selectedShow={selectedShow}
        updateShowsRevenue={updateShowsRevenue}
        open={proceed}
        isAdmin={isAdmin}
        onClose={() => {
          setProceed(false);
        }}
      />
    </>
  );
};

export default SeatMapDialog;
