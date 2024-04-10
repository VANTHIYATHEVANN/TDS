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
                                        <img style={{ height: '100%', width:'100%',backgroundColor: 'white',objectFit:'contain'}} src={selectedShow.movie.poster} onError={(e)=>{e.target.src='https://camo.githubusercontent.com/ce4aeeb65d16cc893612014277a5457e0f928d859b83ee36eb362b7e460f5c71/68747470733a2f2f692e696d6775722e636f6d2f5a324d594e626a2e706e672f6c617267655f6d6f7669655f706f737465722e706e67' }} alt="Movie"></img>
                            </Avatar>
                        </div>
                        <Dialog open={buttonopen} onClose={handleButtonClose} fullWidth ={true} maxWidth = "xs" >
                            <h2 align="center">{selectedShow.movie.name} <IconButton class = {classes.closeButton} onClick={handleButtonClose}><CloseIcon /></IconButton></h2>
                            <DialogContent>
                            
                                        <img style={{ height: '100%', width:'100%',backgroundColor: 'white', padding: '10px 20px 20px 20px'}} src={selectedShow.movie.poster} onError={(e)=>{e.target.src='https://camo.githubusercontent.com/ce4aeeb65d16cc893612014277a5457e0f928d859b83ee36eb362b7e460f5c71/68747470733a2f2f692e696d6775722e636f6d2f5a324d594e626a2e706e672f6c617267655f6d6f7669655f706f737465722e706e67' }} alt="Movie"></img>
                                
                            
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