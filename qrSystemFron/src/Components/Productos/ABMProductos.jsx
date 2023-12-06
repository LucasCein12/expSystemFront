import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './css/abmprods.css'
const ABMProductos = ({ close, productid, actualizarListaProductos }) => {
    const navigate = useNavigate()
    const [articulos, setArticulos] = useState([])
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (productid) {
            fetch(`https://qrsystemback.onrender.com/products/${productid}`)
                .then(response => response.json())
                .then(data => {
                    // Asumiendo que 'data' es el objeto que contiene la fecha en formato ISO
                    const fechaAjustada = data.date.split("T")[0];
                    setProducto({
                        ...data,
                        date: fechaAjustada // Aquí aseguras que la fecha esté en el formato correcto
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [productid]);
    useEffect(() => {
        fetch('https://qrsystemback.onrender.com/products/suggest')
            .then(response => response.json())
            .then(data => setArticulos(data))
            .catch(error => console.error(error));
    }, [])
    const [producto, setProducto] = useState({
        name: '',
        code: '',
        quantityb: 0,
        quantityu: 0,
        date: '',
        idealstock: ''
    });
    const [error, setError] = useState(""); // Estado para manejar los mensajes de error
    console.log(articulos)
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "date") {
            // Convierte el valor del input y la fecha actual a formato YYYY-MM-DD
            const inputDate = new Date(value).toISOString().split('T')[0];
            const today = new Date().toISOString().split('T')[0];

            if (inputDate < today) {
                setError("La fecha no puede ser anterior a la actual");
            }
            else {
                setError("");
            }
            setProducto({ ...producto, [name]: value });
        } else if (name == 'code') {
            setProducto({ ...producto, code: value });
            console.log('code', value)
            if (value) {
                setSuggestions(articulos.filter((art) => art.code.toLowerCase().includes(value.toLowerCase())));
            } else {
                setSuggestions([]);
            }
        }
        else {
            // Manejo de otros campos
            if (name === 'quantity' || name === 'idealstock') {
                setProducto({ ...producto, [name]: value === '' ? '' : Number(value) });
            }
            else {
                setProducto({ ...producto, [name]: value });
            }
        }
    };


    const handleBultoChange = (aux) => {

        aux == 's' ? setProducto({ ...producto, quantityb: parseInt(producto.quantityb) + 1 }) : parseInt(producto.quantityb) > 0 && setProducto({ ...producto, quantityb: parseInt(producto.quantityb) - 1 });
    };
    const handleUnitChange = (aux) => {

        aux == 's' ? setProducto({ ...producto, quantityu: parseInt(producto.quantityu) + 1 }) : parseInt(producto.quantityu) > 0 && setProducto({ ...producto, quantityu: parseInt(producto.quantityu) - 1 });
    };
    console.log(producto)
    console.log(productid)
    console.log('error:', error)
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (error == "") {

            if (producto.quantityb == 0 && producto.quantityu == 0) {
                try {
                    fetch(`https://qrsystemback.onrender.com/products/${productid}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                // Si el servidor responde con un error, lanzar una excepción
                                return response.text().then(text => { throw new Error(text) });
                            }
                            const MySwal = withReactContent(Swal)
                            MySwal.fire({
                                title: <strong>Se ha eliminado con Exito!</strong>,
                                icon: 'success',
                                preConfirm: () => {
                                    navigate("/productos")
                                }
                            })
                            // Si la respuesta es exitosa, actualizar la lista de productos
                            // No necesitas parsear la respuesta como JSON si esperas texto plano
                            actualizarListaProductos();
                        })
                        .catch(error => {
                            console.error('Error al eliminar el producto:', error);
                            alert(error.message); // Muestra el mensaje de error
                        });
                    close(); // Cerrar el modal o resetear el formulario como sea necesario
                }
                catch (err) {
                    console.log(error)
                }
            }
            ; // Prevenir el comportamiento por defecto de envío del formulario

            // Verificar si todos los campos están llenos
            if (!producto.name || !producto.code || !producto.quantityb || !producto.quantityu || !producto.idealstock) {
                setError("Todos los campos son obligatorios");
                return;
            }

            if (productid) {
                // Si hay un ID, intenta hacer el PUT
                try {
                    const respuesta = await fetch(`https://qrsystemback.onrender.com/products`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(producto)
                    });

                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`);
                    }
                    const MySwal = withReactContent(Swal)
                    MySwal.fire({
                        title: <strong>Se ha actualizado con Exito!</strong>,
                        icon: 'success',
                        preConfirm: () => {
                            navigate("/productos")
                        }
                    })
                    const resultado = await respuesta.json();
                    console.log('Producto actualizado con：', resultado);
                    close(); // Cerrar el modal o resetear el formulario como sea necesario
                } catch (error) {
                    console.error('Error al actualizar el producto:', error);
                    setError(error.message);
                }
            }
            else {

                // Si todo está correcto, intenta hacer el POST
                try {
                    const respuesta = await fetch('https://qrsystemback.onrender.com/products', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(producto)
                    });

                    if (!respuesta.ok) {
                        throw new Error(`HTTP error! status: ${respuesta.status}`);
                    }
                    const MySwal = withReactContent(Swal)
                    MySwal.fire({
                        title: <strong>Se ha agregado con Exito!</strong>,
                        icon: 'success',
                        preConfirm: () => {
                            navigate("/productos")
                        }
                    })
                    const resultado = await respuesta.json();
                    console.log('Producto agregado con éxito:', resultado);
                    close(); // Cerrar el modal o resetear el formulario como sea necesario
                } catch (error) {
                    console.error('Error al agregar el producto:', error);
                    setError(error.message);
                }
            }
            actualizarListaProductos();
        }
    };
    console.log(producto.date)
    console.log('suggs', suggestions)
    return (
        <section>
            <h1 className="text-center text-dark mb-4">{productid ? 'Editar Producto' : 'Agregar Producto'}</h1>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
                <section className="row mb-3">
                <label htmlFor="name" className="col-sm-4 col-form-label">Codigo:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="code" name="code" placeholder="Codigo" onChange={handleChange} value={producto.code} disabled={!!productid} required />
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="suggestions mt-5 w-50">
                            {suggestions.map((articulo, index) => (
                                <li key={index} onClick={() => {
                                    setProducto({ ...producto, code: articulo.code, name: articulo.descripcion.toLowerCase() });
                                    setSuggestions([]);
                                }}>
                                    {articulo.descripcion} ({articulo.code})
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section className="row mb-3">
                    <label htmlFor="name" className="col-sm-4 col-form-label">Nombre:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Nombre" onChange={handleChange} value={producto.name} disabled required />
                    </div>
                </section>
                <section className="row mb-3">
                    <label htmlFor="quantity" className="col-sm-4 col-form-label">Stock:</label>
                    <div className="col-sm-4">
                        <label htmlFor="quantityb">Bultos:</label>
                        <div className="input-group">
                            <button className="btn btn-success btn-sm" type="button" onClick={() => handleBultoChange('r')}><FaMinus /></button>
                            <input type="number" className="form-control" id="quantityb" name="quantityb" placeholder="Ingrese Stock" onChange={handleChange} value={producto.quantityb} required />
                            <button className="btn btn-success btn-sm" type="button" onClick={() => handleBultoChange('s')}><FaPlus /></button>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <label htmlFor="quantityu">Unidades:</label>
                        <div className="input-group">
                            <button className="btn btn-success btn-sm" type="button" onClick={() => handleUnitChange('r')}><FaMinus /></button>
                            <input type="number" className="form-control" id="quantityu" name="quantityu" placeholder="Ingrese Stock" onChange={handleChange} value={producto.quantityu} required />
                            <button className="btn btn-success btn-sm" type="button" onClick={() => handleUnitChange('s')}><FaPlus /></button>
                        </div>
                    </div>
                </section>
                <section className="row mb-3">
                    <label htmlFor="date" className="col-sm-4 col-form-label">Fecha de Vencimiento:</label>
                    <div className="col-sm-8">
                        <input type="date" className="form-control" id="date" name="date" placeholder="Ingrese Fecha de Vencimiento" onChange={handleChange} value={producto.date} required />
                    </div>
                </section>
                <section className="row mb-3">
                    <label htmlFor="idealstock" className="col-sm-4 col-form-label">Stock Ideal:</label>
                    <div className="col-sm-8">
                        <input type="number" className="form-control" id="idealstock" name="idealstock" placeholder="Ingrese Stock Ideal" onChange={handleChange} value={producto.idealstock} required />
                    </div>
                </section>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-4">{productid ? 'Editar' : 'Agregar'}</button>
                </div>
                {/* Mensaje de Error */}
                {error && <div className="alert alert-danger mt-2 text-center" role="alert">{error}</div>}

            </form>
        </section>
    );
}

export default ABMProductos;
