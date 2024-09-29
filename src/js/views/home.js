import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	useEffect(() => {
        actions.traerContactos();
    },[]);

    return (
        <div className="containerPrimary">
            <div className="d-flex justify-content-end mb-2">
                <Link to="/crearContacto">
                    <button className="btn-custom">Añadir nuevo contacto</button>
                </Link>
            </div>
            {(!store.agenda || store.agenda.length === 0) ? (
                <p className="text-center">No tienes contactos</p>
            ) : (
                <ul className="list-group">
                    {store.agenda.map((item, index) => (
                        <div className="container" key={index}>
                            <div className="row my-2 contact">
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    <img
                                        src="https://www.thehappycatsite.com/wp-content/uploads/2017/11/Tuxedo-Cats-34-Awesome-Facts-You_ll-Love-HC-long_.jpg"
                                        className="rounded-circle contactoImagen"
                                        alt="Imagen contacto"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <h3>{item.name}</h3>
                                    <p className="item text-secondary mb-1">
                                        <i className="far fa-envelope"></i> {item.email}
                                    </p>
                                    <p className="item text-secondary mb-1">
                                        <i className="fas fa-phone"></i> {item.phone}
                                    </p>
                                </div>
                                <div className="col-md-3 d-flex justify-content-between align-items-center">
                                    <span className="btn btn-sm fs-3" onClick={() => {
                                        actions.guardarContacto(item);
                                        navigate("/editarContacto");
                                    }}>
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span className="btn btn-sm fs-3 me-5" onClick={() => {
                                        actions.borrarContacto(item.id);
                                    }}>
                                        <i className="far fa-trash-alt"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

