import { TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import './TableHeader.css';

const TableHeader = ({ headers }: any) => {
    useEffect(() => {}, []);

    return (
        <TableRow className="table-header">
            {headers.map((h: any) => (
                <TableCell key={h} className="header-table-cell">
                    {h}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default TableHeader;