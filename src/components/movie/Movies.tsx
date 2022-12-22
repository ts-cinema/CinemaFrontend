import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Button } from '@mui/material';

import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


//const axios = require('axios').default;



const Movies = () => {
    let history = useNavigate();

    const [name, setName] = useState<{id: string;title: string; description:string; genre:string; releaseDate: string}[]>(
        [],
      );
    

    useEffect(() => {
        names()
    }, [])
    
    const names = () => {
        // role = localStorage.getItem('currentUserRole')
        // user_id = localStorage.getItem('currentUserId')
        // Ruta za get svih filmova
        //const responce = await fetch('http://localhost:8085/api/catmisc/articles');
        //setName(await responce.json())
        let movie = {
            id:'5',
            title: 'Film 1',
            description: 'Here is Description',
            genre: 'Sci fi',
            releaseDate: '24-5-1999',
        };
        let result : any[] = [];
        result.push(movie)
        result.push(movie)
        setName(result)
    }

    //BIT CE OVO
    /*const names = async () => {
        role = localStorage.getItem('currentUserRole')
        user_id = localStorage.getItem('currentUserId')
        const responce = await fetch('http://localhost:8080/donation/donations');
        setName(await responce.json())
    }*/

    let x = name

    const deleteRequest = (index: any) => {
        /*console.warn(index)
        console.warn(name[index])
        axios.delete('http://localhost:8085/api/catmisc/articles/' + name[index].id ).then(function (response) {
            if(response.status == 200){
                toast.warning("Deleting...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
        })*/
    }

    const edit = (index: any) => {

        // sklonim staru vrijednost iz local storage jer se po 1 movie moze mijenjat
        localStorage.removeItem('movie');
        console.warn(index)
        console.log(name[index])
        // ovdje se sacuva id koji se kasnije moze dokuciti u Edit view sa getItem.'movie')
        localStorage.setItem('movie', name[index].id)
        console.warn("___________")
        let x = localStorage.getItem('movie')
        console.warn(x)
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    
        history('/movie/edit')
    }

   // let role = localStorage.getItem('currentUserRole')

    //if role = admin
    //if(role == 1) {

        return (
            <div>
                <div>
                <h1> Movies </h1>
                <div style={{display: "flex", justifyContent:"center", marginBottom:"2em"}}>
                    <NavLink to="/movie/create">
                        <Button variant="contained" color="primary" >Create</Button>
                    </NavLink>
                </div>
                    {name.map((data, index) => {
                        return(
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{data.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Release Date: <Typography>{data.releaseDate}</Typography>
                                    Genre: <Typography>{data.genre}</Typography>
                                    Description: <Typography>{data.description}</Typography>
                                    <div style={{display: "flex", justifyContent:"center"}}>
                                        <Button variant="contained" color="primary" sx={{marginRight:"2em"}} onClick={()=>deleteRequest(index)}>Delete</Button>
                                        <Button variant="contained" color="primary" id = "edit" onClick={()=>edit(index)}>Edit</Button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    } 
                    )
                }
                </div>
            </div>
        );
   //} 
   /*else {
        
   return (
    <div>
        <div>
        <h1> Movies </h1>
            {name.map((data, index) => {
                return(
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{data.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Release Date: <Typography>{data.releaseDate}</Typography>
                            Genre: <Typography>{data.genre}</Typography>
                            Description: <Typography>{data.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            } 
            )
        }
        </div>
    </div>
);*/
}

export default Movies;