import { useEffect, useState } from "react";

const ABMProductos = ({ close, productid, actualizarListaProductos }) => {
    console.log(actualizarListaProductos)
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

    const [producto, setProducto] = useState({
        name: '',
        code: '',
        quantity: '',
        date: '',
        idealstock: ''
    });
    const [error, setError] = useState(""); // Estado para manejar los mensajes de error

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity' || name === 'idealstock') {
            setProducto({ ...producto, [name]: value === '' ? '' : Number(value) });
        } else {
            setProducto({ ...producto, [name]: value });
        }
    };
    

    const handleSubmit = async (e) => {

        e.preventDefault(); // Prevenir el comportamiento por defecto de envío del formulario

        // Verificar si todos los campos están llenos
        if (!producto.name || !producto.code || !producto.quantity || !producto.idealstock) {
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

                const resultado = await respuesta.json();
                console.log('Producto agregado con éxito:', resultado);
                close(); // Cerrar el modal o resetear el formulario como sea necesario
            } catch (error) {
                console.error('Error al agregar el producto:', error);
                setError(error.message);
            }
        }
        actualizarListaProductos();
    };
    console.log(producto.date)
    return (
        <section>
            <h1 className="text-center text-dark mb-4">{productid ? 'Editar Producto' : 'Agregar Producto'}</h1>
            <form className="container w-50" onSubmit={handleSubmit}>
                <section className="row mb-3">
                    <label className="text-dark col" htmlFor="name">Nombre:</label>
                    <input className="col" type="text" id="name" name="name" placeholder="Ingrese Nombre" onChange={handleChange} value={producto.name} required />
                </section>
                <section className="row mb-3">
                    <label className="text-dark col" htmlFor="code">Código:</label>
                    <input className="col" type="text" id="code" name="code" placeholder="Ingrese Código" onChange={handleChange} value={producto.code} required />
                </section>
                <section className="row mb-3">
                    <label className="text-dark col" htmlFor="quantity">Stock:</label>
                    <input className="col" type="number" id="quantity" name="quantity" placeholder="Ingrese Stock" onChange={handleChange} value={producto.quantity} required />
                </section>
                <section className="row mb-3">
                    <label className="text-dark col" htmlFor="date">Fecha de Vencimiento:</label>
                    <input className="col" type="date" id="date" name="date" placeholder="Ingrese Fecha de Vencimiento" onChange={handleChange} value={producto.date} required />
                </section>
                <section className="row mb-3">
                    <label className="text-dark col" htmlFor="idealstock">Stock Ideal:</label>
                    <input className="col" type="number" id="idealstock" name="idealstock" placeholder="Ingrese Stock Ideal" onChange={handleChange} value={producto.idealstock} required />
                </section>
                <section className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success mt-4">{productid ? 'Editar' : 'Agregar'}</button>
                </section>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </form>
        </section>
    );
}

export default ABMProductos;
