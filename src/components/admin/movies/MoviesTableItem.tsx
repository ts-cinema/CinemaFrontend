import { Avatar, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import Tooltip from '@mui/material/Tooltip';
import interceptionAxios from '../../../api/InterceptionAxios';
import { cookieService } from '../../../CookieService';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './MoviesTable.css';

const MoviesTableItem = ({ moviesTableItem } : any) => {

    const navigate = useNavigate();
   
    const deleteMovie = async () => {
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

            await interceptionAxios.delete(`/api/v1/cinema/movies/${moviesTableItem.id}`, config).then((res: any) => {
            const swalText = `<div style='color:whitesmoke'>You have successfully deleted movie: "<b>${moviesTableItem.title}</b>"!</div>`;
            Swal.fire({
                title: `<div style='color:whitesmoke'>Success</div>`,
                html: swalText,
                icon: "success",
                backdrop: true,
                showConfirmButton: true,
                confirmButtonColor: "#eb0028",
                focusConfirm: false,
                background: "#2C2C2C",
            });
        }).catch((error: any) => {
            if (error?.response?.code !== 201) {
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
        });
        }

        navigate("/movies/table");
    };

    useEffect(() => {}, []);

    return (
        <TableRow key={moviesTableItem.id}>
            <TableCell>{moviesTableItem.title}</TableCell>
            <TableCell>{moviesTableItem.description}</TableCell>
            <TableCell>{moviesTableItem.genre}</TableCell>
            <TableCell>{new Date(moviesTableItem.release_date).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>
                <Tooltip
                    title="Edit"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                    }}
                >
                    <IconButton
                        aria-label="edit"
                        style={{
                            color: '#808080',
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip
                        title="Delete"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteMovie();
                        }}
                    >
                        <IconButton
                            aria-label="delete"
                            style={{
                                color: '#808080',
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
            </TableCell>
        </TableRow>
    );
};

export default MoviesTableItem;