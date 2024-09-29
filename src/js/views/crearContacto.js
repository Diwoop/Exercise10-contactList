import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../../styles/demo.css";

const CrearContacto = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = () => {
        actions.CrearContacto(name, phone, email, navigate);
    };

    return (
        <div className="formulario container my-3">
            <h2>Formulario de Contacto</h2>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Teléfono"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="d-grid">
                    <button
                        type="button"
                        className="btn-custom btn-primary mt-4"
                        onClick={handleSubmit}
                    >
                        Enviar
                    </button>
                </div>
                <Link to="/">
                    <span>o vuelve a los contactos</span>
                </Link>
            </form>
        </div>
    );
};

export default CrearContacto;
