import { Alert, Button, Snackbar, Typography } from '@mui/material'
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Editorial } from '../types/models.types'
import { BarOptionsTypes } from '../types/components.types'
import { AxiosResponse } from 'axios'
import { deleteEditorial, getEditoriales } from '../services/editorialService'
import NewEditorialDialog from '../components/NewEditorialDialog'
import { ResponseEditorial } from '../types/response.types'
import EditEditorialDialog from '../components/EditEditorialDialog'
import { DeleteButton, EditButton } from '../styled-components/Buttons'
import StyledDataGrid from '../styled-components/StyledDataGrid'

export default function Editoriales() {
  const [editoriales, setEditoriales] = useState<Editorial[]>([])
  const [loading, setLoading] = useState(true)
  const [actualEditorial, setActualEditorial] = useState<Editorial>()

  const [barOptions, setBarOptions] = useState<BarOptionsTypes>({
    open: false,
    message: '',
    color: 'success',
  })
  const [newOpen, setNewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    const fetchEditoriales = async () => {
      try {
        const editoriales = await getEditoriales()
        setEditoriales(editoriales)
      } catch (e) {
        setBarOptions({
          open: true,
          message: 'Conexión rechazada',
          color: 'error',
        })
      }finally {
        setLoading(false)
      }
    }

    fetchEditoriales()
  }, [])

  const clickNewOpen = () => {
    setNewOpen(true)
  }

  const deleteThisEditorial = async (id: string) => {
    const response: AxiosResponse<ResponseEditorial> = await deleteEditorial(id)

    if (response.status === 200) {
      setEditoriales(
        editoriales.filter((editorial) => editorial.codigo_editorial !== id)
      )
    }

    setBarOptions({
      open: true,
      message: response.data.message,
      color: response.status === 200 ? 'success' : 'error',
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'codigo_editorial',
      type: 'string',
      headerName: 'Código',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
    },
    {
      field: 'nombre_editorial',
      type: 'string',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'contacto',
      type: 'string',
      headerName: 'Contacto',
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: 'telefono',
      type: 'string',
      headerName: 'Teléfono',
      flex: 0.5,
      disableColumnMenu: true,
    },
    {
      field: 'operaciones',
      type: 'actions',
      headerName: 'Operaciones',
      flex: 1,
      getActions: ({ id, row }: { id: GridRowId; row: Editorial }) => {
        return [
          <GridActionsCellItem
          icon={<EditButton/>}
            label='Editar'
            onClick={() => {
              setActualEditorial(row)
              setEditOpen(true)
            }}
          />,
          <GridActionsCellItem
          icon={<DeleteButton/>}
            label='Borrar'
            onClick={() => {
              deleteThisEditorial(id.toString())
            }}
          />,
        ]
      },
    },
  ]

  return (
    <div className='page' id='editoriales-page'>
      <Typography gutterBottom variant='h4'>
        Lista Editoriales
      </Typography>
      <Button onClick={clickNewOpen} variant='contained'>
        Nueva Editorial
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
          rows={editoriales}
          autoHeight
          getRowId={(row) => row.codigo_editorial}
          loading={loading}
          getRowHeight={() => 'auto'}
          getCellClassName={()=>'cell-theme'}
          getRowClassName={(params)=>params.indexRelativeToCurrentPage % 2 === 0 ? 'theme-even' : 'theme-odd'}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting:{
              sortModel: [{field: 'codigo_editorial', sort: 'asc'}] 
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

      {/* DIALOG NEW EDITORIAL*/}
      <NewEditorialDialog
        editoriales={editoriales}
        open={newOpen}
        setEditoriales={setEditoriales}
        setBarOptions={setBarOptions}
        setOpen={setNewOpen}
      />

      {/* DIALOG EDIT EDITORIAL*/}
      {editOpen && (
        <EditEditorialDialog
          editorial={actualEditorial}
          open={editOpen}
          setEditoriales={setEditoriales}
          setBarOptions={setBarOptions}
          setOpen={setEditOpen}
        />
      )}
    </div>
  )
}
