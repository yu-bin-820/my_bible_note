import React from 'react';
import { Box } from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";

const BibleCard = ({ verses }) => {

    return (
        <Box
            sx={{ transform: 'scale(0.99)' }}
            >
            <Card variant="outlined">
                <CardContent>
                    {verses?.map((verse) => (
                        <Stack key={verse.verse} direction="row" spacing={2}>
                            <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                                {verse.verse}
                            </Typography>
                            <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
                                {verse.text}
                            </Typography>
                        </Stack>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};

export default BibleCard;