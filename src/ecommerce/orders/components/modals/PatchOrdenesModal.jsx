//FIC: React
import React, { useState, useEffect } from "react";
//FIC: Material
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
//FIC: Helpers
import { OrdenesValues } from "../../helpers/OrdenesValues";

//FIC: Services
import { UpdatePatchOneOrder } from "../../service/remote/update/UpdatePatchOneOrder";
import { getAllOrdenes } from "../../service/remote/get/GetAllOrdenes";


//FIC: Services
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";
import { GetTipoOrden } from "../../../labels/services/remote/get/GetAllTipoOrden";
import { GetRol } from "../../../labels/services/remote/get/GetRol";
import { GetPersona } from "../../../labels/services/remote/get/GetPersona";

import { useFormik } from "formik";
import * as Yup from "yup";

import { v4 as genID } from "uuid";

const PatchOrdenesModal = ({
  PatchOrdenesShowModal,
  setPatchOrdenesShowModal,
  row,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);
  const [RolValuesLabel, setRolValuesLabel] = useState([]);
  const [PersonaValuesLabel, setPersonaValuesLabel] = useState([]);
  const [OrdenesData, setOrdenesData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [selectedValue3, setSelectedValue3] = useState('');
  

  const [IdGen, setIdGen] = useState(
    genID().replace(/-/g, "").substring(0, 12)
  );
  //FIC: en cuanto se abre la modal llama el metodo
  //que ejecuta la API que trae todas las etiquetas de la BD.
  useEffect(() => {
    //getDataSelectOrdenesType();
    getDataSelectOrdenesType2();
  //  getDataSelectOrdenesType3();
  //  getDataSelectOrdenesType4();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  /*async function getDataSelectOrdenesType() {
    try {
      const Labels = await GetAllLabels();
      const OrdenesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoOrdenes"
      );
      const valores = OrdenesTypes.valores; // Obtenemos el array de valores
      const IdValoresOK = valores.map((valor, index) => ({
        IdValorOK: valor.IdValorOK,
        key: index, // Asignar el índice como clave temporal
      }));
      setOrdenesValuesLabel(IdValoresOK);
      console.log(OrdenesValuesLabel)
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }*/
  async function getDataSelectOrdenesType2() {
    try {
      const Labels = await GetTipoOrden();
      const OrdenesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoOrdenes"
      );
      const valores = OrdenesTypes.valores; // Obtenemos el array de valores
      const IdValoresOK = valores.map((valor, index) => ({
        IdValorOK: valor.IdValorOK,
        key: index, // Asignar el índice como clave temporal
      }));
      setOrdenesValuesLabel(IdValoresOK);
      console.log(OrdenesValuesLabel)
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }/*
  async function getDataSelectOrdenesType3() {
    try {
      const Labels = await GetRol();
      const OrdenesTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTiposRolesUsuarios"
      );
      const valores = OrdenesTypes.valores; // Obtenemos el array de valores
      const IdValoresOK = valores.map((valor, index) => ({
        IdValorOK: valor.IdValorOK,
        key: index, // Asignar el índice como clave temporal
      }));
      setRolValuesLabel(IdValoresOK);
      console.log(OrdenesValuesLabel)
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }
  async function getDataSelectOrdenesType4() {
    try {
      const Labels = await GetPersona();
      
      // Comprueba si Labels es un array y si tiene datos
      if (Array.isArray(Labels) && Labels.length > 0) {
        const IdValoresOK = Labels.map((valor, index) => ({
          IdValorOK: valor.IdPersonaOK,
          key: index,
        }));
        
        setPersonaValuesLabel(IdValoresOK);
        console.log(OrdenesValuesLabel);
      } else {
        console.log('El resultado de GetPersona() no es un array o está vacío');
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }*/
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  /*const handleSelectChange2 = (event) => {
    setSelectedValue2(event.target.value);
  };
  const handleSelectChange3 = (event) => {
    setSelectedValue3(event.target.value);
  };
*/
  //useEffect para si estamos actualizando el campo no se pueda editar, se usa dentro del mismo textfield
  
  //Este metodo es para refrescar la tabla
  const handleReload = async () => {
    const AllOrdenesData = await getAllOrdenes();
    setOrdenesData(AllOrdenesData);
    setSelectedRowIndex(null);
    //setInfoAdSel(null);
  };

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "9001",
      IdNegocioOK: "1101",
      IdOrdenOK: row.IdOrdenOK,
      IdOrdenBK: row.IdOrdenBK,
      IdTipoOrdenOK: "",
      //IdRolOK: "",
      //IdPersonaOK: "",
    },
    validationSchema: Yup.object({
      IdOrdenOK: Yup.string()
        .required("Campo requerido")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "Solo se permiten caracteres alfanuméricos"
        ),
      IdOrdenBK: Yup.string().required("Campo requerido"),
      IdTipoOrdenOK: Yup.string().required("Campo requerido"),
      //IdRolOK: Yup.string().required("Campo requerido"),
      //IdPersonaOK: Yup.string().required("Campo requerido"),
    }),

    onSubmit: async (values) => {
      //FIC: mostramos el Loading.
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);

      //FIC: notificamos en consola que si se llamo y entro al evento.
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Ordenes = OrdenesValues(values);
        console.log("<<Ordenes>>", Ordenes);
        // console.log("LA ID QUE SE PASA COMO PARAMETRO ES:", row._id);
        // Utiliza la función de actualización si estamos en modo de edición
        await UpdatePatchOneOrder(Ordenes, row.IdOrdenOK); //se puede sacar el objectid con row._id para lo del fic aaaaaaaaaaaaaaaaaaa
        setMensajeExitoAlert("Envío actualizado Correctamente");
        handleReload(); //usar la función para volver a cargar los datos de la tabla y que se vea la actualizada
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo Modificar");
      }

      //FIC: ocultamos el Loading.
      setLoading(false);
    },
  });
  //FIC: props structure for TextField Control.
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={PatchOrdenesShowModal}
      onClose={() => setPatchOrdenesShowModal(false)}
      fullWidth
    >
      <form onSubmit={(e) => {formik.handleSubmit(e); }}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography>
            <strong>
              Modificar Orden
            </strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            value={formik.values.IdInstitutoOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)}
            helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK}
            disabled={true}
          />
          <TextField
            id="IdNegocioOK"
            label="IdNegocioOK*"
            value={formik.values.IdNegocioOK}
            
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK)}
            helperText={formik.touched.IdNegocioOK && formik.errors.IdNegocioOK}
            disabled={true}
          />
          <TextField
            id="IdOrdenOK"
            label="IdOrdenOK*"
            value={formik.values.IdOrdenOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.IdOrdenOK && Boolean(formik.errors.IdOrdenOK)}
            helperText={formik.touched.IdOrdenOK && formik.errors.IdOrdenOK}
            disabled={true}
          />
          <TextField
            id="IdOrdenBK"
            label="IdOrdenBK*"
            value={formik.values.IdOrdenBK}
            {...commonTextFieldProps}
            error={formik.touched.IdOrdenBK && Boolean(formik.errors.IdOrdenBK)}
            helperText={formik.touched.IdOrdenBK && formik.errors.IdOrdenBK}
          />
          <Select
            id="dynamic-select"
            value={selectedValue}
            onChange={handleSelectChange}
            label="TipoOrden"
          >
            {OrdenesValuesLabel.map((option, index) => (
              <MenuItem key={option.IdValorOK} value={option.IdValorOK}>
                {option.IdValorOK}
              </MenuItem>
            ))}
          </Select>
          {/*<Select
            id="dynamic-select2"
            value={selectedValue2}
            onChange={handleSelectChange2}
            label="TipoOrden"
          >
            {RolValuesLabel.map((option, index) => (
              <MenuItem key={option.IdValorOK} value={option.IdValorOK}>
                {option.IdValorOK}
              </MenuItem>
            ))}
          </Select>
          <Select
            id="dynamic-select3"
            value={selectedValue3}
            onChange={handleSelectChange3}
            label="TipoOrden"
          >
            {PersonaValuesLabel.map((option, index) => (
              <MenuItem key={option.IdValorOK} value={option.IdValorOK}>
                {option.IdValorOK}
              </MenuItem>
            ))}
          </Select>
          {/*
          <TextField
            id="Matriz"
            label="Matriz*"
            value={formik.values.Matriz}
            {...commonTextFieldProps}
            error={formik.touched.Matriz && Boolean(formik.errors.Matriz)}
            helperText={formik.touched.Matriz && formik.errors.Matriz}
          />*/}
          {/*<FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Matriz}
                onChange={(event) => {
                  formik.setFieldValue("Matriz", event.target.checked);
                }}
                name="Matriz"
                color="primary"
                disabled={!!mensajeExitoAlert}
              />
            }
            label="Matriz"
          />*/}

          {/* <TextField
            id="IdTipoGiroOK"
            label="IdTipoGiroOK*"
            value={formik.values.IdTipoGiroOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoGiroOK && Boolean(formik.errors.IdTipoGiroOK)
            }
            helperText={
              formik.touched.IdTipoGiroOK && formik.errors.IdTipoGiroOK
            }
          /> */}
          {/*<Select
            value={formik.values.IdTipoGiroOK}
            label="Selecciona una opción"
            onChange={formik.handleChange}
            name="IdTipoGiroOK" //FIC: Asegúrate que coincida con el nombre del campo
            onBlur={formik.handleBlur}
            disabled={!!mensajeExitoAlert}
          >
            {OrdenesValuesLabel.map((tipoGiro) => {
              return (
                <MenuItem
                  value={`IdTipoGiros-${tipoGiro.IdValorOK}`}
                  key={tipoGiro.Valor}
                >
                  {tipoGiro.Valor}
                </MenuItem>
              );
            })}
          </Select>*/}
        </DialogContent>
        {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          {/* FIC: Boton de Cerrar. */}
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setPatchOrdenesShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* FIC: Boton de Guardar. */}
          {/* FIC: Boton de Guardar. */}
          {/* FIC: Boton de Guardar. */}
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting || !!mensajeExitoAlert || Loading}
            loading={Loading}
          >
            <span>
              Actualiar
            </span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default PatchOrdenesModal;