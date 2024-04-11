const validateRegistration = body => {
    const addressRegex =
        /^(?=.*[\u4e00-\u9fa5])[\u4e00-\u9fa5]*(?:[\s\S]*?(?:路|街|路|道|园|区|镇|乡|村|组))(?:[\s\S]*?(?:号|号码|弄|号|室))?[\u4e00-\u9fa5\d]*$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const zipCodeRegex = /^\d{5}$/;
    let errors = {};
    if (body.firstName.trim().length < 2 || !/^[A-Za-z]+$/.test(body.firstName.trim())) {
        errors.firstNameMsg = 'First name must be at least 2 characters';
    }
    if (body.lastName.trim().length < 2 || !/^[A-Za-z]+$/.test(body.lastName.trim())) {
        errors.lastNameMsg = 'Last name must be at least 2 characters';
    }
    if (!addressRegex.test(body.address.trim())) {
        errors.addressMsg = 'Address format is incorrect';
    }
    if (!emailRegex.test(body.email.trim())) {
        errors.emailMsg = 'Invalid Email Address';
    }
    if (
        body.password.trim().length == 0 ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.password.trim())
    ) {
        errors.passwordMsg = 'Invalid Password format';
    }
    if (
        body.confirmPassword.trim().length == 0 ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.confirmPassword.trim())
    ) {
        errors.confirmPasswordMsg = 'Invalid Password format';
    }
    if (body.confirmPassword.trim() !== body.password.trim()) {
        errors.confirmPasswordMsg = 'ConfirmPassword is not match';
    }
    if (!/^\d{5}$/.test(body.zipCode.trim())) {
        errors.zipCodeMsg = 'ZipCode format is xxxxx';
    }
    if (body.city.trim().length < 2 || !/[市]/.test(body.city.trim())) {
        errors.cityMsg = 'City name is incorrect';
    }
    if (body.state.trim().length < 2) {
        errors.stateMsg = 'State is incorrect';
    }
    return errors;
};
const validationLogin = body => {
    let errors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (body.email.trim() == '' || !emailRegex.test(body.email.trim())) {
        errors.emailMsg = 'Invalid Email Address';
    }
    if (
        body.password.trim().length == 0 ||
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(body.password.trim())
    ) {
        errors.passwordMsg = 'Invalid Password format';
    }
    return errors;
};
module.exports = { validateRegistration, validationLogin };
