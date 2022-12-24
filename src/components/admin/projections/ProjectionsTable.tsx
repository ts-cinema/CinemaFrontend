import { Button, Table, TableBody, TableFooter, TableHead, TablePagination, TableRow, TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import TableHeader from '../../layout/TableHeader';
import interceptionAxios from '../../../api/InterceptionAxios';
import './../movies/MoviesTable.css';
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

const ProjectionsTable = () => {
    const navigate = useNavigate();
    const [projections, setProjections] = useState([]);
    const [deleted, setDeleted] = useState(false);

    let headers = ['Movie ID', 'Start Time', 'Total Seats', 'Available Seats', 'Actions'];

    const getProjections = async () => {
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

            await interceptionAxios.get('/api/v1/cinema/movieprojections', config).then((res: any) => {
                setProjections(res.data);
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

    const deleteProjection = async (id: any) => {
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

            await interceptionAxios.delete(`/api/v1/cinema/movieprojections/${id}`, config).then((res: any) => {
            const swalText = `<div style='color:whitesmoke'>You have successfully deleted movie projection!</div>`;
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
        getProjections();
    }, [deleted]);

    return (
        <div>
            <h1 className="equipment-title">Movie projections</h1>
            <Button
                variant="contained"
                className="add-equipment-btn"
                endIcon={<AddIcon />}
                onClick={() => {
                    navigate('/projection/add');
                }}
            >
                Add movie projection
            </Button>
            <Table className="equipment-table">
                <TableHead>
                    <TableHeader headers={headers} />
                </TableHead>
                <TableBody>
                    {projections.map((projectionsTableItem: any) => (
                        <TableRow key={projectionsTableItem.id}>
                            <TableCell>{projectionsTableItem.movie_id}</TableCell>
                            <TableCell>{projectionsTableItem.start_time.substring(0, 10)}  &nbsp; &nbsp; {projectionsTableItem.start_time.substring(11, projectionsTableItem.start_time.length - 4)}</TableCell>
                            <TableCell>{projectionsTableItem.total_seats}</TableCell>
                            <TableCell>{projectionsTableItem.available_seats}</TableCell>
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
                                            deleteProjection(projectionsTableItem.id);
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

export default ProjectionsTable;