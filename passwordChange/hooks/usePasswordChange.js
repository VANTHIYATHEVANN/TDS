import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/changePasswordStyles"
import apiService from "../../../../helpers/apiService";
import { logout } from "../../../../helpers/authService";


export default () => {
    const classes = styles();
    const [showError, setShowError] = useState(false);
    const [ErrorMsg, setShowErrorMsg] = useState("");
    const errorMessage = () => {
        if (showError) {
            return (
                <Typography variant="body1" color="error" className={classes.passwordErrorMessage}>
                    {ErrorMsg}
                </Typography>
            )
        }
    };

    const handlePasswordChange = async (values) => {
        console.log(values)
        const {currentPassword, newPassword, confirmPassword } = values;
        console.log(newPassword)
        if(newPassword!==confirmPassword){
            setShowError(true);
            setShowErrorMsg("New password and Confirm password did not match");
            return
        }
        const passwordChangeData = {
            currentPassword: currentPassword,
            newPassword: newPassword
          };
          console.log(passwordChangeData)
        try {
            await apiService.post('passwordchange',passwordChangeData);
            setShowError(false);
            alert("Your password has been changed successfully");
            logout();
            window.location.href = '/login';
        } catch (err) {
            console.log(err);
            setShowError(true);
            setShowErrorMsg("Password Change Failed")
            throw err;
        }
    };

    return {
        errorMessage: errorMessage,
        handlePasswordChange: handlePasswordChange
    };
};
