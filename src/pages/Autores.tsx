import { Alert, Button, Snackbar, Typography } from '@mui/material'
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Autor } from '../types/models.types'
import { deleteAutor, getAutores } from '../services/autorService'
import { BarOptionsTypes } from '../types/components.types'
import NewAutorDialog from '../components/NewAutorDialog'
import { AxiosResponse } from 'axios'
import { ResponseAutor } from '../types/response.types'
import EditAutorDialog from '../components/EditAutorDialog'
import StyledDataGrid from '../styled-components/StyledDataGrid'
import { DeleteButton, EditButton } from '../styled-components/Buttons'
import { confirm } from 'material-ui-confirm'

export default function Autores() {
  const [autores, setAutores] = useState<Autor[]>([])
  const [loading, setLoading] = useState(true)
  const [actualAutor, setActualAutor] = useState<Autor>()

  const [barOptions, setBarOptions] = useState<BarOptionsTypes>({
    open: false,
    message: '',
    color: 'success',
  })
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const autores = await getAutores()
        setAutores(autores) 
      } catch (error) {
        setBarOptions({
          open: true,
          message: 'Conexión rechazada',
          color: 'error',
        })
      }finally {
        setLoading(false)
      }
    }

    fetchAutores()
  }, [])

  const clickNewOpen = () => {
    setNewOpen(true)
  }

  const deleteThisAutor = async (id: string) => {
    const response: AxiosResponse<ResponseAutor> = await deleteAutor(id)

    if (response.status === 200) {
      setAutores(autores.filter((autor) => autor.codigo_autor !== id))
    }

    setBarOptions({
      open: true,
      message: response.data.message,
      color: response.status === 200 ? 'success' : 'error',
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'codigo_autor',
      type: 'string',
      headerName: 'Código',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    { field: 'nombre_autor', type: 'string', headerName: 'Nombre', flex: 1 },
    {
      field: 'nacionalidad',
      type: 'string',
      headerName: 'Nacionalidad',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'operaciones',
      type: 'actions',
      headerName: 'Operaciones',
      flex: 0.8,
      getActions: ({ id, row }: { id: GridRowId; row: Autor }) => {
        return [
          <GridActionsCellItem
            icon={<EditButton/>}
            label='Editar'
            
            onClick={() => {
              setActualAutor(row)
              setEditOpen(true)
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteButton/>}
            label='Borrar'
            onClick={() => {
              confirm({description: `¿Desea eliminar la editorial "${row.nombre_autor}"?`})
                .then(() => {
                  deleteThisAutor(id.toString())
                })
                .catch()
            }}
          />,
        ]
      },
    },
  ]

  return (
    <div className='page' id='auotres-page'>
      <Typography gutterBottom variant='h4'>
        Lista Autores
      </Typography>
      <Button onClick={clickNewOpen} variant='contained'>
        Nuevo Autor
      </Button>
      <div
        style={{
          height: '100%',
          width: 800,
          maxWidth: '100%',
          alignSelf: 'center',
          margin: '10px',
        }}
      >
        
        <StyledDataGrid
          columns={columns}
          rows={autores}
          getRowHeight={() => 'auto'}
          autoHeight         
          getRowId={(row)=>{return row.codigo_autor}} 
          loading={loading}
          getCellClassName={()=>'cell-theme'}
          getRowClassName={(params)=>params.indexRelativeToCurrentPage % 2 === 0 ? 'theme-even' : 'theme-odd'}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting:{
              sortModel: [{field: 'codigo_autor', sort: 'asc'}]
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>

      {/* BAR INFO */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={barOptions.open}
        autoHideDuration={5000}
        onClose={() => setBarOptions({ ...barOptions, open: false })}
      >
        <Alert variant='filled' severity={barOptions.color}>
          {barOptions.message}
        </Alert>
      </Snackbar>

      {/* DIALOG NEW AUTOR*/}
      <NewAutorDialog
        autores={autores}
        open={newOpen}
        setAutores={setAutores}
        setBarOptions={setBarOptions}
        setOpen={setNewOpen}
      />

      {/* DIALOG EDIT AUTOR*/}
      {editOpen && (
        <EditAutorDialog
          autor={actualAutor}
          open={editOpen}
          setAutores={setAutores}
          setBarOptions={setBarOptions}
          setOpen={setEditOpen}
        />
      )}
    </div>
  )
}
