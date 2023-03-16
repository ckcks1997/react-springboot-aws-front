import React, { useState, useEffect } from "react";
import {Container, Grid, Typography} from "@mui/material";

const LoadingPage = () => {

    const [loadStr, setLoadStr] = useState("로딩중");


    useEffect(() => {
        let interval = 0;
        setInterval(function(){
            console.log(1)
            if(interval === 0){
                setLoadStr("로딩중.")
                interval = 1;
            }else if(interval === 1){
                setLoadStr("로딩중..")
                interval = 2;
            } else if(interval === 2){
                setLoadStr("로딩중...")
                interval = 0;
            }
        },300);
      }, []);


    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <Grid container spacing={12}>
                <Grid item xs={12} mb={12}>
                    <Typography component="h1" variant="h5">
                        {loadStr}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}


export default LoadingPage;