import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getProduct, getProducts } from "../../../services/get";
import { esperar } from "../../../helpers/utils";
import { TOAST_EXITO } from "../../../components/elements/messages/MyToastAlerts";
// Crear un contexto para compartir datos y funciones, y un componente que contendrá todos los estados y funciones
const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productSel, setProductSel] = useState(null);
  const [presentationSel, setPresentationSel] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
  const [idSelectedRowPresentation, setIdSelectedRowPresentation] =
    useState(null);
  const showToastExito = (mensaje) => TOAST_EXITO(mensaje);
  useEffect(() => {
    fetchDataProducts();
  }, []);
  const fetchDataProducts = async (id) => {
    setLoadingTable(true);
    await esperar(300);
    try {
      setProducts(await getProducts());
    } catch (error) {
      console.error(`Error al obtener los productos`, error);
    }
    setLoadingTable(false);
  };
  const fetchDataProductSelect = async (id) => {
    setLoadingTable(true);
    await esperar(200);
    try {
      setProductSel(await getProduct(id));
    } catch (error) {
      console.error(`Error al obtener producto:${id}`, error);
    }
    setLoadingTable(false);
  };
  const fetchPresentationSelect = async (id) => {
    setLoadingTable(true);
    try {
      let productoSel = await getProduct(id);
      let presentaciones = productoSel.cat_prod_serv_presenta;
      let presentacion = presentaciones.find((p) => {
        return p.IdPresentaOK === presentationSel.IdPresentaOK;
      });
      setPresentationSel(presentacion);
    } catch (error) {
      console.error(
        `Error al obtener la presentacion del producto ${id}`,
        error
      );
    }
    setLoadingTable(false);
  };
  // Pasar los datos y funciones a través del contexto
  const contextValue = {
    products,
    productSel,
    loadingTable,
    idSelectedRowProduct,
    idSelectedRowPresentation,
    presentationSel,
    setProductSel,
    fetchDataProducts,
    fetchDataProductSelect,
    showToastExito,
    setIdSelectedRowProduct,
    setIdSelectedRowPresentation,
    setPresentationSel,
    fetchPresentationSelect,
  };
  return (
    <ProductsContext.Provider value={contextValue}>
      {children} <ToastContainer />
    </ProductsContext.Provider>
  );
};
// Crear un hook personalizado para acceder al contexto
export const useProductsContext = () => useContext(ProductsContext);