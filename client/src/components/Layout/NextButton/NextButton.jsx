import React from 'react';
import {Fab} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



const NextButton = ({handleClick}) => {




    return (
        <div>
                    <Fab
                        sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        opacity: 0.4,
                        }}
                        onClick={handleClick}
                    >
                        <NavigateNextIcon />
                    </Fab>
        </div>
    );
};

export default NextButton;