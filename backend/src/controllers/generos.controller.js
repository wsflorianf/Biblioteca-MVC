import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function listarGeneros(){
    return await prisma.generos.findMany();
}

export async function insertarGenero(genero){
    return await prisma.generos.create({
        data: genero
    })
}

export async function eliminarGenero(id){
    await prisma.generos.delete({
        where: {
            id_genero: id
        }
    })
}

export async function modificarGenero(id, genero){
    return await prisma.generos.update({
        where: {
            id_genero: id
        },
        data: genero
    })
}

export async function obtenerGenero(id){
    return await prisma.generos.findUnique({
        where: {
            id_genero: id
        }
    })
}

export async function totalGeneros(){
    return await prisma.generos.count()
}