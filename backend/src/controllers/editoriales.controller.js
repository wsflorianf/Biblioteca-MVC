import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function listarEditoriales(){
    return await prisma.editoriales.findMany();
}

export async function insertarEditorial(editorial){
    return await prisma.editoriales.create({
        data: editorial
    })
}

export async function eliminarEditorial(codigo){
    await prisma.editoriales.delete({
        where: {
            codigo_editorial: codigo
        }
    })
}

export async function modificarEditorial(codigo, editorial){
    return await prisma.editoriales.update({
        where: {
            codigo_editorial: codigo
        },
        data: editorial
    })
}

export async function obtenerEditorial(codigo){
    return await prisma.editoriales.findUnique({
        where: {
            codigo_editorial: codigo
        }
    })
}

export async function totalEditoriales(){
    return await prisma.editoriales.count()
}