const jsonwebtoken = require('jsonwebtoken')

SECRET_KEY = '$Wx/8.\,!Nb_V,vv(r>NY<T#)D=fYU>AGwYece}22m:2M&f"W_C+w=2Yh<DuHke'

const crearToken = (payload) => {
    return jsonwebtoken.sign(payload, SECRET_KEY)
}

const validarToken = (payload) => {
    return jsonwebtoken.verify(token,SECRET_KEY)
}

module.exports = {crearToken, validarToken}