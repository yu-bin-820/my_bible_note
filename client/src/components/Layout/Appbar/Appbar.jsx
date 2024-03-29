import React, {useCallback} from 'react';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import ChevronRightIcon from "@mui/icons-material/ChevronRight.js";
import Divider from "@mui/material/Divider";
import {useTheme} from "@mui/material/styles";
import Bibledrawer from "./Bibledrawer/Bibledrawer.jsx";
import {DrawerHeader} from "../../../constant/DrawerHeader.js"
import {drawerWidth} from "../../../constant/style.js"
import {useNavigate} from "react-router-dom";
import KakaoLoginButton from "./KakaoLoginButton/KakaoLoginButton.jsx";
import HideOnScroll from "../../ui/HideOnScroll.jsx";
import AppBarComponent from "./AppBarComponent/AppBarComponent.jsx";
import {useMarkStore} from "../../../stores/useMarkStore.js";
import ChapterDrawer from "./ChapterDrawer/ChapterDrawer.jsx";


const Appbar = (props) => {


    const navigate = useNavigate();
    const theme = useTheme();

    const { markBookName, markChapter} = useMarkStore();


    const [bibleDrawerOpen, setBibleDrawerOpen] = React.useState(false);

    const handleBibleDrawerOpen = () => {
        setBibleDrawerOpen(true);
    };

    const handleBibleDrawerClose = () => {
        setBibleDrawerOpen(false);
    };

    const [chapterDrawerOpen, setChapterDrawerOpen] = React.useState(false);



    const { window } = props; // Destructuring을 통해 props에서 title과 window를 추출
    const token = localStorage.getItem('token');

    const isLogin = (token!=null);


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickMyNote = useCallback((event) => {
        navigate(`/mynote`);
    }, []);

    const onClickLogout = () => {
        localStorage.removeItem('token'); // 토큰 제거

        setAnchorEl(null);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <HideOnScroll {...props}>
                <AppBarComponent position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleBibleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(bibleDrawerOpen && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {markBookName} {markChapter}장
                        </Typography>
                        {isLogin && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={onClickMyNote}>내 노트 보기</MenuItem>
                                    <MenuItem onClick={onClickLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                        {!isLogin && <KakaoLoginButton />}
                     </Toolbar>
                </AppBarComponent>
            </HideOnScroll>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={bibleDrawerOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={handleBibleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Bibledrawer setChapterDrawerOpen={setChapterDrawerOpen}/>
            </Drawer>
            <ChapterDrawer chapterDrawerOpen={chapterDrawerOpen} setChapterDrawerOpen={setChapterDrawerOpen} setBibleDrawerOpen={setBibleDrawerOpen}/>
        </Box>
    );
}

export default Appbar;