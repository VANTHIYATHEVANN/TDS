import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        dialogRoot: {
            overflow: "hidden",
            minHeight: "30vh",
            maxHeight: "80vh"
        },
        container: {
            display: "flex",
            flexDirection: "column"
        },
        dialogHeader: {
            fontWeight: "bold",
            padding: "10px 0px 20px 10px"
        },
        dialogContent: {
            display: "flex",
            flexDirection: "row"
        },
        moviePicture: {
            display: "flex",
            justifyContent: "center",
            minWidth: "15%"
        },
        dialogMain: {
            display: "flex",
            padding: "0px 20px 20px 0px",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "85%",
            maxWidth: "85%"
        },
        movieMarquee: {
            fontWeight: "bold"
        },
        seatsAndAmount: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "33%"
        },
        seatsSelector: {
            maxWidth: "30%"
        },
        dialogBottom: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "20px 0px 0px 0px"
        },
        dialogButton: {
            marginLeft: "15px"
        },
        ele_inline: {
            display: "inline"
        },
        closeButton: {
            position: "absolute",
            backgroundColor: "transparent",
            border: "none",
            right: 0,
            top: 0,
            paddingTop: "15px",
            paddingRight: "15px",
        },
        seat: {
            width: "30px",
            height: "30px",
            border: "1px solid #ccc",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px",
            cursor: "pointer"
        },
        selected: {
            backgroundColor: "#007bff",
            color: "#fff"
        },
        seatMap: {
            display: "flex",
            flexWrap: "wrap"
        },
        seatColumn: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "20px" 
        }
  
    })
);
