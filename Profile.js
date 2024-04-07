import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import {Button, DialogContent} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import profileService from "./services/profileService"
import styles from "./styles/profileStyles"
import styles2 from "./passwordChange/styles/changePasswordStyles.js"
import {Form, Formik} from "formik";
import { FormikTextField } from "../formik";
import { initialValues, PasswordSchema } from "./passwordChange/services/changePasswordService.js";
import usePasswordChange from "./passwordChange/hooks/usePasswordChange.js";
import { Icon } from "react-icons-kit"
import {eye} from "react-icons-kit/feather/eye.js"
import {eyeOff} from "react-icons-kit/feather/eyeOff.js"

const Profile = () => {
    const [userDetails, setUserDetails] = useState({})
    const classes = styles();
    const classes2 = styles2();
    const [open, setOpen] = useState(false)

   const {errorMessage, handlePasswordChange} = usePasswordChange();
    const openHandler = ()=>{
        setOpen(true)
    }
    const closeHandler = () => {
        setOpen(false)
    }

    useEffect(() => {
        profileService.fetchProfile().then(data => {
            setUserDetails(data);
        });
    },[]);

    const [type1, setType1] = useState('password')
    const [type2, setType2] = useState('password')
    const [type3, setType3] = useState('password')
    const [icon1, setIcon1] = useState(eyeOff)
    const [icon2, setIcon2] = useState(eyeOff)
    const [icon3, setIcon3] = useState(eyeOff)

    const handleToggle1 = () =>{
        if(type1 === 'password'){
            setIcon1(eye);
            setType1('text');
        } else {
            setIcon1(eyeOff);
            setType1('password')
        }
    }
    const handleToggle2 = () =>{
        if(type2 === 'password'){
            setIcon2(eye);
            setType2('text');
        } else {
            setIcon2(eyeOff);
            setType2('password')
        }
    }
    const handleToggle3 = () =>{
        if(type3 === 'password'){
            setIcon3(eye);
            setType3('text');
        } else {
            setIcon3(eyeOff);
            setType3('password')
        }
    }



    return (
        <div className={classes.profileContainer}>
            <h2> User Profile </h2>
            <p>
                Name: {userDetails.name}<br/>
                Username: {userDetails.username}<br/>
                Counter No: {userDetails.CounterNumber}
            </p>
            <Button onClick={(openHandler)}

                variant="contained"
                type="submit"
                color="primary"
                className={classes.passwordChangeButton}
            >
                Change Password
            </Button>

            <Dialog open = {open} onClose = {closeHandler}>
                <DialogContent>
                <div className={classes2.passwordContainer}>
                    <Formik 
                    initialValues={initialValues}
                    onSubmit={handlePasswordChange}
                    validationSchema={PasswordSchema}>
                            <Form className={classes2.passwordForm}>
                                <div className = {classes.passwordBox}>
                                <FormikTextField
                                    required
                                    type={type1}
                                    margin="dense"
                                    name="currentPassword"
                                    label="Current Password"
                                />
                                <span class={classes.iconBox} onClick={handleToggle1}>
                                    <Icon icon={icon1} size={15}/>
                                </span>
                                </div>
                                <div class = {classes.passwordBox}>
                                <FormikTextField
                                    required
                                    type={type2}
                                    margin="dense"
                                    name="newPassword"
                                    label="New Password"
                                />
                                <div class={classes.iconBox} onClick={handleToggle2}>
                                    <Icon  icon={icon2} size={15}/>
                                </div>
                                </div>
                                <div class = {classes.passwordBox}>
                                <FormikTextField
                                    required
                                    type={type3}
                                    margin="dense"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                />
                               <span class={classes.iconBox} onClick={handleToggle3}>
                                    <Icon icon={icon3} size={15}/>
                                </span>
                                </div>
                                {
                                    errorMessage()
                                }
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={classes2.passwordButton}
                                >
                                    Change Password
                                </Button>
                            </Form>
                    </Formik>
                 </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Profile