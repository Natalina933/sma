// DashboardAddActivity.js
"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DashboardAddActivity = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    img: "",
    content: "",
    username: "",
    place: "",
    price: 0,
    category: "",
    rating: "",
    programme: "",
    keywords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setFormData({
        title: "",
        desc: "",
        date: "",
        img: "",
        content: "",
        username: "",
        place: "",
        price: 0,
        category: "",
        rating: "",
        programme: "",
        keywords: "",
      });
      alert("Activity added successfully!");
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add activity");
    }
  };

  const handleAdd = () => {
    console.log(formData);
    setFormData({
      title: "",
      desc: "",
      date: "",
      img: "",
    });
    alert("Nouvelle activité ajoutée avec succès !");
  };

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Ajouter une nouvelle activité</h1>
        <form className={styles.formGroup} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <textarea
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            className={styles.input}
            required
          ></textarea>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="img"
            placeholder="URL de l'image"
            value={formData.img}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <textarea
            name="content"
            placeholder="Contenu"
            value={formData.content}
            onChange={handleChange}
            className={styles.input}
            required
          ></textarea>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="place"
            placeholder="Lieu"
            value={formData.place}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Catégorie"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="rating"
            placeholder="Note"
            value={formData.rating}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <textarea
            name="programme"
            placeholder="Programme"
            value={formData.programme}
            onChange={handleChange}
            className={styles.input}
            required
          ></textarea>
          <input
            type="text"
            name="keywords"
            placeholder="Mots-clés"
            value={formData.keywords}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddActivity;
