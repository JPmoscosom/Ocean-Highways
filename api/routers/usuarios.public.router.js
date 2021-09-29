// Consultar usuario login
router.post('/login', async (req, res) => {
    let credenciales = req.body
    try {
        let respuesta_db = await controller.login(credenciales)
        let info = respuesta_db.rowCount == 1 
        let message = respuesta_db.rowCount == 1 ? 'Usuario consultado' : 'No se encontro el usuario.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
  
    }

})
