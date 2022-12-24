import { Button, Table, TableBody, TableFooter, TableHead, TablePagination, TableRow, TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import TableHeader from '../../layout/TableHeader';
import interceptionAxios from '../../../api/InterceptionAxios';
import './MoviesTable.css';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddIcon from '@mui/icons-material/Add';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { cookieService } from '../../../CookieService';
import jwt_decode from 'jwt-decode';

const MoviesTable = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [deleted, setDeleted] = useState(false);

    let headers = ['Title', 'Description', 'Genre', 'Release Date', 'Actions'];

    const getMovies = async () => {
        await interceptionAxios.get('/api/v1/cinema/movies').then((res: any) => {
            setMovies(res.data);
        });
        return () => {
            //
        };
    };

    const deleteMovie = async (id: any, title: any) => {
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

            await interceptionAxios.delete(`/api/v1/cinema/movies/${id}`, config).then((res: any) => {
            const swalText = `<div style='color:whitesmoke'>You have successfully deleted movie: "<b>${title}</b>"!</div>`;
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
            setDeleted(!deleted);
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
    };

    useEffect(() => {
        getMovies();
    }, [deleted]);

    return (
        <div>
            <h1 className="equipment-title">Movies</h1>
            <Button
                variant="contained"
                className="add-equipment-btn"
                endIcon={<AddIcon />}
                onClick={() => {
                    navigate('/movie/add');
                }}
            >
                Add movie
            </Button>
            <Table className="equipment-table">
                <TableHead>
                    <TableHeader headers={headers} />
                </TableHead>
                <TableBody>
                    {movies.map((moviesTableItem: any) => (
                        <TableRow key={moviesTableItem.id}>
                            <TableCell>{moviesTableItem.title}</TableCell>
                            <TableCell>{moviesTableItem.description}</TableCell>
                            <TableCell>{moviesTableItem.genre}</TableCell>
                            <TableCell>{new Date(moviesTableItem.release_date).toLocaleDateString("en-GB")}</TableCell>
                            <TableCell>
                                <Tooltip
                                    title="Edit"
                                    onClick={(e: any) => {
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
                                            deleteMovie(moviesTableItem.id, moviesTableItem.title);
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
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default MoviesTable;