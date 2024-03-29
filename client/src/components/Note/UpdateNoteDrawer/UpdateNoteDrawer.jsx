import React, {useCallback, useEffect} from 'react';
import { Box } from '@mui/material';
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import {useTheme} from "@mui/material/styles";
import {AppBar, Button, FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL, PORT, PROTOCOL} from "../../../constant/constant.js";
import {useUpdateNoteStore} from "../../../stores/useUpdateNoteStore.js";
import Toolbar from "@mui/material/Toolbar";

const UpdateNoteDrawer = ({ note, open, handleDrawer }) => {

    const {noteNo, cat, book, bookName, chapter, content, startVerse, endVerse, setNoteNo, setCat, setBook, setBookName, setChapter, setContent, setStartVerse, setEndVerse, resetUpdateNoteStore} = useUpdateNoteStore();

    useEffect(() => {
        if (note) {
            setNoteNo(note.noteNo);
            setCat(note.cat);
            setBook(note.book.value);
            setBookName(note.book.description);
            setChapter(note.chapter);
            setContent(note.content);
            setStartVerse(note.startVerse);
            setEndVerse(note.endVerse);
        }
    }, [note]);

    console.log(open)

    const navigate = useNavigate();



    const catChange = (event) => {
        setCat(event.target.value);
    };

    const contentChange = (event) => {
        setContent(event.target.value);
    };


    const noteSubmit = useCallback(async () => {
        try{
            const noteData = {
                noteNo: noteNo,
                cat: cat,
                book: {
                    value: book
                },
                chapter: chapter,
                startVerse: startVerse,
                endVerse: endVerse,
                content: content
            };
            console.log('!!!!!!', noteData);
            const token = localStorage.getItem('token');

            await axios.put(`${PROTOCOL}://${BASE_URL}:${PORT}/notes`, noteData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                resetUpdateNoteStore();
                navigate(`/mynote`);
            });
        } catch (error) {
            console.error(error);
        }
    }, [
        navigate,
        resetUpdateNoteStore,
    ]);



    const theme = useTheme();

    return (
            <Drawer
                sx={{
                    width: '100%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
                open={open}
                onClose={() => handleDrawer(false)}
                onOpen={() => handleDrawer(true)}
            >

                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton onClick={() => handleDrawer(false)()}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box
                    sx={{
                        position: 'fixed',
                        marginTop: '70px',
                        marginLeft: '30px',
                        marginRight: '30px',
                        width: '98%',
                        typography: 'body1',
                        flexGrow: 1,
                    }}>
                    <FormControl>
                        <RadioGroup
                            row
                            margin="normal"
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="cat"
                            value={cat}
                            onChange={catChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="묵상노트" />
                            <FormControlLabel value="2" control={<Radio />} label="설교노트" />
                        </RadioGroup>
                    </FormControl>
                    <Typography sx={{ mb: 1.5 }} variant="body2"  >
                        {bookName} {chapter}장 {startVerse} ~ {endVerse} 절
                    </Typography>
                    <Box
                        sx={{
                            width: '97%',
                            maxWidth: '100%',
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="노트"
                            name="content"
                            multiline
                            rows={10}
                            value={content}
                            onChange={contentChange}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        onClick={noteSubmit}
                    >수정하기</Button>

                </Box>

            </Drawer>

    );
};

export default UpdateNoteDrawer;