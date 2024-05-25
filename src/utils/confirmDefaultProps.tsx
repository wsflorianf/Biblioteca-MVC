import {ConfirmOptions} from 'material-ui-confirm'
import {LiveHelpOutlined} from '@mui/icons-material'

const confirmDeafultProps: ConfirmOptions = {
    title: <LiveHelpOutlined sx={{fontSize: '100px'}}/>,
    confirmationText: 'Eliminar',
    hideCancelButton: true,
    confirmationButtonProps: {
        color: 'error',
        variant: 'contained'
    },
    cancellationButtonProps:{
        variant: 'contained',
    },
    dialogProps: {
        PaperProps: {
            sx:{
                textAlign: 'center',
                width: 'auto',
            }
        }
    },
    dialogActionsProps:{
        sx:{
            justifyContent: 'center',
        }
    },
}

export default confirmDeafultProps;