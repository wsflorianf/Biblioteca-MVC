import { Router } from "express";
import { eliminarEditorial, insertarEditorial, listarEditoriales, modificarEditorial, obtenerEditorial, totalEditoriales } from "../controllers/editoriales.controller.js";

const router = Router()

router.get('/editoriales', async (req, res) => {
    try {
        const editoriales = await listarEditoriales()
        res.json(editoriales)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los editoriales'})
    }
})

router.post('/editoriales', async (req, res) =>{
    try {
        const editorial = await insertarEditorial(req.body)
        res.json({...editorial, message: 'Editorial creada con éxito'})
    } catch (error) {
        if(error.code==='P2002'){
            res.status(500).json({message: 'Error al crear la editorial. Ya hay una editorial con este código'})
        }else{
            res.status(500).json({message: 'Error al crear la editorial', error})
        }
        
    }
})

router.delete('/editoriales/:codigo', async (req, res) =>{
    try {
        await eliminarEditorial(req.params.codigo)
        res.json({message: 'Editorial eliminada con éxito'})
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar la editorial'})
    }
})

router.patch('/editoriales/:codigo', async (req, res) =>{
    try {
        const editorial = await modificarEditorial(req.params.codigo, req.body)
        res.json({...editorial, message: 'Editorial modificada exitosamente'})
    } catch (error) {
        res.status(500).json({message: 'Error al modificar la editorial'})
    }
})

//Va antes de la ruta /editoriales/:codigo para que se evalúe primero y evitar conflictos
router.get('/editoriales/total', async (req, res) =>{
    try {
        const total = await totalEditoriales()
        res.json({total})
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la cantidad de editoriales'})
    }
})

router.get('/editoriales/:codigo', async (req, res) =>{
    try {
        const editorial = await obtenerEditorial(req.params.codigo)
        res.json(editorial)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la editorial'})
    }
})

export default router