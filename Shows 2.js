import React, {useState} from "react";
import {
    Avatar,
    Backdrop,
    Button,
    CircularProgress,
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

export default ({location, history}) => {
    const classes = styles();

    const showsDate = dateFromSearchString(location.search);
    const {shows, showsLoading} = useShows(showsDate);
    const {showsRevenue, updateShowsRevenue, showsRevenueLoading} = useShowsRevenue(showsDate);
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
        setAvatarImage(null);
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
                <ShowsRevenue showsRevenue={showsRevenue} showsRevenueLoading={showsRevenueLoading}/>
            </div>
            <List className={classes.listRoot}>
                
                {
                    shows && shows.map(show => (
                        
                        <div key={show.id} className={classes.showContainer}>
                            <div>{console.log(shows)}</div>
                            <ListItem style={{cursor: 'pointer'}} onClick={() => 
                                handleShowItemClick(show)
                            }>
                                <ListItemAvatar classes={{root: classes.localMoviesIcon}} onClick={(event) => handleAvatarClick(event,show)}>
                                    <Avatar style={{ height: '50px', width:'50px' }}src={show.movie.poster} variant="square">
                                        <LocalMoviesIcon/>
                                    </Avatar> 
                                </ListItemAvatar> 
                                <Dialog open={avatarDialogOpen} onClose={handleCloseAvatarDialog} onClick={(event)=>handleOverlayClick(event)}>
                                    <h2 align="center">{avatarName}<button onClick={(event)=>handleCloseAvatarDialog(event)}>&#10005;</button></h2>
                                    <DialogContent>
                                        <img src={avatarImage} alt="Movie Poster"/>
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
                                            color="initial"
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

            <SeatSelectionDialog selectedShow={selectedShow} updateShowsRevenue={updateShowsRevenue}
                                 open={showSelectSeatDialog}
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