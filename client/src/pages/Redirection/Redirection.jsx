import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BASE_URL, PORT, PROTOCOL} from "../../constant/constant.js";
import {useMarkStore} from "../../stores/useMarkStore.js";
import Loading from "../../components/Layout/Loading/Loading.jsx";

const Redirection = () => {

    const navigate = useNavigate();

    const { setMarkTestament, setMarkBook , setMarkChapter , setMarkVerse } = useMarkStore();

    useEffect(() => {
        // URL에서 code 파라미터 추출
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            // 서버에 로그인 요청 보내기
            axios.get(`${PROTOCOL}://${BASE_URL}:${PORT}/kakao/login/${code}`)
                .then(response => {
                    // 로그인 성공 시, 토큰과 회원 정보를 로컬 스토리지에 저장
                    localStorage.setItem('token', response.data.token);
                    setMarkTestament(response.data.member.markTestament);
                    setMarkBook(response.data.member.markBook);
                    setMarkChapter(response.data.member.markChapter);
                    setMarkVerse(response.data.member.markVerse);

                    // 로그인 성공 후 원하는 경로로 이동
                    navigate('/');
                })
                .catch(error => console.error('로그인 실패:', error));
        }
    }, [navigate]);

    return (
        <Loading />
    );
};

export default Redirection;