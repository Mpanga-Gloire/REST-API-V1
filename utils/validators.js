exports.validateEmail = (email) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(mailFormat)) {
    return true;
  }
  return false;
};

exports.validatePhoneNumber = (contactNumber) => {
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(contactNumber);
};

exports.validateZipCode = (zipcode) => {
  const re = /[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}/;

  return re.test(zipcode);
};
