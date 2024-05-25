import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import {
  Autor,
  Editorial,
  Genero,
  Libro,
  LibroDetalle,
} from '../types/models.types'
import { BarOptionsTypes } from '../types/components.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import { ResponseLibro } from '../types/response.types'
import { createLibro, getLibroDetalle } from '../services/libroService'
import { useEffect, useState } from 'react'
import { getAutores } from '../services/autorService'
import { getEditoriales } from '../services/editorialService'
import { getGeneros } from '../services/generoService'

interface CompProps {
  open: boolean
  setOpen: (value: boolean) => void
  libros: LibroDetalle[]
  setLibros: React.Dispatch<React.SetStateAction<LibroDetalle[]>>
  setBarOptions: React.Dispatch<React.SetStateAction<BarOptionsTypes>>
}

export default function NewLibroDialog({
  open,
  setOpen,
  libros,
  setLibros,
  setBarOptions,
}: CompProps) {
  const [autores, setAutores] = useState<Autor[]>([])
  const [editoriales, setEditoriales] = useState<Editorial[]>([])
  const [generos, setGeneros] = useState<Genero[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Libro>()

  const closeNewOpen = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setAutores(await getAutores())
      setEditoriales(await getEditoriales())
      setGeneros(await getGeneros())
    }
    fetchData()
  }, [])

  const newLibroSubmit: SubmitHandler<Libro> = async (data) => {
    const response: AxiosResponse<ResponseLibro> = await createLibro(data)

    if (response?.status === 200) {
      const libroAdded: LibroDetalle = await getLibroDetalle(
        response.data.codigo_libro
      )
      setLibros([...libros, libroAdded])
      closeNewOpen()
    }

    setBarOptions({
      open: true,
      message: response ? response.data.message : 'Conexión rechazada',
      color: response?.status === 200 ? 'success' : 'error',
    })
  }

  return (
    <Dialog
      onClose={closeNewOpen}
      open={open}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(newLibroSubmit),
        sx: { padding: '18px' },
      }}
    >
      <DialogTitle variant='h5' fontWeight='bolder'>
        Nuevo Libro
      </DialogTitle>
      <DialogContent>
        <Stack gap={'10px'}>
          <Alert severity='info'>* Campos Requeridos.</Alert>
          <TextField
            variant='filled'
            required
            label='Código del libro'
            placeholder='L#'
            {...register('codigo_libro', {
              required: true,
              pattern: {
                value: /^L\d{1,8}$/,
                message: 'El código no cumple el formato.',
              },
              maxLength: {
                value: 9,
                message: 'Máximo 9 caracteres',
              },
            })}
            error={errors.codigo_libro ? true : false}
            helperText={errors.codigo_libro?.message}
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Nombre del libro'
            {...register('nombre_libro', {
              required: true,
            })}
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Existencias'
            type='number'
            {...register('existencias', {
              required: true,
              minLength: {
                value: 0,
                message: 'Cantidad no válida',
              },
            })}
            error={errors.existencias ? true : false}
            helperText={errors.existencias?.message}
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Precio'
            type='number'
            inputProps={{
              step: 0.01,
            }}
            {...register('precio', {
              required: true,
              minLength: {
                value: 0,
                message: 'Cantidad no válida',
              },
            })}
            error={errors.precio? true : false}
            helperText={errors.precio?.message}
          ></TextField>
          <FormControl required>
            <InputLabel>Autor</InputLabel>
            <Select
              required
              variant='filled'
              label='Autor'
              defaultValue={''}
              {...register('codigo_autor', {
                required: true,
              })}
            >
              {autores.map((autor) => {
                return (
                  <MenuItem key={autor.codigo_autor} value={autor.codigo_autor}>
                    {autor.nombre_autor}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <FormControl required>
            <InputLabel>Editorial</InputLabel>
            <Select
              required
              variant='filled'
              label='Editorial'
              defaultValue={''}
              {...register('codigo_editorial', {
                required: true,
              })}
            >
              {editoriales.map((editorial) => {
                return (
                  <MenuItem key={editorial.codigo_editorial} value={editorial.codigo_editorial}>
                    {editorial.nombre_editorial}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel>Genero</InputLabel>
            <Select
              required
              variant='filled'
              defaultValue={''}
              label='Genero'
              {...register('id_genero', {
                required: true,
              })}
            >
              {generos.map((genero) => {
                return (
                  <MenuItem key={genero.id_genero} value={genero.id_genero}>
                    {genero.nombre_genero}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <TextField
            multiline
            maxRows={4}
            variant='filled'
            label='Descripción'
            {...register('descripcion')}
          ></TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <Button type='submit' variant='contained'>
          Crear
        </Button>
        <Button onClick={closeNewOpen} variant='contained' color='error'>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
