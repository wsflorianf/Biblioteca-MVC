import axios from 'axios'
import { Editorial } from '../types/models.types'

export const getEditoriales = async () => {
  const editoriales = await axios.get<Editorial[]>(
    'http://localhost:3000/api/editoriales'
  )
  return editoriales.data
}

export const createEditorial = async (data: Editorial) => {
  const result = await axios
    .post('http://localhost:3000/api/editoriales', data)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const deleteEditorial = async (code: string) => {
  const result = await axios
    .delete(`http://localhost:3000/api/editoriales/${code}`)
    .then((response) => response)
    .catch((error) => error.response)
  return result
}

export const updateEditorial = async (data: Editorial) => {
  const result = await axios
    .patch(`http://localhost:3000/api/editoriales/${data.codigo_editorial}`, {
      nombre_editorial: data.nombre_editorial,
      contacto: data.contacto,
      telefono: data.telefono,
    })
    .then((response) => response)
    .catch((error) => error.response)
  return result
}
