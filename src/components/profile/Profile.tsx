import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardActionArea, Button } from '@mui/material';
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { cookieService } from "../../CookieService";
import Swal from "sweetalert2";
import jwt_decode from 'jwt-decode';
import interceptionAxios from '../../api/InterceptionAxios';
import { useNavigate } from 'react-router-dom';

import './Profile.css'

const Profile = () => {

    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [user, setUser] = useState<{name: string; email: string; birth_date: string; address: string}>({
        name: '',
        email: '',
        birth_date: '',
        address: ''
    });

    const accessToken = cookieService.getCookie()?.token;

    const getUser = async () => {
        const accessToken = cookieService.getCookie()?.token;
        if (accessToken == null) {
            const swalText = `<div style='color:whitesmoke'>You don't have permissions to perform this action!</div>`;
              Swal.fire({
                  title: `<div style='color:whitesmoke'>An error occured!</div>`,
                  html: swalText,
                  icon: "error",
                  backdrop: true,
                  showConfirmButton: true,
                  confirmButtonColor: "#eb0028",
                  focusConfirm: false,
                  background: "#2C2C2C",
              });
        }
        else {
            const decoded: any = jwt_decode(accessToken);
            const config = {
                headers: { "Authorization": `Bearer ${accessToken}` }
            };

            await interceptionAxios.get(`/api/v1/cinema/users/${decoded.user_identifier}`, config).then((res: any) => {
                setUser(res.data);
            }).catch((error: any) => {
                if (error?.response?.code !== 201) {
                const swalText = `<div style='color:whitesmoke'>You are unable to perform this action!</div>`;
                Swal.fire({
                    title: `<div style='color:whitesmoke'>An error occured!</div>`,
                    html: swalText,
                    icon: "error",
                    backdrop: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#eb0028",
                    focusConfirm: false,
                    background: "#2C2C2C",
                });
                }
            });
            }
    };

    const getTickets = async () => {
        const accessToken = cookieService.getCookie()?.token;
        if (accessToken == null) {
            const swalText = `<div style='color:whitesmoke'>You don't have permissions to perform this action!</div>`;
              Swal.fire({
                  title: `<div style='color:whitesmoke'>An error occured!</div>`,
                  html: swalText,
                  icon: "error",
                  backdrop: true,
                  showConfirmButton: true,
                  confirmButtonColor: "#eb0028",
                  focusConfirm: false,
                  background: "#2C2C2C",
              });
        }
        else {
            const decoded: any = jwt_decode(accessToken);
            const config = {
                headers: { "Authorization": `Bearer ${accessToken}` }
            };

            await interceptionAxios.get(`/api/v1/cinema/tickets/user/${decoded.user_identifier}`, config).then((res: any) => {
                setTickets(res.data);
            }).catch((error: any) => {
                if (error?.response?.code !== 201) {
                const swalText = `<div style='color:whitesmoke'>You are unable to perform this action!</div>`;
                Swal.fire({
                    title: `<div style='color:whitesmoke'>An error occured!</div>`,
                    html: swalText,
                    icon: "error",
                    backdrop: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#eb0028",
                    focusConfirm: false,
                    background: "#2C2C2C",
                });
                }
            });
            }
    };
    
    
      useEffect(() => {
        getTickets();
        getUser();
    }, [])

    return (
        <>
        <div className="services">
            <h1>My profile</h1>

            <Card sx={{ display: 'flex', textAlign:"center"}}>
                        <CardActionArea>
                            <CardContent>
                            <Typography variant="h5" color="text.secondary" component="div" >
                                Name: {user.name} <br/>
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                E-mail: {user.email} <br/>
                                
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                Birth date: {new Date(user.birth_date).toLocaleDateString("en-GB")} <br/>
                            
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                Address: {user.address} <br/>
                            
                                </Typography>
                                <div style={{display: "flex", justifyContent:"center", marginBottom:"2em", paddingTop:"20px"}}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            navigate('/profile/edit',  { state: {email: user.email} });
                                        }}
                                    >Edit profile</Button>
                                </div>
                            </CardContent>
                        </CardActionArea>
            </Card>

            <Card sx={{ display: 'flex', textAlign:"center"}}>
                <CardActionArea>
                    <CardContent>
                        <h1>My tickets</h1>
                            {tickets.map((ticket: any) => {
                                return(
                                    <div>
                                        Movie name: <Typography>{ticket.name}</Typography>
                                        Price: <Typography>{ticket.price} KM</Typography>
                                        <br/>
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