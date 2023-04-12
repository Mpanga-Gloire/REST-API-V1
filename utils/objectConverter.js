const userObjConverter = (obj) => {
  const newObj = {
    _id: obj._id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    email: obj.email,
  };

  return newObj;
};

const responseConverter = (obj) => {
  const newObj = {
    email: obj.email,
    name: obj.firstName + " " + obj.lastName,
    isAuthenticated: true,
  };

  return newObj;
};

const productCoverter = (obj) => {
  const reslut = [];

  obj.forEach((ele) => {
    reslut.push(ele.category);
  });

  return reslut;
};

module.exports = {
  userObjConverter,
  responseConverter,
  productCoverter,
};
