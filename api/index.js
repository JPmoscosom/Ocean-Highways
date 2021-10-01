
// IMPORTAR FRAMEWORK DE EXPRESS
const express = require('express')

// Inicializar el express
const app = express()

app.use(express.json())

// IMPORTAR RUTAS PUBLICAS

const router_public_usuario =  require('./routers/usuarios.public.router');
app.use(router_public_usuario)

// const router_public_lugar =  require('./routers/lugares.router');
// app.use(router_lugar)

// const router_public_reservas =  require('./routers/reservas.router');
// app.use(router_reservas)

//*********** MIDDLEWARE JWT */
const auth_middleware = require('./controllers/auth.middleware');
app.use('/', auth_middleware.validarTokenMiddleware)


// IMPORTAR RUTAS PRIVADAS
const router_usuario =  require('./routers/usuarios.router');
app.use(router_usuario)

const router_lugar =  require('./routers/lugares.router');
app.use(router_lugar)

const router_reservas =  require('./routers/reservas.router');
app.use(router_reservas)


// Definir el puerto donde se ejecuta el API
const port = 3001

// Inicializar el API
app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})
