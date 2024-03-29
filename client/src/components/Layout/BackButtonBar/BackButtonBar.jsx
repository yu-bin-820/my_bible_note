import React from 'react';
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {AppBar} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

const BackButtonBar = () => {

    const navigate = useNavigate();

    const theme = useTheme();

    const backPageNavigate = () => {
        navigate(-1);
    };

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton onClick={backPageNavigate}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
};

export default BackButtonBar;