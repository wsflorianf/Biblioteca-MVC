import { NavLink, Outlet } from 'react-router-dom'
import {} from 'react-router-dom'
import './App.css'
import { Typography } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import confirmDeafultProps from './utils/confirmDefaultProps'

function App() {
  return (
    <div id='main-container'>
      <nav>
        <Typography color={'#c7c7c7'} variant='h5'>
          Ejemplo MVC
        </Typography>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
              to={''}
            >
              <Typography variant='body1'>Inicio</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
              to={'libros'}
            >
              <Typography variant='body1'>Libros</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
              to={'autores'}
            >
              <Typography variant='body1'>Autores</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
              to={'editoriales'}
            >
              <Typography variant='body1'>Editoriales</Typography>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-active' : '')}
              to={'generos'}
            >
              <Typography variant='body1'>Generos</Typography>
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <ConfirmProvider defaultOptions={confirmDeafultProps}>
          <Outlet />
        </ConfirmProvider>
      </main>
    </div>
  )
}

export default App
