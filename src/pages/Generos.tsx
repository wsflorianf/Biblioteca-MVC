import { Alert, Button, Snackbar, Typography } from '@mui/material'
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Genero } from '../types/models.types'
import { BarOptionsTypes } from '../types/components.types'
import { AxiosResponse } from 'axios'
import { deleteGenero, getGeneros } from '../services/generoService'
import NewGeneroDialog from '../components/NewGeneroDialog'
import EditGeneroDialog from '../components/EditGeneroDialog'
import { ResponseGenero } from '../types/response.types'
import { DeleteButton, EditButton } from '../styled-components/Buttons'
import StyledDataGrid from '../styled-components/StyledDataGrid'

export default function Generos() {
  const [generos, setGeneros] = useState<Genero[]>([])
  const [loading, setLoading] = useState(true)
  const [actualGenero, setActualGenero] = useState<Genero>()

  const [barOptions, setBarOptions] = useState<BarOptionsTypes>({
    open: false,
    message: '',
    color: 'success',
  })
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const generos = await getGeneros()
        setGeneros(generos) 
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

    fetchGeneros()
  }, [])

  const clickNewOpen = () => {
    setNewOpen(true)
  }

  const deleteThisGenero = async (id: number) => {
    const response: AxiosResponse<ResponseGenero> = await deleteGenero(id)

    if (response.status === 200) {
      setGeneros(generos.filter((genero) => genero.id_genero !== id))
    }

    setBarOptions({
      open: true,
      message: response.data.message,
      color: response.status === 200 ? 'success' : 'error',
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'id_genero',
      type: 'number',
      headerName: 'Código',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    { field: 'nombre_genero', type: 'string', headerName: 'Nombre', flex: 0.7 },
    {
      field: 'descripcion',
      type: 'string',
      headerName: 'Descripción',
      flex: 2,
      disableColumnMenu: true,
    },
    {
      field: 'operaciones',
      type: 'actions',
      headerName: 'Operaciones',
      flex: 1,
      getActions: ({ id, row }: { id: GridRowId; row: Genero }) => {
        return [
          <GridActionsCellItem
          icon={<EditButton/>}
            label='Editar'
            onClick={() => {
              setActualGenero(row)
              setEditOpen(true)
            }}
          />,
          <GridActionsCellItem
          icon={<DeleteButton/>}
            label='Borrar'
            onClick={() => {
              deleteThisGenero(parseInt(id.toString()))
            }}
          />,
        ]
      },
    },
  ]

  return (
    <div className='page' id='auotres-page'>
      <Typography gutterBottom variant='h4'>
        Lista Generos
      </Typography>
      <Button onClick={clickNewOpen} variant='contained'>
        Nuevo Genero
      </Button>
      <div
        style={{
          height: '100%',
          width: 1000,
          maxWidth: '100%',
          alignSelf: 'center',
          margin: '10px',
        }}
      >
        <StyledDataGrid
          columns={columns}
          rows={generos}
          autoHeight
          getRowId={(row) => row.id_genero}
          loading={loading}
          getRowHeight={() => 'auto'}
          getCellClassName={()=>'cell-theme'}
          getRowClassName={(params)=>params.indexRelativeToCurrentPage % 2 === 0 ? 'theme-even' : 'theme-odd'}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting:{
              sortModel: [{field: 'id_genero', sort: 'asc'}]
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

      {/* DIALOG NEW GENERO*/}
      <NewGeneroDialog
        generos={generos}
        open={newOpen}
        setGeneros={setGeneros}
        setBarOptions={setBarOptions}
        setOpen={setNewOpen}
      />

      {/* DIALOG EDIT GENERO*/}
      {editOpen && (
        <EditGeneroDialog
          genero={actualGenero}
          open={editOpen}
          setGeneros={setGeneros}
          setBarOptions={setBarOptions}
          setOpen={setEditOpen}
        />
      )}
    </div>
  )
}
