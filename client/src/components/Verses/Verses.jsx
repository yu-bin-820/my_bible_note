import React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useNewNoteStore} from "../../stores/useNewNoteStore.js";

const Verses = ({ verses, onVerseClick }) => {

    const { startVerse, endVerse} = useNewNoteStore();

    const isVerseSelected = (verseNumber) => {
        if (!startVerse || startVerse === null) {
            return false;
        }
        if (startVerse !== null && endVerse === null) {
            return verseNumber === startVerse;
        }
        if (startVerse > endVerse) {
            return verseNumber >= endVerse && verseNumber <= startVerse;
        }
        return verseNumber >= startVerse && verseNumber <= endVerse;
    };

    return (

        <Box
            sx={{
                position: 'fixed',
                width: '98%',
                typography: 'body1',
                flexGrow: 1,
                margin: '10px',
                top: '63px',
                maxHeight: 'calc(100vh - 100px)', // 뷰포트 높이에서 상단 바와 여백을 제외한 최대 높이
                overflowY: 'auto', // 세로 방향으로 내용이 넘칠 경우 스크롤바 표시
            }}
        >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} aria-label="verses">
                {verses.map((verse) => (
                    <ListItem key={verse.verse} disablePadding>
                        <ListItemButton selected={isVerseSelected(verse.verse)} onClick={() => onVerseClick(verse.verse)}>
                            <ListItemIcon>{verse.verse}</ListItemIcon>
                            <ListItemText primary={verse.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Verses;
