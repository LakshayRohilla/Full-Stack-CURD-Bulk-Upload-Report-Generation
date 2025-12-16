import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Checkbox,
  Button,
  Tooltip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

// Utility: comparator generator
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Table head renders based on `columns` prop
function EnhancedTableHead({ columns, order, orderBy, numSelected, rowCount, onRequestSort, onSelectAllClick }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ backgroundColor: '#D3D3D3' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all rows' }}
          />
        </TableCell>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            align={col.numeric ? 'right' : 'left'}
            padding={col.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === col.id ? order : false}
            sx={{ backgroundColor: '#D3D3D3' }}
          >
            <TableSortLabel
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : 'asc'}
              onClick={createSortHandler(col.id)}
            >
              {col.label}
              {orderBy === col.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ numSelected, selectedRows, onEdit, onDelete }) {
  return (
    <Toolbar
      sx={[
        { pl: 2, pr: 1 },
        numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 && (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      )}

      {numSelected > 1 && (
        <Tooltip title="Delete">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(selectedRows)}
          >
            Delete
          </Button>
        </Tooltip>
      )}

      {numSelected === 1 && (
        <>
          <Tooltip title="Edit">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ mr: 1 }}
              onClick={() => onEdit(selectedRows[0])}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(selectedRows)}
            >
              Delete
            </Button>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

export default function CenteralizedTable({ title, columns, rows, onEdit, onDelete }) {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(columns[0]?.id || '');
  const [selected, setSelected] = useState([]); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  const rowIds = useMemo(() => rows.map(r => r.id), [rows]);

  useEffect(() => {
    setSelected(prev => prev.filter(id => rowIds.includes(id)));
  }, [rowIds]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    event.stopPropagation();

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => setDense(event.target.checked);

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows, rowsPerPage]
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          selectedRows={selected}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <TableContainer>
          <Table size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              rowCount={rows.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.indexOf(row.id) !== -1;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.id} align={col.numeric ? 'right' : 'left'}>
                        {row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </Box>
  );
}