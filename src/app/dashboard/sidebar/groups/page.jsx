"use client";
import { useState } from "react";

const GroupsManagement = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Membres actifs" },
    { id: 2, name: "Bénévoles" },
    { id: 3, name: "VIP" },
  ]);
  const [newGroup, setNewGroup] = useState("");

  // Ajouter un groupe
  const handleAddGroup = () => {
    if (newGroup.trim() === "") return;
    const newEntry = { id: groups.length + 1, name: newGroup };
    setGroups([...groups, newEntry]);
    setNewGroup("");
  };

  // Supprimer un groupe
  const handleDeleteGroup = (id) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  return (
    <div className="groups-container">
      <h2>Gestion des groupes</h2>

      {/* Formulaire d'ajout */}
      <div className="add-group">
        <input
          type="text"
          placeholder="Nom du groupe"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
        />
        <button onClick={handleAddGroup}>Ajouter</button>
      </div>

      {/* Liste des groupes */}
      <ul className="groups-list">
        {groups.map((group) => (
          <li key={group.id}>
            {group.name}
            <button onClick={() => handleDeleteGroup(group.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsManagement;
