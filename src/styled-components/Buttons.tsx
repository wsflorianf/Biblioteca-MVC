import { Delete, Edit } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export function EditButton(props: ButtonProps){
    return(
        <Button {...props} size='small' variant='contained' startIcon={<Edit/>}>Editar</Button>
    )
}

export function DeleteButton(props: ButtonProps){
    return(
        <Button {...props} size='small' variant='contained' color='error' startIcon={<Delete/>}>Eliminar</Button>
    )
}