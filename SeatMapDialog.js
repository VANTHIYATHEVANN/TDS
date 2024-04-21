
import React, { useState } from "react";
import {IconButton,Typography} from "@material-ui/core";
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import { Button } from "@material-ui/core";
import styles from "./styles/seatSelectionDialogStyles";
import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
const Seat = ({ id, selected, onSelect }) => {
  const classes=styles();
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <div
      className={classes.seat} 
      onClick={handleClick}
      style={selected ? {backgroundColor:'green'}:{}}
    >
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
      <Typography variant="h6" className={classes.dialogHeader}>
            Select Seats
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
        </Typography>
        <Typography className={classes.movieMarquee} color="primary" align="center">
                {selectedShow.movie.name}
              </Typography>
        <Typography variant="body2" align="center" style={{textDecorationLine:'underline',textDecorationColor:'black',textDecorationThickness:'1.5px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SCREEN THIS WAY!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
        <div className={classes.dialogContent}>
          <div className={classes.seatMap}>
            {[...Array(10)].map((_, index) => (
              <div key={index} className={classes.seatColumn}>
                {[...Array(10)].map((_, i) => (   
                  <div key={i} className={classes.rowContainer}>
                    {index===0 &&
                <span style={{position:'relative',top:'30%'}}>{String.fromCharCode(65+i)}</span>}
                  <Seat
                    key={index * 10 + i + 1}
                    id={index * 10 + i + 1}
                    selected={selectedSeats.includes(index * 10 + i + 1)}
                    onSelect={handleSelectSeat}
                  />
                  {index===4 &&
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                  </div>
                ))}
                <div className={classes.rowLabel}>{index+1}</div>
                
              </div>
              
            ))}
          </div>
        </div>
        <div className={classes.dialogBottom}>
        <Typography
                variant="subtitle2"
                color="initial"
                className={classes.dialogContent}
              >
                &nbsp;&nbsp;Selected Seats: {selectedSeats.join(",")}
              </Typography>
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
        }} />
    </>
  );
}


export default SeatMapDialog;
