import Image from "next/image";
import styles from "./ActivityCard.module.css";

const ActivityCard = ({
    activity,
    expandedActivity,
    selectedActivity,
    handleToggleDescription,
    handleSelectActivity,
    showDetailsButton = true,
    showRegisterButton = true,
}) => {
    const {
        id,
        title,
        description,
        date,
        place,
        price,
        organizer,
        img,
        category,
        rating,
        inscription,
        capacity,
        contact,
        requirements,
        programme,
        alt,
    } = activity;

    // Couleur dynamique badge (vert si inscription, rouge si complet)
    const badgeColor =
        inscription === "non" ? styles.badgeFull : styles.badgeAvailable;

    return (
        <article
            key={id}
            className={`${styles.card} ${selectedActivity === id ? styles.selected : ""}`}
            tabIndex={0}
            aria-label={`Carte activité ${title}`}
            onClick={() => handleSelectActivity && handleSelectActivity(id)}
            onKeyDown={
                handleSelectActivity
                    ? (e) =>
                        (e.key === "Enter" || e.key === " ") && handleSelectActivity(id)
                    : undefined
            }
        >
            <div className={`${styles.placesBadge} ${badgeColor}`}>
                {inscription === "non"
                    ? "Complet"
                    : capacity
                        ? `${capacity} place${parseInt(capacity, 10) > 1 ? "s" : ""} restante${parseInt(capacity, 10) > 1 ? "s" : ""}`
                        : "N.C."}
            </div>
            <div className={styles.imageWrapper}>
                <Image
                    src={img && img.trim() !== "" ? img : "/images/categories/default.jpg"}
                    alt={alt || title}
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                    priority
                />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.headerBlock}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <hr className={styles.titleDividerBlue} />
                    <div className={styles.categoryChip}>{category}</div>
                </div>
                <div className={styles.metaInfo}>
                    <span className={styles.organizer}>
                        <b>👤</b> {organizer}
                    </span>
                    <span className={styles.metaItem}>
                        <b>📅</b> {date}
                    </span>
                    <span className={styles.metaItem}>
                        <b>📍</b> {place}
                    </span>
                </div>
                <div className={styles.priceRatingRow}>
                    <span className={styles.priceTag}>
                        {price && String(price).toLowerCase() === "gratuit"
                            ? "Gratuit"
                            : `${price} €`}
                    </span>
                    <span className={styles.rating} title="Note">
                        {"⭐".repeat(Math.round(rating))}{" "}
                        <span className={styles.ratingValue}>{rating}/5</span>
                    </span>
                </div>
                {showDetailsButton && (
                    <button
                        className={styles.infoButton}
                        aria-expanded={expandedActivity === id}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleDescription && handleToggleDescription(id);
                        }}
                    >
                        {expandedActivity === id ? "Moins d'infos" : "Plus d'infos"}
                    </button>
                )}

                {expandedActivity === id && (
                    <div className={styles.expandedContent}>
                        <p className={styles.description}>{description}</p>
                        {programme && (
                            <>
                                <hr className={styles.cardContentDivider} />
                                <div className={styles.programme}>
                                    <b>Programme :</b>
                                    <br />
                                    {programme}
                                </div>
                            </>
                        )}
                        <div className={styles.detailsGrid}>
                            <div>
                                <b>Capacité :</b> {capacity}
                            </div>
                            <div>
                                <b>Contact :</b> {contact}
                            </div>
                            <div>
                                <b>Exigences :</b> {requirements}
                            </div>
                        </div>
                    </div>
                )}

                {showRegisterButton && (
                    <a
                        href={inscription === "oui" ? "#" : undefined}
                        className={`${styles.registerButton} ${inscription === "non" ? styles.disabled : ""
                            }`}
                        aria-disabled={inscription === "non"}
                        tabIndex={inscription === "non" ? -1 : 0}
                        onClick={(e) => inscription === "non" && e.preventDefault()}
                    >
                        {inscription === "oui" ? "S'inscrire" : "Complet"}
                    </a>
                )}
            </div>
        </article>
    );
};

export default ActivityCard;