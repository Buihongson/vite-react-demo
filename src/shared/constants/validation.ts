import * as yup from 'yup';

export const bankAccountSchema = yup.object().shape({
    accountName: yup.string().required('Account name is required'),
    bank: yup.object().required('Bank selection is required').nullable(),
    accountNo: yup.string()
        .required('Account number is required')
        .matches(/^[0-9]+$/, 'Account number must contain only numbers')
        .min(5, 'Account number must be at least 5 digits')
        .max(20, 'Account number cannot exceed 20 digits'),
    type: yup.object().required('Bank selection is required').nullable(),
});

export const changePasswordSchema = yup.object().shape({
    password: yup.string().required('Account name is required'),
    newPassword: yup.string().required('Password is required'),
    passwordConf: yup.string()
        .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match').required('Password is required'),
});

export const bankAccountNotBankSchema = yup.object().shape({
    accountName: yup.string().notRequired(),
    bank: yup.object().notRequired().nullable(),
    accountNo: yup.string()
        .required('Account number is required')
        .matches(/^[0-9]+$/, 'Account number must contain only numbers')
        .min(5, 'Account number must be at least 5 digits')
        .max(20, 'Account number cannot exceed 20 digits'),
    type: yup.object().required('Bank selection is required').nullable(),
});
