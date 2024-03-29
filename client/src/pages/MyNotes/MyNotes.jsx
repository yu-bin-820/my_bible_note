import React from 'react';
import { Box } from '@mui/material';
import HomeButtonBar from "../../components/Layout/HomeButtonBar/HomeButtonBar.jsx";
import NoteList from "../../components/Note/NoteList.jsx";

const MyNotes = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <HomeButtonBar />
            <NoteList />
        </Box>
    );
};

export default MyNotes;