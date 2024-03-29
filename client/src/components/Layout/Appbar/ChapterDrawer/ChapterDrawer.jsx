import React, {useCallback, useEffect} from 'react';
import { Box } from '@mui/material';
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import {useTheme} from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import {StyledToggleButtonGroup} from "../../../../constant/StyledToggleButtonGroup.js";
import {DrawerHeader} from "../../../../constant/DrawerHeader.js"
import {drawerWidth} from "../../../../constant/style.js";
import {useDrawerStore} from "../../../../stores/useDrawerStore.js";
import {useMarkStore} from "../../../../stores/useMarkStore.js";
import axios from "axios";
import {BASE_URL, PORT, PROTOCOL} from "../../../../constant/constant.js";
import {useNewNoteStore} from "../../../../stores/useNewNoteStore.js";

const ChapterDrawer = ({chapterDrawerOpen, setChapterDrawerOpen, setBibleDrawerOpen}) => {
    const { markTestament, markVerse, setMarkBook, setMarkChapter, setMarkMaxChapter} = useMarkStore();
    const { drawerBook, drawerChapter, drawerMaxChapter, setDrawerMaxChapter, resetDrawerStore } = useDrawerStore();
    const { resetNewNoteStore } = useNewNoteStore();


    const theme = useTheme();

    const handleDrawerClose = () => {
        setChapterDrawerOpen(false);
        setDrawerMaxChapter(null);

    };

    const setMyMark = async (markTestament, markBook, markChapter, markVerse) => {
        try {
            const markData = {
                markTestament,
                markBook,
                markChapter,
                markVerse,
            };
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No token found. Mark not set.");
                return;
            }
            await axios.put(`${PROTOCOL}://${BASE_URL}:${PORT}/member/mark`, markData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            resetDrawerStore();
            setChapterDrawerOpen(false);
            setBibleDrawerOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChapterSelect = (event, newChapter) => {
        setMarkBook(drawerBook);
        setMarkChapter(newChapter);
        setMarkMaxChapter(drawerMaxChapter);
        setMyMark(markTestament, drawerBook, newChapter, markVerse);
        resetNewNoteStore();
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={chapterDrawerOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box
                    sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: drawerWidth,
                    overflow: 'auto',
                    }}
                >
                    <StyledToggleButtonGroup
                        size="small"
                        value={drawerChapter}
                        exclusive
                        onChange={handleChapterSelect}
                        aria-label="chapter selection"
                        sx={{
                            flexWrap: 'wrap',
                            '& .MuiToggleButton-root': {
                                width: `calc(25% - ${theme.spacing(1)})`,
                                margin: theme.spacing(0.5),
                            }
                        }}
                    >
                        {Array.from({ length: drawerMaxChapter }, (_, i) => (
                            <ToggleButton key={i} value={String(i + 1)}>
                                {i + 1}
                            </ToggleButton>
                        ))}
                    </StyledToggleButtonGroup>

                </Box>
            </Drawer>
        </Box>
    );
};

export default ChapterDrawer;
