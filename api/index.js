
// IMPORTAR FRAMEWORK DE EXPRESS
const express = require('express')

// Inicializar el express
const app = express()

app.use(express.json())

// IMPORTAR RUTAS
const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)

const router_lugar =  require('./routers/lugares.router');
app.use(router_lugar)

const router_reservas =  require('./routers/reservas.router');
app.use(router_reservas)


// Definir el puerto donde se ejecuta el API
const port = 3000

// Inicializar el API
app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})
