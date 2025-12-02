import type { User } from "../../entities/types";
import styles from "./UserCard.module.css";
import { getSubcategoryColor } from "../../entities/subcategoryColors";
import HeartIcon from "../../assets/icons/heart.svg";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  const {
    name,
    location,
    age,
    likes,
    isLiked,
    avatarUrl,
    skillCanTeach,
    subcategoriesWantToLearn,
  } = user;

  const visibleSubcategories = subcategoriesWantToLearn.slice(0, 2);
  const hiddenCount =
    subcategoriesWantToLearn.length - visibleSubcategories.length;

  return (
    <article className={styles.card}>
      <div className={styles.userBox}>
        <img className={styles.avatar} src={avatarUrl} alt={name} />

        <div className={styles.userInfo}>
          <div className={styles.userHeader}>
            <div className={styles.userText}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.meta}>
                <span>{location}</span>
                <span>, </span>
                <span>{age}</span>
              </p>
            </div>

            <div className={styles.likeWrapper}>
              <span className={styles.likeCount}>{likes}</span>
              <button
                type="button"
                className={styles.likeButton}
                aria-pressed={isLiked}
              >
                <img src={HeartIcon} alt="" className={styles.likeIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Может научить:</p>
        <div className={styles.chips}>
          <span
            className={styles.chip}
            style={{
              backgroundColor: getSubcategoryColor(skillCanTeach.subCategoryId),
            }}
          >
            {skillCanTeach.name}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Хочет научиться:</p>
        <div className={styles.chips}>
          {visibleSubcategories.map((subcategory) => {
            const color = getSubcategoryColor(subcategory.id);

            return (
              <span
                key={subcategory.id}
                className={styles.chip}
                style={{ backgroundColor: color }}
              >
                <span className={styles.chipText}>{subcategory.name}</span>
              </span>
            );
          })}

          {hiddenCount > 0 && (
            <span className={styles.chipMore}>+{hiddenCount}</span>
          )}
        </div>
      </div>

      <button type="button" className={styles.moreButton}>
        Подробнее
      </button>
    </article>
  );
}
