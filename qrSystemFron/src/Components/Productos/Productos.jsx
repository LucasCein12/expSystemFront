import { MDBListGroup } from "mdb-react-ui-kit";
import ProductosItems from "./ProductosItems";
const Productos = () => {
    return (
        <section>
            <section>
                <h1 className="text-center text-light mt-5">Productos</h1>
            </section>
            <MDBListGroup className="w-100 mt-5">
                <section className="container pt-1 rounded d-flex align-items-center justify-content-center" style={{ backgroundColor: "black"}}>
                    <section className="row w-100">
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Nombre</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Codigo</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Fecha Vencimiento</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Cantidad</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Stock Ideal</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Faltante</p>
                        </section>
                        <section className="col d-flex justify-content-center">
                            <p className="fw-bold text-light">Codigo Qr</p>
                        </section>
                    </section>
                </section>

                <ProductosItems

                />
            </MDBListGroup></section>
    )
}

export default Productos