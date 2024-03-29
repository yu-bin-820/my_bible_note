import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import NoteCard from "./NoteList/NoteCard/NoteCard.jsx";
import {BASE_URL, PORT, PROTOCOL, REDIRECT_URI, REST_API_KEY} from "../../constant/constant.js";
import useSWR from "swr";
import fetcher from "../../Shared/fetcher.js";
import {Stack, Tab, Tabs} from "@mui/material";

const NoteList = () => {

    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const { data: myNoteList, error } = useSWR(`${PROTOCOL}://${BASE_URL}:${PORT}/notes/me`, fetcher);

    useEffect(() => {
        if (error && error.message === 'Unauthorized') {
            window.location.href = link;
        }
    }, [error]);

    const [cat, setCat] = React.useState('1');

    const handleChange = (event, newValue) => {
        setCat(newValue);
    };



    return (
        <Box
            sx={{
                position: 'fixed',
                width: '100%',
                typography: 'body1',
                flexGrow: 1,
                top: '64px',
            }}>
            <Tabs
                position="fixed"
                variant="fullWidth"
                value={cat}
                onChange={handleChange}
                aria-label="disabled tabs example">
                <Tab value='1' label="묵상노트" />
                <Tab value='2' label="설교노트" />
            </Tabs>
            <Stack
                spacing={2}
                sx={{ padding: '3',
                    margin: '10px',
            }}
            >
                {myNoteList?.filter(myNote => myNote.cat.toString() === cat.toString()).map((myNote) => (
                    <NoteCard
                        key={myNote.noteNo}
                        note={myNote}
                        sx={{ padding: '3' }}/>
                ))}
            </Stack>

        </Box>
    );
};

export default NoteList;