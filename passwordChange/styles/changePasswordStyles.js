import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        passwordContainer: {
            display: "flex",
            justifyContent: "center",
            padding: "20px 40px"
        },
        passwordForm: {
            display: "flex",
            flexDirection: "column"
        },
        passwordButton: {
            marginTop: "15px"
        },
        passwordErrorMessage: {
            marginTop: "8px"
        }
    })
);