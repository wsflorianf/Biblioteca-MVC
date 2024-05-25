import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function listarAutores(){
    return await prisma.autores.findMany();
}

export async function insertarAutor(autor){
    return await prisma.autores.create({
        data: autor
    })
}

export async function eliminarAutor(codigo){
    await prisma.autores.delete({
        where: {
            codigo_autor: codigo
        }
    })
}

export async function modificarAutor(codigo, autor){
    return await prisma.autores.update({
        where: {
            codigo_autor: codigo
        },
        data: autor
    })
}

export async function obtenerAutor(codigo){
    return await prisma.autores.findUnique({
        where: {
            codigo_autor: codigo
        }
    })
}

export async function totalAutores(){
    return await prisma.autores.count()
}