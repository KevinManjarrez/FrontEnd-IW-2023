import React, { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Box,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProduct } from "../../service/remote/update/UpdateInfoAd";
const UpdateInfoAd = ({
  infoAdSel,
  productSel,
  openModalUpdate,
  setOpenModalUpdate,
  idRowSel,
  handleReload,
}) => {
  const [loading, setLoading] = useState(false);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const formik = useFormik({
    initialValues: {
      IdEtiquetaOK: infoAdSel.IdEtiquetaOK,
      IdEtiqueta: infoAdSel.IdEtiqueta,
      IdTipoSeccionOK: infoAdSel.IdTipoSeccionOK,
      Valor: infoAdSel.Valor,
      Secuencia: infoAdSel.Secuencia,
    },
    validationSchema: Yup.object({
      IdEtiquetaOK: Yup.string().required("Campo requerido"),
      IdEtiqueta: Yup.string().required("Campo requerido"),
      IdTipoSeccionOK: Yup.string().required("Campo requerido"),
      Valor: Yup.number("")
        .typeError("Ingresa un número")
        .required("Campo requerido"),
      Secuencia: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setMensajeExitoAlert("");
      setMensajeErrorAlert("");
      setLoading(true);
      try {
        //Modificar el producto con el Formulario
        let product = productSel;
        product.cat_prod_serv_info_ad[idRowSel].IdEtiquetaOK =
          values.IdEtiquetaOK;
        product.cat_prod_serv_info_ad[idRowSel].IdEtiqueta = values.IdEtiqueta;
        product.cat_prod_serv_info_ad[idRowSel].IdTipoSeccionOK =
          values.IdTipoSeccionOK;
        product.cat_prod_serv_info_ad[idRowSel].Valor = values.Valor;
        product.cat_prod_serv_info_ad[idRowSel].Secuencia = Number(
          values.Secuencia
        );
        const dataToUpdate = {
          cat_prod_serv_info_ad: product.cat_prod_serv_info_ad,
        };
        await updateProduct(product.IdProdServOK, dataToUpdate);
        setMensajeExitoAlert("InfoAd modificada Correctamente");
        handleReload();
      } catch (e) {
        setMensajeErrorAlert("No se pudo Modificar InfoAd");
      }
      setLoading(false);
    },
  });
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
  };
  return (
    <Dialog
      open={openModalUpdate}
      onClose={() => setOpenModalUpdate(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle
          style={{
            backgroundColor: "#1976d2", // Color de Fondo
            color: "white", // Color del Texto
          }}
        >
          <Typography style={{ fontSize: "25px" }}>
            <strong>Modificar Info Adicional</strong>
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="IdEtiquetaOK"
            label="IdEtiquetaOK*"
            value={formik.values.IdEtiquetaOK}
            error={
              formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)
            }
            helperText={
              formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK
            }
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="IdEtiqueta"
            label="IdEtiqueta*"
            value={formik.values.IdEtiqueta}
            error={
              formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)
            }
            helperText={formik.touched.IdEtiqueta && formik.errors.IdEtiqueta}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="Valor"
            label="Valor*"
            value={formik.values.Valor}
            error={formik.touched.Valor && Boolean(formik.errors.Valor)}
            helperText={formik.touched.Valor && formik.errors.Valor}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="IdTipoSeccionOK"
            label="IdTipoSeccionOK*"
            value={formik.values.IdTipoSeccionOK}
            error={
              formik.touched.Valor && Boolean(formik.errors.IdTipoSeccionOK)
            }
            helperText={
              formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK
            }
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
          <TextField
            id="Secuencia"
            label="Secuencia*"
            value={formik.values.Secuencia}
            error={formik.touched.Secuencia && Boolean(formik.errors.Secuencia)}
            helperText={formik.touched.Secuencia && formik.errors.Secuencia}
            {...commonTextFieldProps}
            disabled={!!mensajeExitoAlert}
          />
        </DialogContent>
        <DialogActions sx={{ width: "auto" }}>
          <Box m="auto">
            {!formik.isValid && (
              <Alert severity="error">{"El formulario contiene Errores"}</Alert>
            )}
            {mensajeErrorAlert !== "" && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert !== "" && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            sx={{ p: 1.5, px: 2 }}
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setOpenModalUpdate(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            type="submit"
            sx={{ p: 1.5, px: 2 }}
            color="primary"
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            disabled={!formik.isValid || !!mensajeExitoAlert}
          >
            <span>MODIFICAR</span>
          </LoadingButton>
        </DialogActions>{" "}
      </form>
    </Dialog>
  );
};
export default UpdateInfoAd;