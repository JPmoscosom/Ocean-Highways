const express = require('express');
const router = express.Router()

const controller = require('../controllers/reservas.controller')

// Crear reserva
router.post('/reservas', async (req, res) => {
    let reserva = req.body
    try {
        let respuesta_db = await controller.crearReserva(reserva)
        let info = respuesta_db.rowCount == 1 ? `Reserva creado: ${reserva.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reserva creado correctamente' : 'No se creo el reserva.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El reserva (${reserva.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})


// Modificar reserva
router.put('/reservas', async (req, res) => {
    let reserva = req.body
    try {
        let respuesta_db = await controller.modificarReserva(reserva)
        let info = respuesta_db.rowCount == 1 ? `Reserva modificado: ${reserva.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reserva modificado correctamente' : 'No se modifico el reserva.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

// Eliminar reserva con un id enviado por parametro
router.delete('/reservas/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarReserva(id)
        let info = respuesta_db.rowCount == 1 ? `Reserva eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reserva eliminado correctamente' : 'No se eliminado el reserva.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

// Consultar reserva
router.get('/reservas/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarReservas(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Reservas consultado', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})

module.exports = router
