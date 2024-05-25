import axios from 'axios'
import { Libro, LibroDetalle } from '../types/models.types'

export const getLibros = async () => {
  const libros = await axios.get<Libro[]>('http://localhost:3000/api/libros')
  return libros.data
}

export const getLibro = async (code: string) => {
  const libro = await axios.get<Libro>(
    `http://localhost:3000/api/libros/${code}`
  )
  return libro.data
}

export const getLibrosDetalle = async () => {
  const libros = await axios.get<LibroDetalle[]>(
    'http://localhost:3000/api/libros/detalle'
  )
  return libros.data
}

export const getLibroDetalle = async (code: string) => {
  const libro = await axios.get<LibroDetalle>(
    `http://localhost:3000/api/libros/detalle/${code}`
  )
  return libro.data
}

export const createLibro = async (data: Libro) => {
  const result = await axios
    .post('http://localhost:3000/api/libros', data)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const deleteLibro = async (code: string) => {
  const result = await axios
    .delete(`http://localhost:3000/api/libros/${code}`)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const updateLibro = async (data: Libro) => {
  const result = await axios
    .patch(`http://localhost:3000/api/libros/${data.codigo_libro}`, {
      nombre_libro: data.nombre_libro,
      existencias: data.existencias,
      precio: data.precio,
      codigo_autor: data.codigo_autor,
      codigo_editorial: data.codigo_editorial,
      id_genero: data.id_genero,
      descripcion: data.descripcion,
    })
    .then((response) => response)
    .catch((error) => error.response)
  return result
}
