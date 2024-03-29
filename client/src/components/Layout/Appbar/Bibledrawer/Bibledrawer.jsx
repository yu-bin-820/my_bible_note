import React from 'react';
import { Box } from '@mui/material';
import ToggleButton from "@mui/material/ToggleButton";
import Books from "./Books/Books.jsx";
import {Stack} from "@mui/material";
import {StyledToggleButtonGroup} from "../../../../constant/StyledToggleButtonGroup.js";
import {useDrawerStore} from "../../../../stores/useDrawerStore.js";


const Bibledrawer = ({setChapterDrawerOpen}) => {

    const { drawerTestament, setDrawerTestament } = useDrawerStore();

    const handleDrawerTestament = (event, newDrawerTestament) => {
        if (newDrawerTestament !== null) { // newAlignment가 null이 아닐 때만 상태 업데이트
            setDrawerTestament(newDrawerTestament);
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <Stack spacing={2} alignItems="center">
                    <StyledToggleButtonGroup
                        value={drawerTestament}
                        exclusive
                        onChange={handleDrawerTestament}
                        aria-label="testament selection"
                    >
                        <ToggleButton value="OLD" aria-label="left aligned">
                            구약
                        </ToggleButton>
                        <ToggleButton value="NEW" aria-label="centered">
                            신약
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                <Books setChapterDrawerOpen={setChapterDrawerOpen}/>
            </Stack>
        </Box>
    );
}

export default Bibledrawer;
