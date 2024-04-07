import {object, string} from "yup";

export const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
};

export const PasswordSchema = object({
    currentPassword: string()
    .required('No password provided.'),
    // .matches( /^(?=.*[!@#$%^&*()_+])/, 'Password must contain a special character')
    // .matches( /^(?=.*\d)/, 'Password must contain a digit')
    // .matches( /^(?=.*[A-Z])/, 'Password must contain a capital letter')
    // .min(8, 'Password should be atleast 8 characters long')
    // .max(64, 'Password should be atmost 64 characters long'),
    newPassword: string()
    .required('No password provided.')
    .matches( /^(?=.*[!@#$%^&*()_+])/, 'Password must contain a special character')
    .matches( /^(?=.*\d)/, 'Password must contain a digit')
    .matches( /^(?=.*[A-Z])/, 'Password must contain a capital letter')
    .min(8, 'Password should be atleast 8 characters long')
    .max(64, 'Password should be atmost 64 characters long'),
    confirmPassword: string()
    .required('No password provided.')
    .matches( /^(?=.*[!@#$%^&*()_+])/, 'Password must contain a special character')
    .matches( /^(?=.*\d)/, 'Password must contain a digit')
    .matches( /^(?=.*[A-Z])/, 'Password must contain a capital letter')
    .min(8, 'Password should be atleast 8 characters long')
    .max(64, 'Password should be atmost 64 characters long')
    });

