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
  import { Autor } from '../types/models.types'
  import { BarOptionsTypes } from '../types/components.types'
  import { SubmitHandler, useForm } from 'react-hook-form'
  import { AxiosResponse } from 'axios'
  import { updateAutor } from '../services/autorService'
  import { ResponseAutor } from '../types/response.types'
  
  interface CompProps {
    open: boolean
    setOpen: (value: boolean) => void
    autor: Autor|undefined
    setAutores: React.Dispatch<React.SetStateAction<Autor[]>>
    setBarOptions: React.Dispatch<React.SetStateAction<BarOptionsTypes>>
  }
  
  export default function EditAutorDialog({
    open,
    setOpen,
    autor,
    setAutores,
    setBarOptions,
  }: CompProps) {
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Autor>()
  
    const closeEditOpen = () => {
      setOpen(false)
    }
  
    const editAutorSubmit: SubmitHandler<Autor> = async (data) => {
      const response: AxiosResponse<ResponseAutor> = await updateAutor(data)
  
      if (response?.status === 200) {
        const { codigo_autor, nombre_autor, nacionalidad } = response.data
        setAutores((prevAutores)=>{
            const otherAutors = prevAutores.filter(autor=>autor.codigo_autor !== codigo_autor)
            return [...otherAutors, { codigo_autor, nombre_autor, nacionalidad }]
        })
        closeEditOpen()
      }
  
      setBarOptions({
        open: true,
        message: response?response.data.message:'Conexión rechazada',
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
          onSubmit: handleSubmit(editAutorSubmit),
          sx: { padding: '18px' },
        }}
      >
        <DialogTitle variant='h5' fontWeight='bolder'>
          Editando Autor
        </DialogTitle>
        <DialogContent>
          <Stack gap={'10px'}>
            <Alert severity='info'>* Campos Requeridos.</Alert>
            <TextField
              variant='filled'
              required
              label='Código del autor'
              placeholder='AUT000'
              InputProps={{
                readOnly: true
              }}
              value={autor?.codigo_autor}
              {...register('codigo_autor', {
                required: true,
                pattern: {
                  value: /^AUT\d\d\d$/,
                  message: 'El código no cumple el formato (AUT000).',
                },
              })}
              error={errors.codigo_autor ? true : false}
              helperText={errors.codigo_autor?.message}
            ></TextField>
            <TextField
              variant='filled'
              required
              label='Nombre del autor'
              {...register('nombre_autor', {
                required: true,
              })}
              defaultValue={autor?.nombre_autor}
            ></TextField>
            <TextField
              variant='filled'
              required
              label='Nacionalidad'
              {...register('nacionalidad', {
                required: true,
              })}
              defaultValue={autor?.nacionalidad}
            ></TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button
            type='submit'
            variant='contained'
          >
            Guardar
          </Button>
          <Button onClick={closeEditOpen} variant='contained' color='error'>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  