import axios from "axios";
export function GetAllLabels() {
    return new Promise((resolve, reject) => {
      //FIC: URL = http://localhost:8080/api/pwa/labels 
      //axios.get("http://localhost:8080/api/pwa/labels") 
      axios.get("http://127.0.0.1:3020/api/pwa/orders/labels")
        .then((response) => {
          const data = response.data;
        //console.log("getAllLabels()", data);
          if (!data.success) {
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<GetAllLabels>> de forma correcta", data);
            reject(data); //FIC: Rechaza la promesa con la respuesta si no fue exitosa
          } else if (data.data.length === 0) {
            console.info("🛈 <<NO>> se encontraron documentos <<cat_etiquetas>>");
            resolve([]);
          } else if (data.success) {
            const labels = data.data[0].dataRes;
            console.log("Coleccion: <<cat_etiquetas>>", labels);
            resolve(JSON.parse(JSON.stringify(labels))); // Resuelve la promesa y hace una copia profunda
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<GetAllLabels>>", error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  }