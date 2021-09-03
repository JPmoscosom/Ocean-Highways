const express = require('express');
const router = express.Router()

const controller = require('../controllers/lugares.controller')

// Crear lugar
router.post('/lugares', async (req, res) => {
    let lugar = req.body
    try {
        let respuesta_db = await controller.crearLugar(lugar)
        let info = respuesta_db.rowCount == 1 ? `Lugar creado: ${lugar.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Lugar creado correctamente' : 'No se creo el lugar.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El lugar (${lugar.id}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }
})


// Modificar lugar
router.put('/lugares', async (req, res) => {
    let lugar = req.body
    try {
        let respuesta_db = await controller.modificarLugar(lugar)
        let info = respuesta_db.rowCount == 1 ? `Lugar modificado: ${lugar.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Lugar modificado correctamente' : 'No se modifico el lugar.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

// Eliminar lugar con un id enviado por parametro
router.delete('/lugares/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarLugar(id)
        let info = respuesta_db.rowCount == 1 ? `Lugar eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Lugar eliminado correctamente' : 'No se eliminado el lugar.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

// Consultar lugar
router.get('/lugares/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarLugares(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'Lugares consultado', info })
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })

})

module.exports = router
