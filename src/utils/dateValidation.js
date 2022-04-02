//Checks that date input does not include out of range month and/or year.
const dateValidation = (month, year) => {
    const today = new Date();
    if ((month >= 0 && month <= 11) && (year >= 2021 && year <= today.getFullYear())) {
        return true;
    }
    return false;
};

module.exports = dateValidation;