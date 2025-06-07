"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Fonction utilitaire pour formater la date
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Générer des mots-clés à partir de la description
function generateKeywords(description) {
  if (!description) return "";
  // Prend les mots de plus de 3 lettres, retire les doublons
  const words = description
    .toLowerCase()
    .replace(/[.,;:!?]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3);
  return [...new Set(words)].join(", ");
}

export default function ActivitiesDashboard() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    place: "",
    priceType: "",
    priceValue: "",
    category: "",
    description: "",
    img: "",
    organizer: "",
    capacity: "",
  });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Récupérer les activités
  useEffect(() => {
    fetch("/api/activities")
      .then(res => res.json())
      .then(setActivities);
  }, []);

  // Récupérer les prénoms des utilisateurs pour l'organisateur
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // Gestion du formulaire
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Ajouter ou modifier une activité
  const handleSubmit = async e => {
    e.preventDefault();

    // Générer le prix final
    let price = form.priceType === "gratuit" ? "gratuit" : form.priceValue;

    // Générer le texte alternatif automatiquement
    const alt = form.title ? `Image de l'activité ${form.title}` : "Image activité";

    // Générer les mots-clés automatiquement
    const keywords = generateKeywords(form.description);

    const dataToSend = {
      ...form,
      price,
      alt,
      keywords,
      priceType: undefined,
      priceValue: undefined,
    };

    const method = selected ? "PUT" : "POST";
    const url = selected ? `/api/activities/${selected.id}` : "/api/activities";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
    if (res.ok) {
      setMessage(selected ? "Activité modifiée !" : "Activité ajoutée !");
      setForm({
        title: "",
        date: "",
        place: "",
        priceType: "",
        priceValue: "",
        category: "",
        description: "",
        img: "",
        organizer: "",
        capacity: "",
      });
      setSelected(null);
      fetch("/api/activities").then(res => res.json()).then(setActivities);
    } else {
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  // Pré-remplir pour édition
  const handleEdit = activity => {
    setSelected(activity);
    let dateValue = activity.date;
    if (dateValue && !dateValue.includes("T")) {
      const d = new Date(dateValue);
      if (!isNaN(d)) {
        dateValue = d.toISOString().slice(0, 16);
      }
    }
    setForm({
      title: activity.title || "",
      date: dateValue || "",
      place: activity.place || "",
      priceType: activity.price === "gratuit" ? "gratuit" : "payant",
      priceValue: activity.price !== "gratuit" ? activity.price : "",
      category: activity.category || "",
      description: activity.description || "",
      img: activity.img || "",
      organizer: activity.organizer || "",
      capacity: activity.capacity || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Supprimer une activité
  const handleDelete = async id => {
    if (!window.confirm("Supprimer cette activité ?")) return;
    const res = await fetch(`/api/activities/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Activité supprimée !");
      setActivities(acts => acts.filter(a => a.id !== id));
    } else {
      setMessage("Erreur lors de la suppression");
    }
  };

  // Filtrage
  const filtered = activities.filter(a =>
    (a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.category?.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? a.category === filter : true)
  );

  // Tri des activités
  const sortedActivities = React.useMemo(() => {
    let sortable = [...filtered];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aValue = a[sortConfig.key] ?? "";
        let bValue = b[sortConfig.key] ?? "";
        // Pour les nombres
        if (!isNaN(aValue) && !isNaN(bValue) && aValue !== "" && bValue !== "") {
          aValue = Number(aValue);
          bValue = Number(bValue);
        }
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [filtered, sortConfig]);

  // Fonction pour changer le tri :
  const handleSort = key => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // À placer dans ton composant, avant le return
  const getSortArrow = key => {
    if (sortConfig.key !== key) return <span className={styles.sortArrow} />;
    return (
      <span className={styles.sortArrow}>
        {sortConfig.direction === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div className={styles.dashboard}>
      <SideMenu />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Gestion des activités</h1>
        {message && <div className={styles.message}>{message}</div>}

        {/* Formulaire ajout/édition */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Titre
            <input name="title" placeholder="Titre" value={form.title || ""} onChange={handleChange} required />
          </label>
          <label>
            Date et heure
            <input
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={form.date || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Lieu
            <input name="place" placeholder="Lieu" value={form.place || ""} onChange={handleChange} />
          </label>
          <label>
            Prix
            <select
              name="priceType"
              value={form.priceType || ""}
              onChange={handleChange}
              required
              style={{ marginBottom: 8 }}
            >
              <option value="">Choisir</option>
              <option value="gratuit">Gratuit</option>
              <option value="payant">Payant</option>
            </select>
            {form.priceType === "payant" && (
              <input
                name="priceValue"
                type="number"
                min="0"
                placeholder="Montant en €"
                value={form.priceValue || ""}
                onChange={handleChange}
                required
              />
            )}
          </label>
          <label>
            Catégorie
            <select
              name="category"
              value={form.category || ""}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {[...new Set(activities.map(a => a.category))].filter(Boolean).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="__new__">Ajouter une nouvelle catégorie...</option>
            </select>
            {form.category === "__new__" && (
              <input
                name="category"
                placeholder="Nouvelle catégorie"
                value={form.categoryInput || ""}
                onChange={e => setForm({ ...form, category: e.target.value })}
                autoFocus
              />
            )}
          </label>
          <label>
            Organisateur
            <input
              name="organizer"
              list="organizer-list"
              placeholder="Nom de l'organisateur"
              value={form.organizer || ""}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <datalist id="organizer-list">
              {users.map(user => (
                <option key={user.id} value={user.firstname} />
              ))}
            </datalist>
          </label>
          <label>
            Capacité
            <input
              name="capacity"
              type="number"
              placeholder="Capacité"
              value={form.capacity || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Image
            <div style={{ display: "flex", gap: "0.5em", alignItems: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setForm(f => ({ ...f, img: url }));
                  }
                }}
                style={{ width: "auto" }}
              />
              {form.img && (
                <Image
                  src={form.img}
                  alt={`Image de l'activité ${form.title}`}
                  width={60}
                  height={60}
                  style={{ borderRadius: 8, border: "1px solid #eee", objectFit: "cover" }}
                />
              )}
            </div>
          </label>
          <label>
            Description
            <textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} />
          </label>
          <label>
            Pré-inscription obligatoire ?
            <select
              name="inscription"
              value={form.inscription || ""}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </label>
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} /> {selected ? "Modifier" : "Ajouter"}
          </button>
          {selected && (
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setForm({
                  title: "",
                  date: "",
                  place: "",
                  priceType: "",
                  priceValue: "",
                  category: "",
                  description: "",
                  img: "",
                  organizer: "",
                  capacity: "",
                });
              }}
            >
              Annuler
            </button>
          )}
        </form>

        {/* Recherche et filtre */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Recherche par titre ou catégorie"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Toutes catégories</option>
            {[...new Set(activities.map(a => a.category))].filter(Boolean).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <span className={styles.count}>
            {filtered.length} activité{filtered.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Tableau des activités */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th
                onClick={() => handleSort("title")}
                className={sortConfig.key === "title" ? styles.sorted : ""}
                style={{ cursor: "pointer" }}
              >
                Titre{getSortArrow("title")}
              </th>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                Date complète{getSortArrow("date")}
              </th>
              <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                Catégorie{getSortArrow("category")}
              </th>
              <th onClick={() => handleSort("place")} style={{ cursor: "pointer" }}>
                Lieu{getSortArrow("place")}
              </th>
              <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                Prix{getSortArrow("price")}
              </th>
              <th onClick={() => handleSort("organizer")} style={{ cursor: "pointer" }}>
                Organisateur{getSortArrow("organizer")}
              </th>
              <th onClick={() => handleSort("capacity")} style={{ cursor: "pointer" }}>
                Capacité{getSortArrow("capacity")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedActivities.map(activity => (
              <tr key={activity.id}>
                <td>
                  {activity.img && (
                    <Image
                      src={activity.img}
                      alt={activity.alt || `Image de l'activité ${activity.title}`}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                    />
                  )}
                </td>
                <td>{activity.title}</td>
                <td>{formatDate(activity.date)}</td>
                <td>{activity.category}</td>
                <td>{activity.place}</td>
                <td>{activity.price === "gratuit" ? "Gratuit" : activity.price}</td>
                <td>{activity.organizer}</td>
                <td>{activity.capacity}</td>
                <td>
                  <button onClick={() => handleEdit(activity)} title="Modifier" className={styles.edit}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDelete(activity.id)} title="Supprimer" className={styles.delete}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
