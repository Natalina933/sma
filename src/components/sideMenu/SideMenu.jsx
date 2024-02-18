import Link from 'next/link';
import React from 'react';

const SideMenu = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">Accueil</Link></li>
                <li>&nbsp;</li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                    User
                    <ul>
                        <li><Link to="/user/">Liste</Link></li>
                        <li><Link to="/user">Ajouter</Link></li>
                        <li><Link to="/user">Supprimer</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;