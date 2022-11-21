import { memo } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import { createTheme, ThemeProvider } from '@mui/material';

const GraphHeader = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box className="graph-header-left">
                            <img width="40px" src="/test-graph/logo.png"/>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                className="graph-header-title"
                            >
                                GRAPH
                            </Typography>
                        </Box>
                        <Box className="graph-header-right">
                            <Avatar alt="Avatar"/>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default memo(GraphHeader);
