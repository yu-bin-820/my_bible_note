import React, {useCallback} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

const NoteCard = ({ note }) => {

    const navigate = useNavigate();

    // 날짜 형식 변환 함수 (예: '22.02.11')
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear() % 100}.${d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}.${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
    };

    const onClickNote = useCallback((event) => {
        navigate(`/updatenote/${note.noteNo}`);
    }, []);

    return (
        <Card
            variant="outlined"
            sx={{ margin: '50px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {`${note.book.description} ${note.chapter}장 ${note.startVerse}절 ~ ${note.endVerse}절`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                    {note.content}
                </Typography>
                <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
                    {formatDate(note.regDtm)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button  onClick={onClickNote} variant="outlined" size="small">보기</Button>
            </CardActions>
        </Card>
    );
};

export default NoteCard;
