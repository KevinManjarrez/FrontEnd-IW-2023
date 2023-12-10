import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UpdatePatchOneOrder } from "../../service/remote/post/AddOrdenesEstatus";

const OrdenesDetalleModal = ({
  OrdenesDetalleShowModal,
  setOrdenesDetalleShowModal,
  row,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      IdProdServOK: "",
      IdPresentaOK: "",
      DesPresentaPS: "",
      Cantidad: "",
      PrecioUniSinIVA: "",
      PrecioUniConIVA: "",
      PorcentajeIVA: "",
      MontoUniIVA: "",
      SubTotalSinIVA: "",
      SubTotalConIVA: "",
    },
    validationSchema: Yup.object({
      IdProdServOK: Yup.string().required("Campo requerido"),
      IdPresentaOK: Yup.string().required("Campo requerido"),
      DesPresentaPS: Yup.string().required("Campo requerido"),
      Cantidad: Yup.string().required("Campo requerido"),
      PrecioUniSinIVA: Yup.string().required("Campo requerido"),
      PrecioUniConIVA: Yup.string().required("Campo requerido"),
      PorcentajeIVA: Yup.string().required("Campo requerido"),
      MontoUniIVA: Yup.string().required("Campo requerido"),
      SubTotalSinIVA: Yup.string().required("Campo requerido"),
      SubTotalConIVA: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);

      try {
        const DetalleOrdenes = { ...values }; // Hacer cualquier transformación de datos si es necesario
        await UpdatePatchOneOrder(row.IdOrdenOK,DetalleOrdenes);
        setMensajeExitoAlert("Envío actualizado correctamente");
      } catch (e) {
        setMensajeErrorAlert("No se pudo registrar");
      }
      setLoading(false);
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={OrdenesDetalleShowModal}
      onClose={() => setOrdenesDetallesShowModal(false)}
      fullWidth
    >
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <DialogTitle>
          <Typography>
            <strong>Agregar Nuevo Estado de la Orden</strong>
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="IdProdServOK"
            label="IdProdServOK*"
            value={formik.values.IdProdServOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdProdServOK &&
              Boolean(formik.errors.IdProdServOK)
            }
            helperText={
              formik.touched.IdProdServOK && formik.errors.IdProdServOK
            }
          />
          <TextField
            id="IdPresentaOK"
            label="IdPresentaOK*"
            value={formik.values.IdPresentaOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdPresentaOK &&
              Boolean(formik.errors.IdPresentaOK)
            }
            helperText={
              formik.touched.IdPresentaOK && formik.errors.IdPresentaOK
            }
          />
          <TextField
            id="DesPresentaPS"
            label="DesPresentaPS*"
            value={formik.values.DesPresentaPS}
            {...commonTextFieldProps}
            error={
              formik.touched.DesPresentaPS &&
              Boolean(formik.errors.DesPresentaPS)
            }
            helperText={
              formik.touched.DesPresentaPS && formik.errors.DesPresentaPS
            }
          />
          {/* Agregar el resto de los campos aquí */}
        </DialogContent>
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
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setOrdenesDetalleShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
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

export default OrdenesDetalleModal;
