import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
} from '@mui/material';
import CustomButton from './Button';
import './popup.css'
const PopUp = (props: any) => {
    const { title, children, openPopup, setOpenPopup } = props;
    return (
        <Dialog open={openPopup} maxWidth="lg" className='dialogWrapper'>
            <DialogTitle className="dialogTitle">
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>{title}</Typography>
                    <CustomButton
                        color='secondary'
                        onClick={() => setOpenPopup(false)}
                    >cancel</CustomButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}


export default PopUp;