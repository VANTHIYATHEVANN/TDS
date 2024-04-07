// import React from "react";
// import {Form, Formik} from "formik";
// import { FormikTextField } from "../../formik";
// import {Button} from "@material-ui/core";
// import styles from "./styles/changePasswordStyles"
// // import Dialog from "@material-ui/core/Dialog"
// //import PropTypes from "prop-types";
// import {initialValues,PasswordSchema} from "./services/changePasswordService";
// //import useLogin from "./hooks/useLogin";
// //import {formSchema, initialValues} from "./services/loginFormService";

// const ChangePassword = () => {
//     // const classes = styles();
//     // const [open, setOpen ] = React.useState(false)
//     // const openHandler= () =>{
//     //     setOpen(true);
//     // }
//     // const close= () =>{
//     //     setOpen(false);
//     // }
//     return (
//         //<Dialog open = {open} onClose = {close}>
//         <div className={classes.loginContainer}>
//             <Formik 
//                     initialValues={initialValues}
//                     //onSubmit={handlePassword}
//                     validationSchema={PasswordSchema}>
//                             <Form className={classes.loginForm}>
//                                 <FormikTextField
//                                     required
//                                     type="password"
//                                     margin="dense"
//                                     name="currentPassword"
//                                     label="Current Password"
//                                 />
//                                 <FormikTextField
//                                     required
//                                     type="password"
//                                     margin="dense"
//                                     name="newPassword"
//                                     label="New Password"
//                                 />
//                                 <FormikTextField
//                                     required
//                                     type="password"
//                                     margin="dense"
//                                     name="confirmPassword"
//                                     label="Confirm Password"
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     type="ChangePassword"
//                                     color="primary"
//                                     className={classes.loginButton}
//                                 >
//                                     ChangePassword
//                                 </Button>
//                             </Form>
//             </Formik>
//         </div>
//        // </Dialog>
//     );
// }


// export default ChangePassword;