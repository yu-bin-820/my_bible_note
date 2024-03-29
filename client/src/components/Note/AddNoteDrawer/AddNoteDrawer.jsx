import React from 'react';
import { Box } from '@mui/material';
import {Button, Radio, RadioGroup, Stack} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useNewNoteStore} from "../../../stores/useNewNoteStore.js";
import {useMarkStore} from "../../../stores/useMarkStore.js";
import {useNavigate} from "react-router-dom";
import Drawer from "@mui/material/Drawer";

const AddNoteDrawer = ({open, handleDrawerClose}) => {

    const navigate = useNavigate();

    const { markBook, markBookName, markChapter} = useMarkStore();

    const { cat, startVerse, endVerse, setCat, setBook, setBookName, setChapter, setStartVerse, setEndVerse} = useNewNoteStore();


    const catChange = (event) => {
        setCat(event.target.value);
    };

    const onClickAddNote = (event) => {
        const bigNumber = Math.max(startVerse, endVerse);
        const smallNumber = Math.min(startVerse, endVerse);
        console.log("start", startVerse);
        console.log("end", endVerse);
        console.log("big", bigNumber);
        console.log("small", smallNumber);
        setBook(markBook);
        setBookName(markBookName);
        setChapter(markChapter);
        setStartVerse(smallNumber);
        setEndVerse(bigNumber);
        navigate(`/addnote`);
    };


    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleDrawerClose}
        >
            <Box
                sx={{ margin: '20px' }}
            >
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="1"
                    name="cat"
                    value={cat}
                    onChange={catChange}
                >
                    <FormControlLabel value="1" control={<Radio />} label="묵상노트" />
                    <FormControlLabel value="2" control={<Radio />} label="설교노트" />
                </RadioGroup>
                <Stack spacing={2} direction="row">

                    <Button variant="contained" onClick={onClickAddNote} >작성하기</Button>
                    <Button variant="contained" onClick={handleDrawerClose} >취소</Button>

                </Stack>

            </Box>
        </Drawer>
    );
};

export default AddNoteDrawer;