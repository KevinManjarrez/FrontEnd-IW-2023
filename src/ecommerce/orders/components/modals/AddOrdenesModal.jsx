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
import { AddOneOrdenes } from "../../service/remote/post/AddOneOrdenes";

//FIC: Services
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";

import { useFormik } from "formik";
import * as Yup from "yup";

import { v4 as genID } from "uuid";

const AddOrdenesModal = ({
  AddOrdenesShowModal,
  setAddOrdenesShowModal,
  isEditMode,
  isDeleteMode,
  row,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [IdGen, setIdGen] = useState(
    genID().replace(/-/g, "").substring(0, 12)
  );
  //FIC: en cuanto se abre la modal llama el metodo
  //que ejecuta la API que trae todas las etiquetas de la BD.
  useEffect(() => {
    getDataSelectOrdenesType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  async function getDataSelectOrdenesType() {
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
  }
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //useEffect para si estamos actualizando el campo no se pueda editar, se usa dentro del mismo textfield
  // Dentro del componente AddShippingModal
  useEffect(() => {
    // Si estamos en modo edición, deshabilita el campo
    if (isEditMode) {
      formik.setFieldValue("IdOrdenOK", formik.values.IdOrdenOK); // Asegúrate de establecer el valor
      formik.setFieldTouched("IdOrdenOK", false); // También puedes desactivar el indicador de "touched" si lo deseas
    }
  }, [isEditMode]);
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "9001",
      IdNegocioOK: "1101",
      IdOrdenOK: row ? row.IdOrdenOK : `9001-${IdGen}`,
      IdOrdenBK: row ? row.IdOrdenBK : "",
      IdTipoOrdenOK: "",
      IdRolOK: "",
      /* Matriz: "", */
      //Matriz: false,
      IdPersonaOK: row ? row.IdPersonaOK : `9001-${IdGen}`,
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
      IdRolOK: Yup.string().required("Campo requerido"),
      /*Matriz: Yup.string()
          .required("Campo requerido"),
          .max(1, 'Solo se permite una letra')
          .matches(/^[SN]$/, 'Solo se permite un caracter S/N'), */
      //Matriz: Yup.boolean().required("Campo requerido"),
      /*IdTipoGiroOK: Yup.string()
        .required("Campo requerido")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          'Solo se permiten caracteres alfanuméricos y el simbolo "-"'
        ),*/
      IdPersonaOK: Yup.string().required("Campo requerido"),
    }),

    onSubmit: async (values) => {
      //FIC: mostramos el Loading.
      setLoading(true);

      //FIC: notificamos en consola que si se llamo y entro al evento.
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        //FIC: si fuera necesario meterle valores compuestos o no compuestos
        //a alguns propiedades de formik por la razon que sea, se muestren o no
        //estas propiedades en la ventana modal a travez de cualquier control.
        //La forma de hacerlo seria:
        //formik.values.IdInstitutoBK = `${formik.values.IdInstitutoOK}-${formik.values.IdCEDI}`;
        //formik.values.Matriz = autoChecksSelecteds.join(",");

        /*if(isEditMode) {
            console.log("SE ESTA ACTUALIZANDO RAAAAAAAAAH");
            const Ordenes = OrdenesValues(values);
            console.log("<<Shipping>>", Ordenes);
            // console.log("LA ID QUE SE PASA COMO PARAMETRO ES:", row._id);
            // Utiliza la función de actualización si estamos en modo de edición
            await UpdateOneShipping(Ordenes, row ? row.IdEntregaOK : null); //se puede sacar el objectid con row._id para lo del fic aaaaaaaaaaaaaaaaaaa
            setMensajeExitoAlert("Envío actualizado Correctamente");
            onUpdateShippingData(); //usar la función para volver a cargar los datos de la tabla y que se vea la actualizada
        }else if(isDeleteMode){
            const Shipping = OrdenesValues(values);
            console.log("<<Shipping>>", Shipping);
            // console.log("LA ID QUE SE PASA COMO PARAMETRO ES:", row._id);
            // Utiliza la función de eliminar si estamos en modo de eliminación
            await DeleteOneShipping(row.IdEntregaOK);
            setMensajeExitoAlert("Envío eliminado Correctamente");
            onUpdateShippingData(); //usar la función para volver a cargar los datos de la tabla y que se vea la actualizada
        }else{*/
        //FIC: mutar los valores (true o false) de Matriz.

        //values.Matriz == true ? (values.Matriz = "S") : (values.Matriz = "N");

        //FIC: Extraer los datos de los campos de
        //la ventana modal que ya tiene Formik.

        const Ordenes = OrdenesValues(values);

        //FIC: mandamos a consola los datos extraidos
        console.log("<<Institute>>", Ordenes);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneInstitute" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneOrdenes(Ordenes);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataInstitute();
        //}
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
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
      open={AddOrdenesShowModal}
      onClose={() => setAddOrdenesShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography>
            <strong>
              {isEditMode
                ? "ACTUALIZAR ENVÍO"
                : isDeleteMode
                ? "ELIMINAR ENVÍO"
                : "AGREGAR ENVÍO"}
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
            id="IdOrdenOK"
            label="IdOrdenOK*"
            value={formik.values.IdOrdenOK}
            disabled
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.IdOrdenOK && Boolean(formik.errors.IdOrdenOK)}
            helperText={formik.touched.IdOrdenOK && formik.errors.IdOrdenBK}
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
          <TextField
            id="IdRolOK"
            label="IdRolOK*"
            value={formik.values.IdRolOK}
            {...commonTextFieldProps}
            error={formik.touched.IdRolOK && Boolean(formik.errors.IdRolOK)}
            helperText={formik.touched.IdRolOK && formik.errors.IdRolOK}
          />
          <TextField
            id="IdPersonaOK"
            label="IdPersonaOK*"
            value={formik.values.IdPersonaOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdPersonaOK && Boolean(formik.errors.IdPersonaOK)
            }
            helperText={formik.touched.IdPersonaOK && formik.errors.IdPersonaOK}
          />
        </DialogContent>
        {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {console.log("mensajeExitoAlert", mensajeExitoAlert)}
            {console.log("mensajeErrorAlert", mensajeErrorAlert)}
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
            onClick={() => setAddOrdenesShowModal(false)}
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
            disabled={!!mensajeExitoAlert}
            loading={Loading}
          >
            <span>
              {isEditMode
                ? "ACTUALIZAR"
                : isDeleteMode
                ? "ELIMINAR"
                : "GUARDAR"}
            </span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default AddOrdenesModal;
