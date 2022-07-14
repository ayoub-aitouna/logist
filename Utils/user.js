const { BadRequestError, UnauthenticatedError } = require('../errors')

const GetUserById = async(id) => {
    const user = await Mysql.query("select * from users where id = ?", [UserID]);
    if (!user) throw BadRequestError(`could not Retrive User by this ID => ${UserID}`)
    return user[0];
}
module.exports = { GetUserById }