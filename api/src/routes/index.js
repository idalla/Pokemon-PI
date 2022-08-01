const { Router } = require('express')
const Poke = require('./Middlewares/Poke.js')
const pokeTypes = require('./Middlewares/PokeTypes.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', Poke)
router.use('/types', pokeTypes)

module.exports = router
