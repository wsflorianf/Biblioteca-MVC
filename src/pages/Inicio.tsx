import { Book, Folder, Person, School } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import SelectionCard from '../components/SelectionCard'
import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <div id='inicio-page'>
        <Typography gutterBottom variant='h3'>Inventario de Libros</Typography>
      <Grid container spacing={'30px'}>
        <Grid item xs={6}>
          <Link to='libros'>
            <SelectionCard
              icon={<Book className='section-icon' />}
              title= 'Libros'
              text='Ver libros'
            />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to='autores'>
            <SelectionCard
              icon={<Person className='section-icon' />}
              title='Autores'
              text='Ver autores'
            />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to='editoriales'>
            <SelectionCard
              icon={<School className='section-icon' />}
              title='Editoriales'
              text='Ver editoriales'
            />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to='generos'>
            <SelectionCard
              icon={<Folder className='section-icon' />}
              title='Generos'
              text='Ver generos'
            />
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}
