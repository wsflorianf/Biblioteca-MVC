import { Router } from 'express'
import {
  detalleLibro,
  eliminarLibro,
  insertarLibro,
  listarLibros,
  listarLibrosDetalle,
  modificarLibro,
  obtenerLibro,
  totalLibros,
} from '../controllers/libros.controller.js'

const router = Router()

router.get('/libros', async (req, res) => {
  try {
    const libros = await listarLibros()
    res.json(libros)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros' })
  }
})

router.get('/libros/detalle', async (req, res) => {
  try {
    const libros = await listarLibrosDetalle()
    res.json(libros)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los libros' })
  }
})

router.post('/libros', async (req, res) => {
  try {
    req.body.existencias = Number(req.body.existencias)
    req.body.precio = Number(req.body.precio)
    req.body.id_genero = Number(req.body.id_genero)
    const libro = await insertarLibro(req.body)
    res.json({ ...libro, message: 'Libro creado con éxito' })
  } catch (error) {
    if (error.code === 'P2002') {
      res
        .status(500)
        .json({
          message: 'Error al crear el libro. Ya hay un libro con este código',
        })
    } else {
      res.status(500).json({ message: 'Error al crear el libro' })
    }
  }
})

router.delete('/libros/:codigo', async (req, res) => {
  try {
    await eliminarLibro(req.params.codigo)
    res.json({ message: 'Libro eliminado con éxito' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el libro' })
  }
})

router.patch('/libros/:codigo', async (req, res) => {
  try {
    req.body.existencias = Number(req.body.existencias)
    req.body.precio = Number(req.body.precio)
    req.body.id_genero = Number(req.body.id_genero)
    const libro = await modificarLibro(req.params.codigo, req.body)
    res.json({ ...libro, message: 'Libro modificado exitosamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar el libro' })
  }
})

//Va antes de la ruta /libros/:codigo para que se evalúe primero y evitar conflictos
router.get('/libros/total', async (req, res) => {
  try {
    const total = await totalLibros()
    res.json({ total })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cantidad de libros' })
  }
})

router.get('/libros/:codigo', async (req, res) => {
  try {
    const libro = await obtenerLibro(req.params.codigo)
    res.json(libro)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro' })
  }
})

router.get('/libros/detalle/:codigo', async (req, res) => {
  try {
    const libro = await detalleLibro(req.params.codigo)
    res.json(libro)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el libro' })
  }
})

export default router
