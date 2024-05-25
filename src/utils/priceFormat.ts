import { GridColTypeDef } from '@mui/x-data-grid'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
})

export const copPrice: GridColTypeDef = {
  type: 'number',
  valueFormatter: (value) => currencyFormatter.format(value),
}
