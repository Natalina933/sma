import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'


const AdherentList = ({ adherents, onDelete, onEdit }) => (
    <div>
        <h3>Liste des adhérents</h3>
        <ul>
            {adherents && adherents.map(adherent => (
                <li key={adherent.id}>
                    <div>
                        <strong>Nom:</strong> {adherent.name}
                    </div>
                    <div>
                        <strong>Email:</strong> {adherent.email}
                    </div>
                    <div>
                        <strong>Téléphone:</strong> {adherent.phone}
                    </div>
                    <div>
                        <strong>Adresse:</strong> {adherent.address}
                    </div>
                    <div>
                        <button onClick={() => onDelete(adherent.id)}>
                            <FontAwesomeIcon icon={faTrash} /> Supprimer
                        </button>
                        <button onClick={() => onEdit(adherent.id)}>
                            <FontAwesomeIcon icon={faPencilAlt} /> Modifier
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default AdherentList;