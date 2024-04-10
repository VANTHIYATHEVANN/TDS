import React, {useState} from "react";
import {
    Avatar,
    Backdrop,
    Button,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import styles from "./styles/showsStyles"
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useShows from "./hooks/useShows";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {HEADER_DATE_FORMAT, INR_SYMBOL} from "../../Constants"
import {dateFromSearchString, nextDateLocation, previousDateLocation} from "./services/dateService";
import ShowsRevenue from "./ShowsRevenue";
import useShowsRevenue from "./hooks/useShowsRevenue";  
import SeatSelectionDialog from "./SeatSelectionDialog";
// import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
 
export default ({location, history, isAdmin}) => {
    const classes = styles();
 
    const showsDate = dateFromSearchString(location.search);
    const {shows, showsLoading} = useShows(showsDate);
    const {showsRevenue, updateShowsRevenue, showsRevenueLoading} = useShowsRevenue(showsDate, isAdmin);
    const [showSelectSeatDialog, setShowSelectSeatDialog] = useState(false);
 
    const emptyShow = {
        "id": "",
        "date": "",
        "cost": "",
        "movie": {
            "id": "",
            "name": "",
            "duration": "",
            "plot": "",
            "poster":""
        },
        "slot": {
            "id": "",
            "name": "",
            "startTime": "",
            "endTime": ""
        }
    };
    const [selectedShow, setSelectedShow] = useState(emptyShow);
    const [avatarDialogOpen,setAvatarDialogOpen]=useState(false);
    const [avatarImage,setAvatarImage]=useState(null);
    const [avatarName,setAvatarName]=useState(null);
    
    const handleShowItemClick = (show) => {
        setSelectedShow(show);
        setShowSelectSeatDialog(true);
    };
 
    const handleAvatarClick = (event,show) => {
        event.stopPropagation()
        setAvatarImage(show.movie.poster);
       setAvatarDialogOpen(true);
        setAvatarName(show.movie.name);
    };
 
    const handleCloseAvatarDialog = (event) =>{
        event.stopPropagation()
        setAvatarDialogOpen(false);
 
    };
 
    const handleOverlayClick = (event) =>{
        event.stopPropagation()
    }
 
    return (
        <>
            <div className={classes.cardHeader}>
                <Typography variant="h4" className={classes.showsHeader}>
                    Shows ({showsDate.format(HEADER_DATE_FORMAT)})
                </Typography>
                {isAdmin && <ShowsRevenue showsRevenue={showsRevenue} showsRevenueLoading={showsRevenueLoading}/>}
            </div>
            <List className={classes.listRoot}>
                
                {
                    shows && shows.map(show => (
 
                        <div key={show.id} className={classes.showContainer}>
                            <ListItem style={{cursor: 'pointer'}} onClick={() =>
                                handleShowItemClick(show)
                            }>
                      
 
                                <ListItemAvatar classes={{root: classes.localMoviesIcon}} onClick={(event) => handleAvatarClick(event,show)}>
                                    <Avatar style={{ height: '75px', width:'50px', objectFit:'contain'}}variant="square">
                                        <img style={{ height: '100%', width:'100%',backgroundColor: 'white',objectFit:'contain'}} src={show.movie.poster} onError={(e)=>{e.target.src='https://camo.githubusercontent.com/ce4aeeb65d16cc893612014277a5457e0f928d859b83ee36eb362b7e460f5c71/68747470733a2f2f692e696d6775722e636f6d2f5a324d594e626a2e706e672f6c617267655f6d6f7669655f706f737465722e706e67' }} alt="Movie"></img>
                                    </Avatar>
                                    </ListItemAvatar>
 
                                <Dialog open={avatarDialogOpen} onClose={handleCloseAvatarDialog} onClick={(event)=>handleOverlayClick(event)} fullWidth = {true} maxWidth= "xs" BackdropProps={{ style: {backgroundColor: 'rgba(0,0,0,0.05)'}}} >
                                    <h2 align="center">{avatarName}</h2>
                                    
                                    <IconButton class = {classes.closeButton} onClick={(event)=>handleCloseAvatarDialog(event)}>
                                        <CloseIcon />
                                    </IconButton>
                                    
                                    <DialogContent style={{ backgroundColor: 'rgba(255,255,255,0.8)', boxShadow: 'none'}}>
                                        <Avatar
                                            style={{
                                                height: '100%',
                                                width:'100%',
                                                padding: '10px 0.5px 20px 0.5px',
                                                backgroundColor: 'transparent',
                                                objectFit:'contain'
                                            }}
                                            src={avatarImage}
                                            onError={(e) => {
                                                e.target.src='https://camo.githubusercontent.com/ce4aeeb65d16cc893612014277a5457e0f928d859b83ee36eb362b7e460f5c71/68747470733a2f2f692e696d6775722e636f6d2f5a324d594e626a2e706e672f6c617267655f6d6f7669655f706f737465722e706e67' }}
                                            variant="square"
                                        >
                                            <img style={{ height: '100%', width:'100%', padding: '5px 0px 5px 15px',backgroundColor: 'white',objectFit:'contain'}} src={avatarImage}  alt="Movie"></img>
                                            
                                            <LocalMoviesIcon/>
                                        </Avatar>
                                    </DialogContent>
                                </Dialog>
 
                                <ListItemText primary={show.movie.name} secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.slotTime}
                                            color="textPrimary"
                                        >
                                            {show.slot.startTime}
                                        </Typography>
                                        <br />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className="MovieIMDb"
                                            color="textPrimary"
                                        >
                                            IMDb Rating: {show.movie.imdbRating}
                                        </Typography>
                                       
                                    
                                    </>
                                }/>
                                <ListItemText primary={`${INR_SYMBOL}${show.cost}`} className={classes.price}
                                              primaryTypographyProps={{variant: 'h6', color: 'secondary'}}
                                />
                            </ListItem>
                        </div>
                    ))
                }
            </List>
 
 
            <SeatSelectionDialog selectedShow={selectedShow} updateShowsRevenue={isAdmin ? updateShowsRevenue : () => {}}
                                 open={showSelectSeatDialog} isadmin={isAdmin}
                                 onClose={() => setShowSelectSeatDialog(false)}/>
 
            <div className={classes.buttons}>
                <Button
                    onClick={() => {
                        history.push(previousDateLocation(location, showsDate));
                    }}
                    startIcon={<ArrowBackIcon/>}
                    color="primary"
                    className={classes.navigationButton}
                >
                    Previous Day
                </Button>
                <Button
                    onClick={() => {
                        history.push(nextDateLocation(location, showsDate));
                    }}
                    endIcon={<ArrowForwardIcon/>}
                    color="primary"
                    className={classes.navigationButton}
                >
                    Next Day
                </Button>
            </div>
            <Backdrop className={classes.backdrop} open={showsLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};