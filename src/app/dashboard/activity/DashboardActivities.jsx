import { useState } from "react";
import useSWR from "swr";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./dashboard.module.css";
import { fetcher, customStyles } from "./page";

export const DashboardActivities = () => {
    const { data: activities, mutate } = useSWR("/api/activities", fetcher);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        desc: "",
        date: "",
        img: ""
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleOpenModal = () => setModalIsOpen(true);
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setFormData({ id: "", title: "", desc: "", date: "", img: "" });
        setCurrentId(null);
    };

    const generateNewId = () => {
        if (!activities || activities.length === 0) {
            return 1;
        }
        const maxId = Math.max(...activities.map((activity) => parseInt(activity.id, 10) || 0));
        return maxId + 1;
    };

    const handleAdd = () => {
        const newId = generateNewId();
        setFormData({
            id: newId.toString(),
            title: "",
            desc: "",
            date: "",
            img: ""
        });
        setCurrentId(null);
        handleOpenModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = currentId ? 'PUT' : 'POST';
        const url = currentId ? `/api/activities/${currentId}` : '/api/activities';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la soumission du formulaire: ${response.statusText}`);
            }

            const result = await response.json();
            mutate();
            handleCloseModal();
            alert('Soumission réussie');
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire:", error);
            alert('Erreur lors de la soumission du formulaire');
        }
    };

    const handleEdit = (activity) => {
        setFormData(activity);
        setCurrentId(activity._id);
        setModalIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/activities/${id}`, { method: "DELETE" });
            mutate();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Dashboard des Activités</h1>
            <button onClick={handleAdd} className={styles.addButton}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter une activité
            </button>
            <ul className={styles.activitiesList}>
                {activities && activities.map((activity) => (
                    <li key={activity._id} className={styles.activity}>
                        <div className={styles.info}>
                            <h1>{activity.id}</h1>
                            <h2>{activity.title}</h2>
                            <p>{activity.desc}</p>
                            <p>{activity.date}</p>
                            <img src={activity.img} alt={activity.title} />
                        </div>
                        <div className={styles.actions}>
                            <FontAwesomeIcon
                                icon={faPencilAlt}
                                className={styles.pencilIcon}
                                onClick={() => handleEdit(activity)} />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className={styles.trashIcon}
                                onClick={() => handleDelete(activity._id)} />
                        </div>
                    </li>
                ))}
            </ul>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Ajouter une activité"
            >
                <h1>{currentId ? "Modifier" : "Ajouter"} une activité</h1>
                <form className={styles.new} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="ID"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className={styles.input}
                            readOnly />
                        <input
                            type="text"
                            placeholder="Titre"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={styles.input}
                            required />
                        <textarea
                            placeholder="Description"
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            className={styles.input}
                            required />
                        <input
                            type="text"
                            placeholder="Date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={styles.input}
                            required />
                        <input
                            type="text"
                            placeholder="URL de l'image"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            className={styles.input}
                            required />
                    </div>
                    <button type="submit" className={styles.button}>
                        Enregistrer
                    </button>
                </form>
                <button onClick={() => setModalIsOpen(false)} className={styles.button}>
                    Fermer
                </button>
            </Modal>
        </div>
    );
};
