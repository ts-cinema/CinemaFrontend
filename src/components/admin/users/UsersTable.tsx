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

const UsersTable = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    let headers = ['Name', 'Email', 'Birth Date', 'Address'];

    function filterAdmin(user: any) {
        return user.email !== "admin@cinema.com";
      }

    const getUsers = async () => {
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

            await interceptionAxios.get('/api/v1/cinema/users', config).then((res: any) => {
                setUsers(res.data.filter(filterAdmin));
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
        getUsers();
    });

    return (
        <div>
            <h1 className="equipment-title">Users</h1>
            <Table className="equipment-table">
                <TableHead>
                    <TableHeader headers={headers} />
                </TableHead>
                <TableBody>
                    {users.map((usersTableItem: any) => (
                        <TableRow key={usersTableItem.id}>
                            <TableCell>{usersTableItem.name}</TableCell>
                            <TableCell>{usersTableItem.email}</TableCell>
                            <TableCell>{new Date(usersTableItem.birthDate).toLocaleDateString("en-GB")}</TableCell>
                            <TableCell>{usersTableItem.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;