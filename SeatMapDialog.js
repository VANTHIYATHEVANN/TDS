import React, {useState} from "react";
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import {Button} from "@material-ui/core";
import styles from "./styles/seatSelectionDialogStyles";
import { Dialog } from "@material-ui/core";
const Seat=({id,selected,onselect})=>{
    const handleClick=()=>{
        onselect(id);
    };


return(
    <div
        className={`seat ${selected ?'selected':""}`}
        onClick={handleClick}
    >
        {id}
    </div>
)
};

const SeatMapDialog=({isOpen,noofseats,selectedShow,open, hasError,isadmin,updateShowsRevenue,onclose})=>{
    const classes = styles();
    const [selectedSeats,setSelectedSeats]=useState([]);
    const [proceed, setProceed] = useState(false);
    const [seats, setSeats] = useState(1);
    const handleClose = () => {
        setSeats(1);
        setSelectedSeats([]);
        onclose();
      };
    const handleSelectSeat=seatId=>{
        setSelectedSeats(prevSelectedSeats=>prevSelectedSeats.includes(seatId)?prevSelectedSeats.filter(id=>id!==seatId):[...prevSelectedSeats,seatId]);
    };
    const seatsMap=[
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6},
        {id:7},
        {id:8},
        {id:9},
        {id:10}
    ];
    if(!isOpen){
        return null;
    }
    return(

        <>
        <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <div>
                <h1>Seat Map</h1>
        </div>
        <div className={`seat-map-dialog ${open?'open':""}`}>
            <div className="seat-map">
                {seatsMap.map(seat=>(
                    <Seat
                    key={seat.id}
                    id={seat.id}
                    selected={selectedSeats.includes(seat.id)}
                    onselect={handleSelectSeat}
                    />
                ))}
            </div>
            <button onClick={handleClose}>Close</button>
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
            <div>
                Selected Seats: {selectedSeats.join(',')}
            </div>
        </div>
        </Dialog>
        <CustomerDetailsDialog
        seats={seats}
        selectedShow={selectedShow}
        updateShowsRevenue={updateShowsRevenue}
        open={proceed}
        isAdmin={isadmin}
        onClose={() => {
          handleClose();
          setProceed(false);
        }}
      />
        </>
   
    );

};
export default SeatMapDialog;