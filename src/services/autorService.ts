import axios from 'axios'
import { Autor } from '../types/models.types'

export const getAutores = async () => {
  const autores = await axios.get<Autor[]>('http://localhost:3000/api/autores')
  return autores.data
}

export const createAutor = async (data: Autor) => {
  const result = await axios
    .post('http://localhost:3000/api/autores', data)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const deleteAutor = async (code: string) => {
  const result = await axios
    .delete(`http://localhost:3000/api/autores/${code}`)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const updateAutor = async (data: Autor) => {
  const result = await axios
    .patch(`http://localhost:3000/api/autores/${data.codigo_autor}`, {
      nombre_autor: data.nombre_autor,
      nacionalidad: data.nacionalidad,
    })
    .then((response) => response)
    .catch((error) => error.response)
  return result
}
