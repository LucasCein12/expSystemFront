import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import ProductosItems from "./ProductosItems";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import ABMProductos from "./ABMProductos";
const Productos = () => {
    const [productos, setProductos] = useState([]);

    // Función para actualizar la lista de productos
    const actualizarListaProductos = () => {
        // Llamada a la API para obtener la lista actualizada
        fetch('https://qrsystemback.onrender.com/products')
            .then(response => response.json())
            .then(data => {
                setProductos(data); // Actualizar el estado con la nueva lista de productos
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        actualizarListaProductos();
    }, []);


    return (
        <section>
            <section>
                <h1 className="text-center text-light mt-5">Productos</h1>
            </section>
            <MDBListGroup className="w-100 mt-5">
                <section className="d-flex justify-content-end mb-3" style={{ marginRight: '10%' }}>
                    <Popup trigger={<button className="btn btn-success" >agregar Nuevo</button>} modal position={'center center'}>
                        {close => <ABMProductos close={close} productos={productos} actualizarListaProductos={actualizarListaProductos}></ABMProductos>}
                    </Popup>
                </section>
                {/* Header */}
                <section className="container pt-1 rounded d-flex align-items-center justify-content-center bg-black">
                    <section className="row w-100">
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Nombre</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Codigo</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Fecha Vencimiento</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Cantidad</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Stock Ideal</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Faltante</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0">Acciones</p>
                        </section>
                    </section>
                </section>
                {/* Items */}
                <ProductosItems productos={productos} />
            </MDBListGroup>
        </section>
    );
};

export default Productos;