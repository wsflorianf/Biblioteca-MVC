import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { Genero } from '../types/models.types'
import { BarOptionsTypes } from '../types/components.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'
import { createGenero } from '../services/generoService'
import { ResponseGenero } from '../types/response.types'

interface CompProps {
  open: boolean
  setOpen: (value: boolean) => void
  generos: Genero[]
  setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>
  setBarOptions: React.Dispatch<React.SetStateAction<BarOptionsTypes>>
}

export default function NewGeneroDialog({
  open,
  setOpen,
  generos,
  setGeneros,
  setBarOptions,
}: CompProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Genero>()

  const closeNewOpen = () => {
    setOpen(false)
  }

  const newGeneroSubmit: SubmitHandler<Genero> = async (data) => {
    console.log(data)
    const response: AxiosResponse<ResponseGenero> = await createGenero(data)
    if (response?.status === 200) {
      const { id_genero, nombre_genero, descripcion } = response.data
      setGeneros([...generos, { id_genero, nombre_genero, descripcion }])
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
        onSubmit: handleSubmit(newGeneroSubmit),
        sx: { padding: '18px' },
      }}
    >
      <DialogTitle variant='h5' fontWeight='bolder'>
        Nuevo Genero
      </DialogTitle>
      <DialogContent>
        <Stack gap={'10px'}>
          <Alert severity='info'>* Campos Requeridos.</Alert>
          <TextField
            variant='filled'
            label='Id del genero'
            type='number'
            placeholder='0'
            {...register('id_genero', {
              required: false,
              pattern: {
                value: /^\d+$/,
                message: 'El id debe ser un número.',
              },
              min: {
                value: 0,
                message: 'El id debe ser positivo',
              },
            })}
            error={errors.id_genero ? true : false}
            helperText={
              errors.id_genero
                ? errors.id_genero.message
                : 'Valor automático si no se especifica'
            }
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Nombre del genero'
            {...register('nombre_genero', {
              required: true,
            })}
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Descripción'
            {...register('descripcion', {
              required: true,
            })}
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
