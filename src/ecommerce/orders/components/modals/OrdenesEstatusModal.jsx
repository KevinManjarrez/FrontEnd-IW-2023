import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert,InputLabel, Select, MenuItem  } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useState,useEffect } from "react";

//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//HELPERS
import { OrdenesEstatusValues } from "../../helpers/OrdenesEstatusValues";
import { UpdatePatchOneOrder } from "../../service/remote/post/AddOrdenesEstatus";
import { GetOneOrderByID } from "../../service/remote/get/GetOneOrderByID";
import { GetAllLabels } from "../../../labels/services/remote/get/GetAllLabels";


const OrdenesEstatusModal = ({ OrdenesEstatusShowModal, setOrdenesEstatusShowModal,row,handleReload }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [OrdenesValuesLabel, setOrdenesValuesLabel] = useState([]);

    //Para ver la data que trae el documento completo desde el dispatch de ShippingsTable
    //FIC: Definition Formik y Yup.
    const formik = useFormik({
        initialValues: {
            IdTipoEstatusOK: "",
            Actual: "S",
            Observacion: ""
        },
        validationSchema: Yup.object({
            IdTipoEstatusOK: Yup.string().required("Campo requerido"),
            Actual: Yup.string().required("Campo requerido").max(1, 'Solo se permite una letra').matches(/^[SN]$/, 'Solo se permite un caracter S/N'),
            Observacion: Yup.string().required("Campo requerido"),
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
                const ordenExistente = await GetOneOrderByID(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK);
                //console.log("<<Ordenes>>", ordenExistente.ordenes_estatus[0].Actual);
                
                for (let index = 0; index < ordenExistente.ordenes_estatus.length; index++) {
                    console.log("Entro")
                    ordenExistente.ordenes_estatus[index]= {
                        IdTipoEstatusOK: ordenExistente.ordenes_estatus[index].IdTipoEstatusOK,
                        Actual: "N",
                        Observacion:ordenExistente.ordenes_estatus[index].Observacion
                      };
                      console.log("Realizo",ordenExistente)
                }
                const EstatusOrdenes = OrdenesEstatusValues(values, ordenExistente);
                //const EstatusOrdenes = OrdenesEstatusValues(values);
                
                console.log("<<Ordenes>>", EstatusOrdenes);
                // console.log("LA ID QUE SE PASA COMO PARAMETRO ES:", row._id);
                // Utiliza la función de actualización si estamos en modo de edición
                
                await UpdatePatchOneOrder(row.IdInstitutoOK,row.IdNegocioOK,row.IdOrdenOK,EstatusOrdenes); //se puede sacar el objectid con row._id para lo del fic aaaaaaaaaaaaaaaaaaa
                setMensajeExitoAlert("Envío actualizado Correctamente");
                handleReload(); //usar la función para volver a cargar los datos de la tabla y que se vea la actualizada
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo Registrar");
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


    async function getDataSelectOrdenesType2() {
        try {
          const Labels = await GetAllLabels();
          const OrdenesTypes = Labels.find(
            (label) => label.IdEtiquetaOK === "IdTipoOrdenes"
          );
          const valores = OrdenesTypes.valores; // Obtenemos el array de valores
          const IdValoresOK = valores.map((valor, index) => ({
            IdValorOK: valor.Valor,
            key: valor.IdValorOK, // Asignar el índice como clave temporal
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

      useEffect(() => {
        getDataSelectOrdenesType2();
      },[]);
  

    return(
        <Dialog
            open={OrdenesEstatusShowModal}
            onClose={() => setOrdenesEstatusShowModal(false)}
            fullWidth
        >
            <form onSubmit={(e) => {formik.handleSubmit(e); }}>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography >
                        <strong>Agregar Nuevo Estado de la Orden</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    {/*<TextField
                        id="IdTipoEstatusOK"
                        label="IdTipoEstatusOK*"
                        value={formik.values.IdTipoEstatusOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdTipoEstatusOK && Boolean(formik.errors.IdTipoEstatusOK) }
                        helperText={ formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK }
    />*/}
                    <InputLabel htmlFor="dynamic-select-tipo-orden">Tipo de Orden</InputLabel>
                    <Select
                        id="dynamic-select-tipo-orden"
                        value={formik.values.IdTipoEstatusOK}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="IdTipoEstatusOK"
                        aria-label="TipoOrden"
                    >
                        {OrdenesValuesLabel.map((option, index) => (
                        <MenuItem key={option.IdValorOK} value={`IdEstatusOrden-${option.key}`}>
                            {option.IdValorOK}
                        </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        id="Actual"
                        label="Actual*"
                        value={formik.values.Actual}
                        {...commonTextFieldProps}
                        error={ formik.touched.Actual && Boolean(formik.errors.Actual) }
                        helperText={ formik.touched.Actual && formik.errors.Actual }
                        disabled
                    />
                    <TextField
                        id="Observacion"
                        label="Observacion*"
                        value={formik.values.Observacion}
                        {...commonTextFieldProps}
                        error={ formik.touched.Observacion && Boolean(formik.errors.Observacion) }
                        helperText={ formik.touched.Observacion && formik.errors.Observacion }
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
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
                        onClick={() => setOrdenesEstatusShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                    {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting || !!mensajeExitoAlert || Loading}
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default OrdenesEstatusModal;