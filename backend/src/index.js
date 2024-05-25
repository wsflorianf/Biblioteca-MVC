import express from 'express'
import librosRoutes from './routes/libros.routes.js'
import autoresRoutes from './routes/autores.routes.js'
import generosRoutes from './routes/generos.routes.js'
import editorialesRoutes from './routes/editoriales.routes.js'
import cors from 'cors'

const PORT = 3000;
const app = express();

app.use(cors())
app.use(express.json())

//Rutas
app.use('/api', librosRoutes)
app.use('/api', autoresRoutes)
app.use('/api', generosRoutes)
app.use('/api', editorialesRoutes)

app.use('/', (req,res)=>{
    res.send('Welcome');
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})