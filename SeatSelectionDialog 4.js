import {Avatar, Button, Dialog, IconButton, Typography} from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContentText";
import React, {useState} from "react";
import styles from "./styles/seatSelectionDialogStyles"
import CustomerDetailsDialog from "./CustomerDetailsDialog";
import {INR_SYMBOL} from "../../Constants";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close"

const SeatSelectionDialog = ({selectedShow, updateShowsRevenue, open, onClose, isadmin}) => {
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [buttonopen,setButtonOpen]=useState(false);
    const [seats, setSeats] = useState(1);
    const classes = styles();

    const handleAvatarClick = () =>{
        setButtonOpen(true);
    }
    const handleClose = () =>{
        onClose();
    }
    const handleButtonClose = () =>{
        setButtonOpen(false);
    }
    const handleImageError=(event,src)=>{
        event.target.src=src
        event.target.style.width='110%';
        event.target.style.height='200%';
        event.target.style.padding= '0px 70px 5px 25px'
    }
    return (
        <>       
            <Dialog open={open}  onClose={handleClose} fullWidth classes={{
                paper: classes.dialogRoot
            }}>
                <div className={classes.container}>
                    <Typography variant="h6" className={classes.dialogHeader}>
                        Select Seats
                    <IconButton class = {classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    </Typography>
                    <div className={classes.dialogContent}>
                        <div className={classes.moviePicture} onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                            <Avatar style={{ height: '75px', width:'50px', objectFit:'contain'}}variant="square">
                                        <img style={{ height: '100%', width:'100%',backgroundColor: 'white',objectFit:'contain'}} src={selectedShow.movie.poster} onError={(e)=>{e.target.src='https://free-icon-rainbow.com/i/icon_00898/icon_008980_256.png' }} alt="Movie"></img>
                            </Avatar> 
                        </div>
                        <Dialog open={buttonopen} onClose={handleButtonClose} fullWidth ={true} maxWidth = "xs" >
                            <h2 align="center">{selectedShow.movie.name} <IconButton class = {classes.closeButton} onClick={handleButtonClose}><CloseIcon /></IconButton></h2>
                            <DialogContent>
                                <img style={{ height: '100%', width:'100%',backgroundColor: 'transparent',padding: '0px 25px 5px 25px'}} src={selectedShow.movie.poster} onError={(event)=>handleImageError(event,'https://free-icon-rainbow.com/i/icon_00898/icon_008980_256.png')} alt="Movie"></img>
            
                            </DialogContent>

                        </Dialog> 
                        <div className={classes.dialogMain}>
                            <Typography className={classes.movieMarquee} color="primary">
                                {selectedShow.movie.name}
                            </Typography>
                            <Typography variant="body2">
                                {selectedShow.movie.plot}
                            </Typography>
                            <Typography variant="subtitle2" color="primary" className={classes.movieMarquee}>
                                {selectedShow.movie.duration}
                            </Typography>
                            <Typography variant="subtitle2" color="initial" className={classes.movieIMDb}>
                                IMDb Rating: {selectedShow.movie.imdbRating}
                            </Typography>
                            <div className={classes.dialogBottom}>
                                <div className={classes.seatsAndAmount}>
                                    <div className={classes.seatsSelector}>
                                        <TextField type="number" label="Seats" defaultValue="1"
                                                   inputProps={{step: "1", min: "1", max: "15"}}
                                                   onChange={(e) => setSeats(e.target.value)}/>
                                    </div>
                                    <Typography variant="subtitle1" color="secondary">
                                        {`${INR_SYMBOL}${(selectedShow.cost * seats).toFixed(2)}`}
                                    </Typography>
                                </div>
                                { isadmin &&   <Button variant="contained" color="primary"
                                            onClick={() => {
                                                setShowCustomerDetails(true);
                                                onClose();
                                            }}
                                            className={classes.dialogButton}>
                                        Next
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
            <CustomerDetailsDialog seats={seats} selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue}
                                   open={showCustomerDetails} onClose={() => {
                handleClose();
                setShowCustomerDetails(false)
            }}/>
        </>
    );
}

SeatSelectionDialog.propTypes = {
    selectedShow: PropTypes.object.isRequired,
    updateShowsRevenue: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SeatSelectionDialog; 