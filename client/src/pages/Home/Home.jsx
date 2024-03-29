import React, { useEffect, useState } from 'react';
import Appbar from "../../components/Layout/Appbar/Appbar.jsx";
import Verses from "../../components/Verses/Verses.jsx";
import axios from "axios";
import { BASE_URL, PORT, PROTOCOL } from "../../constant/constant.js";
import { useMarkStore } from "../../stores/useMarkStore.js";
import AddNoteDrawer from "../../components/Note/AddNoteDrawer/AddNoteDrawer.jsx";
import NextButton from "../../components/Layout/NextButton/NextButton.jsx";
import {useNewNoteStore} from "../../stores/useNewNoteStore.js";


const Home = () => {

    const { markTestament, markBook, markChapter, markVerse, markMaxChapter, setMarkBook,setMarkChapter,setMarkBookName, setMarkMaxChapter } = useMarkStore();
    const { startVerse, endVerse, setStartVerse, setEndVerse, resetNewNoteStore } = useNewNoteStore();
    const [verses, setVerses] = useState([]);
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem('token');


    const isLogin = !!token;

    useEffect(() => {
        if (isLogin) {
            const fetchMarkData = async () => {
                try {
                    const response = await axios.get(`${PROTOCOL}://${BASE_URL}:${PORT}/member`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const { markTestament, markBook, markChapter, markVerse, markMaxChapter } = response.data;
                    setMarkBook(markBook);
                    setMarkChapter(markChapter);
                    setMarkMaxChapter(markMaxChapter);
                } catch (error) {
                    console.error("Failed to fetch mark data:", error);
                }
            };

            fetchMarkData();
        }
    }, [isLogin, setMarkBook, setMarkChapter, setMarkMaxChapter]);



    const handleDrawerOpen = () => {
        setOpen(true);

    };

    const handleDrawerClose = () => {
        setStartVerse(null);
        setEndVerse(null);
        setOpen(false);
    };

    const handleVerseClick = (verseNumber) => {
        if (startVerse === null) {
            console.log(verseNumber);
            setStartVerse(verseNumber);
        }  else {
            setEndVerse(verseNumber);
            handleDrawerOpen();

        }
    };

    const nextButtonClick = () => {
        console.log(markChapter, markMaxChapter)
        if (markChapter === markMaxChapter) {
            setMarkBook(Number(markBook)+1);
            setMarkChapter(1);
            setMarkBookName(null);
            setMarkMaxChapter(null);
            setMyMark(markTestament, Number(markBook)+1, 1, markVerse);
            setStartVerse(null);
            setEndVerse(null);

        } else {
            setMarkChapter(Number(markChapter)+1);
            setMyMark(markTestament, markBook, Number(markChapter)+1, markVerse);
            setStartVerse(null);
            setEndVerse(null);
        }
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axios.get(`${PROTOCOL}://${BASE_URL}:${PORT}/bible/book/chapter/verses/${markBook}/${markChapter}`)
            .then((response) => {
                setVerses(response.data);
                if(response.data[0].book!==null){
                    setMarkBookName(response.data[0].book.description);
                    setMarkMaxChapter(response.data[0].book.chapters);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [markBook, markChapter]);


    return (
        <div>
            <Appbar />
            <Verses verses={verses} onVerseClick={handleVerseClick} />
            <AddNoteDrawer open={open} handleDrawerClose={handleDrawerClose} />
            <NextButton handleClick={nextButtonClick}/>

        </div>
    );
};

export default Home;
