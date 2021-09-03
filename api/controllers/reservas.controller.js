const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()




const crearReserva = async (reserva) => {
    const sql = 'INSERT INTO public.reservas (id, nombre, pais, ciudad, direccion) VALUES($1, $2, $3, $4, $5);'
    const datos = [reserva.id, reserva.nombre, reserva.pais, reserva.ciudad, reserva.direccion]
    return await _pg.ejecutarQuery(sql, datos)
}



const consultarReservas = async (id) => {
    let sql = 'SELECT nombre, pais, ciudad, direccion, id  FROM reservas'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarReserva = async (id) => {
    const sql = 'DELETE FROM public.reservas WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarReserva = async (reserva) => {
    const sql = `UPDATE public.reservas SET nombre=$1, pais=$2, ciudad=$3  WHERE id=$4;`
    const datos = [reserva.nombre, reserva.pais, reserva.ciudad, reserva.id]
    return await _pg.ejecutarQuery(sql, datos)
}


module.exports = {  modificarReserva, eliminarReserva, crearReserva, consultarReservas }
