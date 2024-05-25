import { styled } from '@mui/material'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'

const StyledDataGrid = styled(DataGrid)<DataGridProps>(() => ({
  '& .theme-odd': {
    '&:hover': {
      backgroundColor: '#ccc'
    },
  },
  '& .theme-even': {
    backgroundColor: '#eee',
    '&:hover': {
      backgroundColor: '#ccc'
    },
  },
  '& .cell-theme': {
    alignContent: 'center',
  }
}));

export default StyledDataGrid
