import { Router } from "express";
import { eliminarGenero, insertarGenero, listarGeneros, modificarGenero, obtenerGenero, totalGeneros, } from "../controllers/generos.controller.js";

const router = Router()

router.get('/generos', async (req, res) => {
    try {
        const generos = await listarGeneros()
        res.json(generos)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los generos'})
    }
})

router.post('/generos', async (req, res) =>{
    try {
        req.body.id_genero = Number(req.body.id_genero)
        const genero = await insertarGenero(req.body)
        res.json({...genero, message: 'Genero creado con éxito'})
    } catch (error) {
        if(error.code==='P2002'){
            res.status(500).json({message: 'Error al crear el genero. Ya hay un genero con este id'})
        }else{
            res.status(500).json({message: 'Error al crear el genero'})
        }
        
    }
})

router.delete('/generos/:id', async (req, res) =>{
    try {
        await eliminarGenero(parseInt(req.params.id))
        res.json({message: 'Genero eliminado con éxito'})
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el genero'})
    }
})

router.patch('/generos/:id', async (req, res) =>{
    try {
        const genero = await modificarGenero(parseInt(req.params.id), req.body)
        res.json({...genero, message: 'Genero modificado exitosamente'})
    } catch (error) {
        res.status(500).json({message: 'Error al modificar el genero'})
    }
})

//Va antes de la ruta get /generos/:id para que se evalúe primero y evitar conflictos
router.get('/generos/total', async (req, res) =>{
    try {
        const total = await totalGeneros()
        res.json({total})
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la cantidad de generos'})
    }
})

router.get('/generos/:id', async (req, res) =>{
    try {
        const genero = await obtenerGenero(parseInt(req.params.id))
        res.json(genero)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el genero'})
    }
})

export default router