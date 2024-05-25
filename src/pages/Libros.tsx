import { Alert, Button, Snackbar, Typography } from '@mui/material'
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Libro, LibroDetalle } from '../types/models.types'
import {
  deleteLibro,
  getLibro,
  getLibrosDetalle,
} from '../services/libroService'
import { BarOptionsTypes } from '../types/components.types'
import { AxiosResponse } from 'axios'
import { ResponseLibroDetalle } from '../types/response.types'
import NewLibroDialog from '../components/NewLibroDialog'
import EditLibroDialog from '../components/EditLibroDialog'
import { copPrice } from '../utils/priceFormat'
import { DeleteButton, EditButton } from '../styled-components/Buttons'
import StyledDataGrid from '../styled-components/StyledDataGrid'
import { confirm } from 'material-ui-confirm'

export default function Libros() {
  const [libros, setLibros] = useState<LibroDetalle[]>([])
  const [actualLibro, setActualLibro] = useState<Libro>()
  const [loading, setLoading] = useState(true)

  const [barOptions, setBarOptions] = useState<BarOptionsTypes>({
    open: false,
    message: '',
    color: 'success',
  })
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const libros = await getLibrosDetalle()
        setLibros(libros)
      } catch (error) {
        setBarOptions({
          open: true,
          message: 'Conexión rechazada',
          color: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLibros()
  }, [])

  const clickNewOpen = () => {
    setNewOpen(true)
  }

  const deleteThisLibro = async (id: string) => {
    const response: AxiosResponse<ResponseLibroDetalle> = await deleteLibro(id)

    if (response.status === 200) {
      setLibros(libros.filter((libro) => libro.codigo_libro !== id))
    }

    setBarOptions({
      open: true,
      message: response.data.message,
      color: response.status === 200 ? 'success' : 'error',
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'codigo_libro',
      type: 'string',
      headerName: 'Código',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    { field: 'nombre_libro', type: 'string', headerName: 'Nombre', flex: 0.9 },
    {
      field: 'existencias',
      type: 'number',
      headerName: 'Existencias',
      align: 'center',
      headerAlign: 'center',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'precio',
      type: 'string',
      headerName: 'Precio',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      ...copPrice
    },
    {
      field: 'nombre_autor',
      type: 'string',
      headerName: 'Autor',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'nombre_editorial',
      type: 'string',
      headerName: 'Editorial',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'nombre_genero',
      type: 'string',
      headerName: 'Genero',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'descripcion',
      type: 'string',
      headerName: 'Descripción',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'operaciones',
      type: 'actions',
      headerName: 'Operaciones',
      flex: 1,
      getActions: ({ id, row }: { id: GridRowId, row: LibroDetalle }) => {
        return [
          <GridActionsCellItem
          icon={<EditButton/>}
            label='Editar'
            onClick={async () => {
              setActualLibro(await getLibro(id.toString()))
              setEditOpen(true)
            }}
          />,
          <GridActionsCellItem
          icon={<DeleteButton/>}
            label='Borrar'
            onClick={() => {
              confirm({description: `¿Desea eliminar el libro "${row.nombre_libro}"?`})
                .then(() => {
                  deleteThisLibro(id.toString())
                })
                .catch()
            }}
          />,
        ]
      },
    },
  ]

  return (
    <div className='page' id='libros-page'>
      <Typography gutterBottom variant='h4'>
        Lista Libros
      </Typography>
      <Button onClick={clickNewOpen} variant='contained'>
        Nuevo Libro
      </Button>
      <div
        style={{
          height: '100%',
          width: '100%',
          maxWidth: '100%',
          alignSelf: 'center',
          margin: '10px',
        }}
      >
        <StyledDataGrid
          columns={columns}
          rows={libros}
          autoHeight
          getRowId={(row) => row.codigo_libro}  
          loading={loading}
          density='comfortable'
          getRowHeight={() => 'auto'}
          getCellClassName={()=>'cell-theme'}
          getRowClassName={(params)=>params.indexRelativeToCurrentPage % 2 === 0 ? 'theme-even' : 'theme-odd'}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting: {
              sortModel: [{field: 'codigo_libro', sort: 'asc'}]
            },
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
      <NewLibroDialog
        libros={libros}
        open={newOpen}
        setLibros={setLibros}
        setBarOptions={setBarOptions}
        setOpen={setNewOpen}
      />

      {/* DIALOG EDIT AUTOR*/}
      {editOpen && (
        <EditLibroDialog
          libro={actualLibro}
          open={editOpen}
          setLibros={setLibros}
          setBarOptions={setBarOptions}
          setOpen={setEditOpen}
        />
      )}
    </div>
  )
}
