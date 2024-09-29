import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const EditarContacto = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState(store.contacto);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    return (
        <div className="formulario container my-3">
            <h2>Editar Contacto</h2>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Ingresa el nombre"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={(e) => handleChange(e)}
                        placeholder="Ingresa el teléfono"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Ingresa el email"
                    />
                </div>
                <div className="d-grid">
                    <button
                        type="button"
                        className="btn-custom btn-primary mt-4"
                        onClick={() => { actions.actualizarContacto(contact, navigate) }}  // Llama a la acción para actualizar
                    >
                        Actualizar
                    </button>
                </div>
                <Link to="/">
                    <span className="">o vuelve a los contactos</span>
                </Link>
            </form>
        </div>
    );
};

export default EditarContacto;
