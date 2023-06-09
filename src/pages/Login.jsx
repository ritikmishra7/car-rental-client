import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { message } from 'antd';
import { axiosClient } from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUserDetails } from '../redux/slices/userDetailsSlice';


const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get('email'),
            password: data.get('password'),
        };
        try {
            const response = await axiosClient.post('/auth/login', body);
            if (response.data.status === "ok") {
                message.success('Logged in successfully');
                localStorage.setItem('accessToken', response.data.result.accessToken);
                dispatch(setUserDetails(response.data.result.user));
                navigate('/home');
            }
            else
                message.error(response.data.error);

        } catch (error) {
            console.log(error?.message);
            message.error(`Error logging in ${error?.message}`);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <span onClick={() => navigate('/signup')} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'rgb(25,139,222)' }}>Don't have an account? Sign Up</span>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}