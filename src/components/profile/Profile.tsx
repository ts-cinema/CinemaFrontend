import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardActionArea, Button } from '@mui/material';
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

import './Profile.css'

const Profile = () => {

    // ovo je za tickete, trebat ce jos na UI prikazati projekciju, to lakse nastimat kad dobijemo response s backenda
    const [name, setName] = useState<{id: string;name: string; price:string;}[]>(
        [],
      );

    useEffect(() => {
        names()
    }, [])

    const names = async () => {
        // moze se staviti u localStorage user id ili sta treba za rutu
        // OVDJE GET SVE TIKETE ZA USERA
        /*const responce = await fetch('http://localhost:8080/getTickets/user/1');
        setName(await responce.json())
        */
    }

    return (
        <>
        <div className="services">
            <h1>My profile</h1>

            <Card sx={{ display: 'flex', textAlign:"center"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" color="text.secondary" component="div" >
                                Username: <br/>{}
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                Password:<br/>{}
                                
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                E-mail: <br/>{}
                            
                                </Typography>
                                <div style={{display: "flex", justifyContent:"center", marginBottom:"2em", paddingTop:"20px"}}>
                                    <NavLink to="/profile/edit">
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </NavLink>
                                </div>
                            </CardContent>
                            </CardActionArea>
            </Card>

            <Card sx={{ display: 'flex', textAlign:"center"}}>
                <CardActionArea>
                    <CardContent>
                        <h1>My tickets</h1>
                            {name.map((data, index) => {
                                return(
                                    <div>
                                        Movie name: <Typography>{data.name}</Typography>
                                        Price: <Typography>{data.price}</Typography>
                                    </div>

                                    )
                            }
                            )
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

        </>
    )
   
}

export default Profile;