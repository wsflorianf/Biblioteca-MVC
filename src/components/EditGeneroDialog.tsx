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
import { updateGenero } from '../services/generoService'
import { ResponseGenero } from '../types/response.types'

interface CompProps {
  open: boolean
  setOpen: (value: boolean) => void
  genero: Genero|undefined
  setGeneros: React.Dispatch<React.SetStateAction<Genero[]>>
  setBarOptions: React.Dispatch<React.SetStateAction<BarOptionsTypes>>
}

export default function EditGeneroDialog({
  open,
  setOpen,
  genero,
  setGeneros,
  setBarOptions,
}: CompProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Genero>()

  const closeEditOpen = () => {
    setOpen(false)
  }

  const newGeneroSubmit: SubmitHandler<Genero> = async (data) => {
    const response: AxiosResponse<ResponseGenero> = await updateGenero(data)

    if (response?.status === 200) {
      const { id_genero, nombre_genero, descripcion } = response.data
      setGeneros((prevGeneros) => {
        const otherGeneros = prevGeneros.filter(
          (ed) => ed.id_genero !== id_genero
        )
        return [...otherGeneros, { id_genero, nombre_genero, descripcion }]
      })
      closeEditOpen()
    }

    setBarOptions({
      open: true,
      message: response ? response.data.message : 'Conexión rechazada',
      color: response?.status === 200 ? 'success' : 'error',
    })
  }

  return (
    <Dialog
      onClose={closeEditOpen}
      open={open}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(newGeneroSubmit),
        sx: { padding: '18px' },
      }}
    >
      <DialogTitle variant='h5' fontWeight='bolder'>
        Editando Genero
      </DialogTitle>
      <DialogContent>
        <Stack gap={'10px'}>
          <Alert severity='info'>* Campos Requeridos.</Alert>
          <TextField
            variant='filled'
            required
            label='Id del genero'
            placeholder='0'
            InputProps={{
                readOnly: true
              }}
              value={genero?.id_genero}
            {...register('id_genero', {
              required: true,
              pattern: {
                value: /^\d+$/,
                message: 'El id debe ser un número.',
              },
            })}
            error={errors.id_genero ? true : false}
            helperText={errors.id_genero?.message}
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Nombre del genero'
            defaultValue={genero?.nombre_genero}
            {...register('nombre_genero', {
              required: true,
            })}
          ></TextField>
          <TextField
            variant='filled'
            required
            label='Descripción'
            defaultValue={genero?.descripcion}
            {...register('descripcion', {
              required: true,
            })}
          ></TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <Button type='submit' variant='contained'>
          Guardar
        </Button>
        <Button onClick={closeEditOpen} variant='contained' color='error'>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
