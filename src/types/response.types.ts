import { Autor, Editorial, Genero, Libro, LibroDetalle } from './models.types'

export interface ResponseAutor extends Autor {
  message: string
}

export interface ResponseLibro extends Libro {
  message: string
}

export interface ResponseEditorial extends Editorial {
  message: string
}

export interface ResponseGenero extends Genero {
  message: string
}

export interface ResponseLibroDetalle extends LibroDetalle {
  message: string
}