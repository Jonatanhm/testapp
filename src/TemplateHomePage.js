import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  Tooltip,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import {
  Edit as EditIcon,
  FileCopy as FileCopyIcon,
  ScreenShare as PreviewIcon, // Cambio del ícono "Edit" a "Preview"
} from '@mui/icons-material';

// Componente principal
export function TemplateHomePage() {
  // Definir estados para la paginación y filtros
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [templateName, setTemplateName] = useState('');
  const [creationDate, setCreationDate] = useState(null); // Cambiar a null para el campo de calendario
  const [status, setStatus] = useState('');
  const [additionalFilter, setAdditionalFilter] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showPublishedDate, setShowPublishedDate] = useState(false); // Nuevo estado para mostrar/ocultar Published Date

  // Datos de ejemplo (inicialmente vacíos)
  const [rows, setRows] = useState([]);

  // Valores del filtro "Status"
  const statusOptions = ['Draft', 'Published'];

  // Función para obtener los datos de la API o establecer datos de ejemplo
  const fetchData = () => {
    // Simular una llamada a la API (cámbiala por tu lógica real)
    const dummyData = [
      { id: 1, templateName: 'Plantilla 1', publishDate: '01/09/2023', creationDate: '01/01/2023', status: 'Draft' },
      { id: 2, templateName: 'Plantilla 2', publishDate: '02/09/2023', creationDate: '02/01/2023', status: 'Published' },
      { id: 3, templateName: 'Plantilla 3', publishDate: '03/09/2023', creationDate: '03/01/2023', status: 'Draft' },
      { id: 4, templateName: 'Plantilla 4', publishDate: '04/09/2023', creationDate: '04/01/2023', status: 'Draft' },
      { id: 5, templateName: 'Plantilla 5', publishDate: '05/09/2023', creationDate: '05/01/2023', status: 'Published' },
      { id: 6, templateName: 'Plantilla 6', publishDate: '06/09/2023', creationDate: '06/01/2023', status: 'Draft' },
      { id: 7, templateName: 'Plantilla 7', publishDate: '07/09/2023', creationDate: '07/01/2023', status: 'Published' },
      { id: 8, templateName: 'Plantilla 8', publishDate: '08/09/2023', creationDate: '08/01/2023', status: 'Draft' },
      { id: 9, templateName: 'Plantilla 9', publishDate: '09/09/2023', creationDate: '09/01/2023', status: 'Draft' },
      { id: 10, templateName: 'Plantilla 10', publishDate: '10/09/2023', creationDate: '10/01/2023', status: 'Published' },
      { id: 11, templateName: 'Plantilla 11', publishDate: '11/09/2023', creationDate: '11/01/2023', status: 'Draft' },
      { id: 12, templateName: 'Plantilla 12', publishDate: '12/09/2023', creationDate: '12/01/2023', status: 'Published' },
      { id: 13, templateName: 'Plantilla 13', publishDate: '13/09/2023', creationDate: '13/01/2023', status: 'Published' },
      { id: 14, templateName: 'Plantilla 14', publishDate: '14/09/2023', creationDate: '14/01/2023', status: 'Draft' },
      { id: 15, templateName: 'Plantilla 15', publishDate: '15/09/2023', creationDate: '15/01/2023', status: 'Published' },
    ];
    setRows(dummyData);
  };

  // Llama a la función fetchData al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para manejar el cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para manejar el cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Función para aplicar los filtros cuando se presiona el botón "Search"
  const handleSearch = () => {
    // Lógica de filtrado aquí
    const filteredRows = rows.filter((row) => {
      // Verificar si se debe mostrar todos los datos
      if (showAll) {
        return true;
      }

      const nameMatch = row.templateName.toLowerCase().includes(templateName.toLowerCase());

      // Verificar si el campo Creation Date es nulo o tiene una fecha válida
      const dateMatch = !creationDate || row.creationDate.includes(creationDate);

      const statusMatch = !status || row.status.toLowerCase() === status.toLowerCase();
      
      // Verificar si el campo Publish Date es nulo o tiene una fecha válida
      const publishDateMatch = !showPublishedDate || !row.publishDate || row.publishDate.includes(creationDate);

      return nameMatch && dateMatch && statusMatch && publishDateMatch;
    });

    // Actualizar las filas filtradas
    setFilteredRows(filteredRows);
  };

  // Función para manejar el cambio en el toogle "Additional Filter"
  const handleAdditionalFilterChange = () => {
    // Cambiar la visibilidad del campo "Published Date" según el estado del toogle
    setShowPublishedDate(!showPublishedDate);
    // También puedes aplicar otros filtros aquí según sea necesario
  };

  // Función para limpiar los campos de filtro cuando se presiona el botón "Clear"
  const handleClear = () => {
    setTemplateName('');
    setCreationDate(null);
    setStatus('');
    setAdditionalFilter(false);
    setShowPublishedDate(false);
    setShowAll(false);
    setFilteredRows(rows); // Restablecer las filas filtradas a su estado original
  };

  // Estado para almacenar las filas filtradas
  const [filteredRows, setFilteredRows] = useState([]);

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Template Name"
            variant="outlined"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Creation Date"
            variant="outlined"
            type="date" // Usar type="date" para el campo de calendario
            value={creationDate || ''} // Asegurar que el valor sea una cadena vacía o una fecha válida
            onChange={(e) => setCreationDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                checked={additionalFilter}
                onChange={handleAdditionalFilterChange} // Cambio al toogle "Additional Filter"
                name="additionalFilter"
              />
            }
            label="Additional Filter"
          />
        </Grid>
        {showPublishedDate && ( // Mostrar el campo "Published Date" si showPublishedDate es verdadero
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Published Date"
              variant="outlined"
              type="date"
              value={creationDate || ''}
              onChange={(e) => setCreationDate(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showAll}
                onChange={() => setShowAll(!showAll)}
                name="showAll"
              />
            }
            label="Show All"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Button variant="contained" color="primary" href="/manageTemplate">
            Create New Template
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ display: 'none' }}>ID</TableCell>
              <TableCell>Template Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Published Date</TableCell> {/* Nueva columna "Published Date" */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ display: 'none' }}>{row.id}</TableCell>
                  <TableCell>{row.templateName}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.creationDate}</TableCell>
                  <TableCell>{row.publishDate}</TableCell> {/* Contenido de la nueva columna */}
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton aria-label="Edit">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Clone">
                      <IconButton aria-label="Clone">
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Preview"> {/* Cambio del ícono "Edit" a "Preview" */}
                      <IconButton aria-label="Preview">
                        <PreviewIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
