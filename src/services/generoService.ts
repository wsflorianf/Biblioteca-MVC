import axios from 'axios'
import { Genero } from '../types/models.types'

export const getGeneros = async () => {
  const generos = await axios.get<Genero[]>(
    'http://localhost:3000/api/generos'
  )
  return generos.data
}

export const createGenero = async (data: Genero) => {
  const result = await axios
    .post('http://localhost:3000/api/generos', data)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const deleteGenero = async (code: number) => {
  const result = await axios
    .delete(`http://localhost:3000/api/generos/${code}`)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const updateGenero = async (data: Genero) => {
  const result = await axios
    .patch(`http://localhost:3000/api/generos/${data.id_genero}`, {
        nombre_genero: data.nombre_genero,
        descripcion: data.descripcion,
    })
    .then((response) => response)
    .catch((error) => error.response)
  return result
}
