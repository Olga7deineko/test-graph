import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useState } from 'react';
import { GraphChangeAttributeProps } from '../../models/model';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GraphChangeAttribute = ({ open, setNewValue, defaultInputValue, isAttribute }: GraphChangeAttributeProps) => {
    const [inputValue, setInputValue] = useState(defaultInputValue);

    const handleSave = () => {
        setNewValue(inputValue);
    };

    const handleClose = () => {
        setNewValue();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInputValue(event?.target?.value);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="graph-dialog"
            >
                <DialogTitle>Change {isAttribute ? 'attribute' : 'value'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="graph-dialog-description">
                        <TextField id="outlined-basic" label="Value" variant="outlined" defaultValue={inputValue}
                                   onChange={handleInputChange}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GraphChangeAttribute;