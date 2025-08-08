import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET)
  return token
}

export const isEmpty = (val) => {
  if (
    !val.length ||
    !Object.keys(val).length ||
    val === undefined ||
    val === null
  ) {
    return true;
  }
  return false;
};