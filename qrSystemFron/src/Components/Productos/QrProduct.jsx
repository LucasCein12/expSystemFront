import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QrProduct = () => {
    const [product, setProduct] = useState([])
    const location = useLocation();
    const nav=useNavigate()
    const { detailProd } = location.state;
    console.log(detailProd.productid)
    useEffect(() => {
        fetch(`https://qrsystemback.onrender.com/products/${detailProd.productid}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [])
    console.log(product)
    return (
        <section>
            <button className="btn btn-primary mt-4 ms-5" onClick={()=>{nav(-1)}}>Volver</button>
            <h1 className="text-center text-light mt-3">Qr del Producto: {product.name}</h1>
            <div className="d-flex justify-content-center align-items-center mt-5" >
                <img src={product.qrCode} alt="QR Code" className="img-fluid" />

            </div>
        </section>



    )
}

export default QrProduct