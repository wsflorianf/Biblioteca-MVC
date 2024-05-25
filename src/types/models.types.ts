export interface Autor {
  codigo_autor: string
  nombre_autor: string
  nacionalidad: string
}

export interface Genero {
  id_genero: number
  nombre_genero: string
  descripcion: string
}

export interface Editorial {
  codigo_editorial: string
  nombre_editorial: string
  contacto: string
  telefono: string
}

export interface Libro {
  codigo_libro: string
  nombre_libro: string
  existencias: number
  precio: number
  codigo_autor: string
  codigo_editorial: string
  id_genero: number
  descripcion: string
}

export interface LibroDetalle {
  codigo_libro: string
  nombre_libro: string
  existencias: number
  precio: number
  nombre_autor: string
  nombre_editorial: string
  nombre_genero: string
  descripcion: string
}