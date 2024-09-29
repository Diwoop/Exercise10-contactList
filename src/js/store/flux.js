const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            agenda: [],
            contacto: {},
        },
        actions: {
            crearAgenda: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Diwoop", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Error en la solicitud de crear agenda");
                    }
                } catch (error) {
                    console.error("Hubo un error al crear la agenda:", error);
                }
            },
            traerContactos: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Diwoop/contacts", {
                        method: "GET"
                    });
                    if (!response.ok) {
                        throw new Error("Error en la solicitud de traer contactos");
                    }
                    const data = await response.json();
					if (data && data.contacts && data.contacts.length > 0) {
						setStore({ agenda: data.contacts });
					} else {
						setStore({ agenda: [] });
					}
                } catch (error) {
                    console.log("Hubo un error al traer los contactos:", error);
                }
            },
            traerAgenda: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Diwoop");
                    if (!response.ok) {
                        throw new Error("Error en la solicitud de traer agenda");
                    }
                    const data = await response.json();
                    setStore({ agenda: data.contacts });
                } catch (error) {
                    console.error("Hubo un error al traer la agenda:", error);
                }
            },
            CrearContacto: async (name, phone, email, navigate) => {
                const capitalizedName = name.replace(/\b\w/g, (char) => char.toUpperCase());
            
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Diwoop/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "name": capitalizedName,
                            "phone": phone,
                            "email": email
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Error al crear el contacto: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();
                    getActions().traerContactos();
                    navigate("/");
                } catch (error) {
                    console.error("Hubo un error al crear el contacto:", error);
                }
            },
            borrarContacto: async (idContacto) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Diwoop/contacts/${idContacto}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) {
                        throw new Error("Error al borrar el contacto");
                    }
                    getActions().traerContactos();
                } catch (error) {
                    console.error("Hubo un error al borrar el contacto:", error);
                }
            },
            actualizarContacto: async (contact, navigate) => {
                try {
                    const uri = `https://playground.4geeks.com/contact/agendas/DianaEstallo/contacts/${contact.id}`;
                    const options = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(contact),
                    };
                    const response = await fetch(uri, options);
                    if (!response.ok) {
                        throw new Error("Error al actualizar el contacto");
                    }
                    const data = await response.json();
                    console.log("Contacto actualizado", data);
                    getActions().traerContactos();
                    navigate("/");
                } catch (error) {
                    console.error("Hubo un error al actualizar el contacto:", error);
                }
            },
            guardarContacto: (contact) => {
                const store = getStore();
                setStore({ ...store, contacto: contact });
            },
        }
    };
};

export default getState;
