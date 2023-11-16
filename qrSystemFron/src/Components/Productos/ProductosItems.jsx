import { MDBListGroupItem } from "mdb-react-ui-kit"
import { useEffect, useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

const ProductosItems = () => {
    const [prods, setProds] = useState([])
    const [product,setProduct]=useState([])
    const nav=useNavigate()
    useEffect(() => {
        fetch('https://qrsystemback.onrender.com/products')
            .then(response => response.json())
            .then(data => {
                // Inicializa un arreglo para mantener las promesas
                const qrPromises = data.map(product => {
                    // Llama a getQR para cada producto y devuelve la promesa
                    return getQR(product.productid).then(qrCode => {
                        // Retorna un nuevo objeto de producto con la propiedad qrCode
                        return { ...product, qrCode };
                    });
                });
    
                // Espera a que todas las promesas se resuelvan
                Promise.all(qrPromises).then(productsWithQR => {
                    // Actualiza el estado con los nuevos productos incluyendo los códigos QR
                    setProds(productsWithQR);
                });
            })
            .catch(error => {
                console.log(error)
            });
    }, []);
    
    const getQR = (productid) => {
        // Retorna la promesa fetch para que pueda ser utilizada en Promise.all
        return fetch(`https://qrsystemback.onrender.com/products/${productid}`)
            .then(response => response.json())
            .then(data => {
                // Suponiendo que la respuesta incluye un campo qrCode
                return data.qrCode;
            });
    }
    
    function formatToDDMMYYYY(dateString) {
        // Creamos un objeto de fecha a partir de tu cadena con formato ISO
        let date = new Date(dateString);

        // Obtenemos el día, mes y año del objeto de fecha
        let day = date.getDate();
        let month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        let year = date.getFullYear();

        // Añadimos un cero al inicio si el día o mes es menor de 10 para el formato DD y MM
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;

        // Construimos la cadena con el formato DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }

    return (
        <div>
            {
                prods.map(({productid,name,code,date,quantity,idealstock,missingstock,qrCode}) => (
                    
                    <MDBListGroupItem
                        key={productid}
                        className="container align-items-center justify-content-center"
                    >
                        <div className="row align-items-center">
                            <div className="col ms-4">
                                <p className="mb-0 text-dark">{name}</p>
                            </div>
                            <div className="col ms-5">
                                <p className="mb-0 text-dark">{code}</p>
                            </div>
                            <div className="col ms-5">
                                <p className="mb-0 text-dark">{formatToDDMMYYYY(date)}</p>
                            </div>
                            <div className="col ms-5">
                                <p className="mb-0 text-dark">{quantity}</p>
                            </div>
                            <div className="col ms-5">
                                <p className="mb-0 text-dark">{idealstock}</p>
                            </div>
                            <div className="col ms-5">
                                <p className="mb-0 text-dark">{missingstock}</p>
                            </div>
                            <div className="col ms-5">
                                <p className="mb-0 text-dark">
                                    <img src={qrCode} alt="" />
                                    {/* <button className="btn btn-primary" onClick={() => { nav(`/qrProducto`, { state: {detailProd:{productid,name,code,date,quantity,idealstock,missingstock}} })}}>
                                        <BsEyeFill></BsEyeFill>
                                    </button> */}

                                </p>
                            </div>
                        </div>


                    </MDBListGroupItem>
                ))
            }

        </div >
    )
}

export default ProductosItems