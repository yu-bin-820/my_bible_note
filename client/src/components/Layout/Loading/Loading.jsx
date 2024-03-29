import React from 'react';
import { Box } from '@mui/material';
import {CircularProgress} from "@mui/material";

const Loading = () => {

    return (
        <div>
            <Box>
                <CircularProgress />
            </Box>
            
        </div>
    );
};

export default Loading;