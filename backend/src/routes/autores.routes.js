import { Router } from "express";
import { listarAutores, insertarAutor, eliminarAutor, modificarAutor, obtenerAutor, totalAutores } from "../controllers/autores.controller.js";

const router = Router()

router.get('/autores', async (req, res) => {
    try {
        const autores = await listarAutores()
        res.json(autores)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los autores'})
    }
})

router.post('/autores', async (req, res) =>{
    try {
        const autor = await insertarAutor(req.body)
        res.json({...autor, message: 'Autor registrado exitosamente'})
    } catch (error) {
        if(error.code==='P2002'){
            res.status(500).json({message: 'Error al crear el autor. Ya hay un autor con este código'})
        }else{
            res.status(500).json({message: 'Error al crear el autor'})
        }
        
    }
})

router.delete('/autores/:codigo', async (req, res) =>{
    try {
        await eliminarAutor(req.params.codigo)
        res.json({message: 'Eliminado con éxito'})
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el autor'})
    }
})

router.patch('/autores/:codigo', async (req, res) =>{
    try {
        const autor = await modificarAutor(req.params.codigo, req.body)
        res.json({...autor, message: 'Autor modificado exitosamente'})
    } catch (error) {
        res.status(500).json({message: 'Error al modificar el autor'})
    }
})

//Va antes de la ruta /autores/:codigo para que se evalúe primero y evitar conflictos
router.get('/autores/total', async (req, res) =>{
    try {
        const total = await totalAutores()
        res.json({total})
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la cantidad de autores'})
    }
})

router.get('/autores/:codigo', async (req, res) =>{
    try {
        const autor = await obtenerAutor(req.params.codigo)
        res.json(autor)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el autor'})
    }
})

export default router