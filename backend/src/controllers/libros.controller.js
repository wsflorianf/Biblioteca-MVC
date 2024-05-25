import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function listarLibros(){
    return await prisma.libros.findMany();
}

export async function listarLibrosDetalle(){
    const librosDetalle = await prisma.$queryRaw`SELECT lib.codigo_libro, lib.nombre_libro, lib.existencias, lib.precio, aut.nombre_autor, ed.nombre_editorial, gen.nombre_genero, lib.descripcion
    FROM libros AS lib JOIN autores AS aut JOIN generos AS gen INNER JOIN editoriales AS ed
    WHERE lib.codigo_autor = aut.codigo_autor AND lib.id_genero=gen.id_genero AND lib.codigo_editorial=ed.codigo_editorial;`

    return librosDetalle
}

export async function insertarLibro(libro){
    return await prisma.libros.create({
        data: libro
    })
}

export async function eliminarLibro(codigo){
    await prisma.libros.delete({
        where: {
            codigo_libro: codigo
        }
    })
}

export async function modificarLibro(codigo, libro){
    return await prisma.libros.update({
        where: {
            codigo_libro: codigo
        },
        data: libro
    })
}

export async function detalleLibro(codigo){
    const libroDetalle = await prisma.$queryRaw`SELECT lib.codigo_libro, lib.nombre_libro, lib.existencias, lib.precio, aut.nombre_autor, ed.nombre_editorial, gen.nombre_genero, lib.descripcion
    FROM libros AS lib JOIN autores AS aut JOIN generos AS gen INNER JOIN editoriales AS ed
    WHERE codigo_libro=${codigo} AND lib.codigo_autor = aut.codigo_autor AND lib.id_genero=gen.id_genero AND lib.codigo_editorial=ed.codigo_editorial LIMIT 1;`

    return libroDetalle[0]
}

export async function obtenerLibro(codigo){
    return await prisma.libros.findUnique({
        where: {
            codigo_libro: codigo
        }
    })
}

export async function totalLibros(){
    return await prisma.libros.count()
}