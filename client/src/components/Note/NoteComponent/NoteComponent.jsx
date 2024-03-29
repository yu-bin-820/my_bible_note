import React, {useCallback, useEffect, useState} from 'react';
import { Box } from '@mui/material';
import {BASE_URL, PORT, PROTOCOL, REDIRECT_URI, REST_API_KEY} from "../../../constant/constant.js";
import useSWR from "swr";
import fetcher from "../../../Shared/fetcher.js";
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import BibleCard from "./BibleCard/BibleCard.jsx";
import UpdateNoteDrawer from "../UpdateNoteDrawer/UpdateNoteDrawer.jsx";
import axios from "axios";
import {Stack} from "@mui/material";

const NoteComponent = () => {

    const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);

    const navigate = useNavigate();

    const handleUpdateDrawer = useCallback(
        (state) => () => {
            setUpdateDrawerOpen(state);
        },
        []
    );


    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear() % 100}.${d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}.${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
    };

    const { noteno } = useParams();



    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const { data: myNote, error } = useSWR(`${PROTOCOL}://${BASE_URL}:${PORT}/notes/${noteno}`, fetcher);

    useEffect(() => {
        if (error && error.message === 'Unauthorized') {
            window.location.href = link;
        }
    }, [error]);


    const noteDelete = useCallback(async () => {
        try{
            const token = localStorage.getItem('token');

            await axios.delete(`${PROTOCOL}://${BASE_URL}:${PORT}/notes/${noteno}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                navigate(`/mynote`);
            });
        } catch (error) {
            console.error(error);
        }
    }, [noteno]);


    return (
        <Box
            sx={{
                position: 'fixed',
                width: '98%',
                typography: 'body1',
                flexGrow: 1,
                margin: '10px',
                top: '64px',
            }}>
            <UpdateNoteDrawer note={myNote} open={updateDrawerOpen} handleDrawer={handleUpdateDrawer} />

            <Stack spacing={2}>


                {(myNote && myNote.verses) && (
                    <BibleCard verses={myNote.verses} />
                )}
                <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary" align="right">
                    {`${myNote?.book.description} ${myNote?.chapter}장 ${myNote?.startVerse}절 ~ ${myNote?.endVerse}절`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2" >
                    내용
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                    {myNote?.content}
                </Typography>
                <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary" align="right">
                    {formatDate(myNote?.regDtm)}
                </Typography>

                <CardActions>
                    <Button  onClick={handleUpdateDrawer(true)} variant="outlined" size="small">수정하기</Button>
                    <Button  onClick={noteDelete} variant="outlined" size="small">삭제하기</Button>

                </CardActions>

            </Stack>

        </Box>
    );
};

export default NoteComponent;