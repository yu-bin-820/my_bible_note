import React from 'react';
import { Button } from '@mui/material';
import { REDIRECT_URI, REST_API_KEY } from '../../../../constant/constant.js'

const KakaoLoginButton = () => {
    const kakaoLoginLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.replace(kakaoLoginLink);
    };

    return <Button color="secondary" onClick={loginHandler}>Login</Button>;
};

export default KakaoLoginButton;
