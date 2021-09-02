const PostgresService = require('../services/postgres.service');
const _pg = new PostgresService()



const crearLugar = async (Lugar) => {
    const sql = 'INSERT INTO public.lugares (id, nombre, pais, ciudad, direccion) VALUES($1, $2, $3, $4, $5);'
    const datos = [lugar.id, lugar.nombre, lugar.pais, lugar.ciudad, lugar.direccion]
    return await _pg.ejecutarQuery(sql, datos)
}



const consultarLugares = async (id) => {
    let sql = 'SELECT nombre, pais, ciudad, direccion, id  FROM lugars'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql, datos)
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

const eliminarLugar = async (id) => {
    const sql = 'DELETE FROM public.lugares WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarLugar = async (lugar) => {
    const sql = `UPDATE public.lugares SET nombre=$1, pais=$2, ciudad=$3  WHERE id=$4;`
    const datos = [lugar.nombre, lugar.pais, lugar.ciudad, lugar.id]
    return await _pg.ejecutarQuery(sql, datos)
}
