import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Editoriales from './pages/Editoriales.tsx'
import Autores from './pages/Autores.tsx'
import Generos from './pages/Generos.tsx'
import Libros from './pages/Libros.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Inicio from './pages/Inicio.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import {esES} from '@mui/x-data-grid/locales'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Inicio/>
      },
      {
        path: 'autores',
        element: <Autores/>
      },
      {
        path: 'editoriales',
        element: <Editoriales/>
      },
      {
        path: 'generos',
        element: <Generos/>
      },
      {
        path: 'libros',
        element: <Libros/>
      },
      {
        path: '*',
        element: <ErrorPage/>
      }
    ],
  },
])

const theme = createTheme({
  
  palette:{
    mode: 'dark'
  },
  components: {
    MuiCard:{
      styleOverrides:{
        root:{
          border: '1px solid #4976b8',
          transition: '0.2s all'
        },

      },
    }
    ,
    MuiCardActions:{
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          color: '#4976b8',
          padding: '10px 20px'
        }
      }
    },
    MuiButton: {
      styleOverrides:{
        root:{
          textTransform: 'none',
        }
      }
    },
    MuiDialogActions: {
      styleOverrides:{
        root: {
          padding: '0 24px',
        }
      }
    },
  }  
}, esES)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
)
