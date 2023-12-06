import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import ProductosItems from "./ProductosItems";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import ABMProductos from "./ABMProductos";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/prodsCss.css"
const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [prodsFiltrados, setProdsFiltrados] = useState([])
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [orden, setOrden] = useState({ columna: 'date', direccion: 'asc' });

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


    const cambiarOrden = (columna) => {
        setOrden((ordenActual) => ({
            columna,
            direccion: ordenActual.direccion === 'asc' && ordenActual.columna === columna ? 'desc' : 'asc'
        }));
    };


    const ordenarProductos = (productos) => {
        return productos.sort((a, b) => {
            if (a[orden.columna] < b[orden.columna]) {
                return orden.direccion === 'asc' ? -1 : 1;
            }
            if (a[orden.columna] > b[orden.columna]) {
                return orden.direccion === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const onChange = (e) => {

        const { name, value } = e.target;
        console.log(value);

        if (value) {
            setProdsFiltrados(productos.filter((prod) => {
                return prod[name].toString().toLowerCase().includes(value.toLowerCase());
            }));
        } else {
            // Si no hay ningún valor, muestra todos los productos
            setProdsFiltrados(productos);
        }
    };
    const changeDate = (update) => {
        const [start, end] = update;
        setDateRange(update);

        // Verifica si ambas fechas, inicio y fin, están establecidas
        if (start && end) {
            const sDate = new Date(start).toISOString().split('T')[0];
            const eDate = new Date(end).toISOString().split('T')[0];
            console.log(sDate)
            console.log(eDate)
            setProdsFiltrados(productos.filter((prod) => {
                const prodDate = new Date(prod.date).toISOString().split('T')[0];
                return prodDate >= sDate && prodDate <= eDate;
            }));
        } else {
            setProdsFiltrados(productos);
        }
    };
    console.log(prodsFiltrados)
    const productosOrdenados = ordenarProductos(prodsFiltrados.length > 0 ? prodsFiltrados : productos);
    return (
        // <section>
        //     <section>
        //         <h1 className="text-center text-light mt-5">Productos</h1>
        //     </section>
        //     <section>
        //         <h3 className="text-light" style={{ marginLeft: '10%' }}>Filtros</h3>
        //         <section className="d-flex align-items-center justify-content-start gap-2" style={{ marginLeft: '10%' }}>
        //             <section className="d-flex">
        //                 <span className="text-light fw-bold" style={{ marginLeft: '10%' }}>Codigo:</span>
        //                 <input type="text" className="rounded ms-1" placeholder="Ingresa el Codigo" name='code' onChange={onChange} />
        //             </section>
        //             <section className="d-flex">
        //                 <span className="text-light fw-bold" style={{ marginLeft: '10%' }}>Nombre:</span>
        //                 <input type="text" className="rounded ms-1" placeholder="Ingresa el Nombre" name='name' onChange={onChange} />
        //             </section>
        //             <section className="d-flex ms-5 gap-1" >
        //                 <span className="text-light fw-bold">Fecha: </span>
        //                 <DatePicker
        //                     selectsRange={true}
        //                     startDate={startDate}
        //                     endDate={endDate}
        //                     onChange={(update) => {
        //                         changeDate(update);
        //                     }}
        //                     isClearable={true}
        //                     placeholderText="Seleccione el rango"
        //                 />
        //             </section>
        //         </section>
        //     </section>
        //     <MDBListGroup className="w-100 mt-5">
        //         <section className="d-flex justify-content-end mb-3" style={{ marginRight: '10%' }}>
        //             <Popup trigger={<button className="btn btn-success" >agregar Nuevo</button>} modal position={'center center'}>
        //                 {close => <ABMProductos close={close} productos={productos} actualizarListaProductos={actualizarListaProductos}></ABMProductos>}
        //             </Popup>
        //         </section>
        //         {/* Header */}
        //         <section className="container pt-1 rounded d-flex align-items-center justify-content-center bg-black">
        //             <section className="row w-100 ">
        //                 <section className="col d-flex justify-content-center ">
        //                 </section>
        //                 <section className="col d-flex justify-content-center">
        //                     <p className="fw-bold text-light mb-0 cursor-pointer" onClick={() => cambiarOrden('name')}>Nombre</p>
        //                 </section>
        //                 <section className="col d-flex justify-content-center">
        //                     <p className="fw-bold text-light mb-0 cursor-pointer" onClick={() => cambiarOrden('code')} >Codigo</p>
        //                 </section>
        //                 <section className="col d-flex justify-content-center">
        //                     <p className="fw-bold text-light mb-0 cursor-pointer" onClick={() => cambiarOrden('date')} >Fecha Vencimiento</p>
        //                 </section>
        //                 <section className="col d-flex justify-content-center">
        //                     <p className="fw-bold text-light mb-0 cursor-pointer" onClick={() => cambiarOrden('quantityu')} >Cantidad Unid.</p>
        //                 </section>
        //                 <section className="col d-flex justify-content-center ">
        //                     <p className="fw-bold text-light mb-0 cursor-pointer"  onClick={() => cambiarOrden('quantityb')} >Cantidad Bulto</p>
        //                 </section>
        //                 <section className="col d-flex justify-content-center">
        //                     <p className="fw-bold text-light mb-0">Acciones</p>
        //                 </section>
        //             </section>
        //         </section>
        //         {/* Items */}
        //         <ProductosItems productos={productosOrdenados} />
        //     </MDBListGroup>
        // </section>
        <section className="container-fluid p-3">
            <h1 className="text-center text-light">Productos</h1>

            <section className="row">
                <section className="col-12">
                    <h3 className="text-light">Filtros</h3>

                    <section className="row">
                        <section className="col-md-4 mb-2">
                            <span className="text-light fw-bold">Codigo:</span>
                            <input type="text" className="form-control" placeholder="Ingresa el Codigo" name='code' onChange={onChange} />
                        </section>
                        <section className="col-md-4 mb-2">
                            <span className="text-light fw-bold">Nombre:</span>
                            <input type="text" className="form-control" placeholder="Ingresa el Nombre" name='name' onChange={onChange} />
                        </section>
                        <section className="col-md-4 mb-2 ">
                            <span className="text-light fw-bold d-block">Fecha: </span>
                            <DatePicker
                                className="form-control"
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => changeDate(update)}
                                isClearable={true}
                                placeholderText="Seleccione el rango"
                            />
                        </section>
                    </section>
                </section>
            </section>

            <MDBListGroup className="mt-3">
                <section className="d-flex justify-content-end mb-3">
                    <Popup trigger={<button className="btn btn-success" style={{ marginRight: '10%' }}>Agregar Nuevo</button>} modal position={'center center'}>
                        {close => <ABMProductos close={close} productos={productos} actualizarListaProductos={actualizarListaProductos}></ABMProductos>}
                    </Popup>
                </section>

                <section className="container pt-1 rounded d-none d-md-flex align-items-center justify-content-center bg-black">
                    <section className="row w-100">
                        <section className="col-12 col-md-2 d-flex justify-content-center">
                        </section>
                        
                        <section className="col-12 col-md-2 d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0 cursor-pointer d-none d-md-block" onClick={() => cambiarOrden('name')}>Nombre</p>
                        </section>

                        
                        <section className="col-12 col-md d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0 cursor-pointer d-none d-md-block" onClick={() => cambiarOrden('code')}>Codigo</p>
                        </section>

                       
                        <section className="col-12 col-md d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0 cursor-pointer d-none d-md-block" onClick={() => cambiarOrden('date')}>Fecha Vencimiento</p>
                        </section>

                        
                        <section className="col-12 col-md d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0 cursor-pointer d-none d-md-block" onClick={() => cambiarOrden('quantityu')}>Cantidad Unid.</p>
                        </section>

                        
                        <section className="col-12 col-md d-flex justify-content-center">
                            <p className="fw-bold text-light mb-0 cursor-pointer d-none d-md-block" onClick={() => cambiarOrden('quantityb')}>Cantidad Bulto</p>
                        </section>

                        
                        <section className="col-12 col-md d-flex justify-content-center ">
                            <p className="fw-bold text-light mb-0 d-none d-md-block">Acciones</p>
                        </section>
                    </section>
                </section>

                <ProductosItems productos={productosOrdenados} />
            </MDBListGroup>
        </section>
    );
};

export default Productos;