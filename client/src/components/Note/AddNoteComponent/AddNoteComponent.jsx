import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import {Button, FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import {BASE_URL, PORT, PROTOCOL} from "../../../constant/constant.js";
import {useNewNoteStore} from "../../../stores/useNewNoteStore.js";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

const AddNoteComponent = () => {


    const { cat, book, bookName, chapter, startVerse, endVerse, content, setCat, setBook, setChapter, setStartVerse, setEndVerse, setContent, resetNewNoteStore} = useNewNoteStore();

    const navigate = useNavigate();

    if(bookName===null){
        navigate('/');
    }

    const catChange = (event) => {
        setCat(event.target.value);
    };

    const contentChange = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        // navigate(`/`);
        console.log(startVerse, endVerse);
    }, [startVerse, endVerse]);


    const noteSubmit = async () => {
        try{
            const noteData = {
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

            await axios.post(`${PROTOCOL}://${BASE_URL}:${PORT}/notes`, noteData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                resetNewNoteStore();

                navigate(`/mynote`);
            });
        } catch (error) {
            console.error(error);
        }
    };




    return (
        <Box
            sx={{
                position: 'fixed',
                width: '98%',
                typography: 'body1',
                flexGrow: 1,
                top: '64px',
                margin: '10px'
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
            <Typography sx={{ mb: 1.5 }} variant="body2" >
                {bookName} {chapter}장 {startVerse} ~ {endVerse}
            </Typography>
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

            <Button
                type="submit"
                variant="contained"
                onClick={noteSubmit}
            >작성하기</Button>
        </Box>
    );
};

export default AddNoteComponent;