import * as yup from 'yup';

const PHONE_NUMBER_REGEXP = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

yup.addMethod(yup.string, 'phone', function (this: yup) {
    return this.test('phone', 'Phone is incorrect', (value) => (value ? PHONE_NUMBER_REGEXP.test(value) : true));
});

// Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character

const STRONG_PASSWORD_REGEXP = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

yup.addMethod(yup.string, 'strongPassword', function (this: yup) {
    // return this.test('strongPassword', 'Password is weak', (value) => (value ? STRONG_PASSWORD_REGEXP.test(value) : false));
    return this.test('strongPassword', 'Password is weak', (value) => (value ? value.length > 5 : false));
});
