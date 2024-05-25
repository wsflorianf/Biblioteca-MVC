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
  import { Editorial } from '../types/models.types'
  import { BarOptionsTypes } from '../types/components.types'
  import { SubmitHandler, useForm } from 'react-hook-form'
  import { AxiosResponse } from 'axios'
import { updateEditorial } from '../services/editorialService'
import { ResponseEditorial } from '../types/response.types'
  
  interface CompProps {
    open: boolean
    setOpen: (value: boolean) => void
    editorial: Editorial|undefined
    setEditoriales: React.Dispatch<React.SetStateAction<Editorial[]>>
    setBarOptions: React.Dispatch<React.SetStateAction<BarOptionsTypes>>
  }
  
  export default function EditEditorialDialog({
    open,
    setOpen,
    editorial,
    setEditoriales,
    setBarOptions,
  }: CompProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Editorial>()

    const closeEditOpen = () => {
        setOpen(false)
      }
  
    const editEditorialSubmit: SubmitHandler<Editorial> = async (data) => {
      const response: AxiosResponse<ResponseEditorial> = await updateEditorial(data)
  
      if (response?.status === 200) {
        const { codigo_editorial, nombre_editorial, contacto, telefono } = response.data
        setEditoriales((prevEditoriales)=>{
            const otherEditoriales = prevEditoriales.filter(ed=>ed.codigo_editorial !== codigo_editorial)
            return [...otherEditoriales, {codigo_editorial, nombre_editorial, contacto, telefono }]
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
          onSubmit: handleSubmit(editEditorialSubmit),
          sx: { padding: '18px' },
        }}
      >
        <DialogTitle variant='h5' fontWeight='bolder'>
        Editando Editorial
        </DialogTitle>
        <DialogContent>
          <Stack gap={'10px'}>
            <Alert severity='info'>* Campos Requeridos.</Alert>
            <TextField
              variant='filled'
              required
              label='Código de la editorial'
              placeholder='ED000'
              InputProps={{
                readOnly: true
              }}
              value={editorial?.codigo_editorial}
              {...register('codigo_editorial', {
                required: true,
                pattern: {
                  value: /^ED\d\d?\d?$/,
                  message: 'El código no cumple el formato (ED000).',
                },
              })}
              error={errors.codigo_editorial ? true : false}
              helperText={errors.codigo_editorial?.message}
            ></TextField>
            <TextField
              variant='filled'
              required
              label='Nombre de la editorial'
              defaultValue={editorial?.nombre_editorial}
              {...register('nombre_editorial', {
                required: true,
              })}
            ></TextField>
            <TextField
              variant='filled'
              required
              label='Contacto'
              defaultValue={editorial?.contacto}
              {...register('contacto', {
                required: true,
              })}
            ></TextField>
            <TextField
              variant='filled'
              required
              label='Telefono'
              defaultValue={editorial?.telefono}
              {...register('telefono', {
                required: true,
                pattern: {
                    value: /^\d+$/,
                    message: 'El teléfono no es válido'
                },
                minLength: {
                    value: 7,
                    message: 'Debe contener más de 7 dígitos'
                },
                maxLength: {
                    value: 9,
                    message: 'Debe contener menos de 9 dígitos'
                }
              })}
              error={errors.telefono ? true : false}
              helperText={errors.telefono?.message}
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
  