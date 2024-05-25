import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

export function EditButton(){
    return(
        <Button size='small' variant='contained' startIcon={<Edit/>}>Editar</Button>
    )
}

export function DeleteButton(){
    return(
        <Button size='small' variant='contained' color='error' startIcon={<Delete/>}>Eliminar</Button>
    )
}