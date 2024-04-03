import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL, PORT, PROTOCOL} from "../../../../../constant/constant.js";
import ToggleButton from "@mui/material/ToggleButton";
import {StyledToggleButtonGroup} from "../../../../../constant/StyledToggleButtonGroup.js";
import {useDrawerStore} from "../../../../../stores/useDrawerStore.js";
import {useTheme} from "@mui/material/styles";


const Books = ({setChapterDrawerOpen}) => {

    const { drawerTestament, drawerBook, setDrawerBook ,  setDrawerMaxChapter, setDrawerBookName } = useDrawerStore();
    const theme = useTheme();


    const handleAlignment = (event, newAlignment) => {
        setDrawerBook(newAlignment);
        setDrawerMaxChapter(books[(newAlignment-1)].chapters);
        setDrawerBookName(books[(newAlignment-1)].description);
        setChapterDrawerOpen(true);

    };

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get(`${PROTOCOL}://${BASE_URL}:${PORT}/bible/books`)
            .then((response) => {
                setBooks(response.data);


            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {books?.filter(book => book.testament === drawerTestament.toUpperCase()).map((book) => (
                <StyledToggleButtonGroup
                    key={book.value}
                    size="small"
                    value={drawerBook}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                    sx={{
                        flexWrap: 'wrap',
                        '& .MuiToggleButton-root': {
                            width: `calc(100% - ${theme.spacing(1)})`,
                            margin: theme.spacing(0.5),
                        }
                    }}
                >
                    <ToggleButton value={book.value} aria-label="left aligned">
                        {book.description}
                    </ToggleButton>
                </StyledToggleButtonGroup>
            ))}
        </div>
    );
};

export default Books;
