import React from 'react';
import { Box } from '@mui/material';
import Toolbar from "@mui/material/Toolbar";
import HideOnScroll from "../../ui/HideOnScroll.jsx";
import AppBarComponent from "../Appbar/AppBarComponent/AppBarComponent.jsx";
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

const HomeButtonBar = (props) => {

    const navigate = useNavigate();


    const handleHomeNavigate= () => {
        navigate(`/`);
    };
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <HideOnScroll {...props}>
                    <AppBarComponent position="fixed">
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleHomeNavigate}
                                edge="start"
                                sx={{ mr: 2 }}
                            >
                                <HomeIcon />
                            </IconButton>

                        </Toolbar>
                    </AppBarComponent>
                </HideOnScroll>
            </Box>
            
        </div>
    );
};

export default HomeButtonBar;