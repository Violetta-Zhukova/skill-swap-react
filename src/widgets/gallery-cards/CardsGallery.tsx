import type { User } from "../../entities/types";
import { Button } from "../../shared/ui/Button/Button";
import { UserCard } from "../UserCard/UserCard";
import style from "./CardsGallery.module.css";
import { SortIcon, RightIcon } from "../../assets/img/icons";

export type CardsGalleryPros = {
  title: string;
  cards: User[];
  maxCards?: number;
  sortable?: boolean;
  sortOnClick?: () => void;
  showAllOnClick?: () => void;
};

export const CardsGallery = ({
  title,
  cards,
  maxCards,
  showAllOnClick,
  sortable,
  sortOnClick,
}: CardsGalleryPros) => {
  const shouldLimit = maxCards !== undefined && maxCards > 0;
  const displayedCards = shouldLimit ? cards.slice(0, maxCards) : cards;
  const hasMore = shouldLimit && cards.length > maxCards;
  return (
    <div className={style.card_gallery}>
      <div className={style.card_gallery_header}>
        <h2 className={style.card_gallery_header_title}>{title}</h2>
        <div className={style.card_gallery_actions}>
          {hasMore && (
            <Button type="tertiary" onClick={showAllOnClick || (() => {})}>
              <div className={style.card_gallery_button}>
                Смотреть всё
                <RightIcon />
              </div>
            </Button>
          )}

          {sortable && (
            <Button type="tertiary" onClick={sortOnClick || (() => {})}>
              <div className={style.card_gallery_button}>
                <SortIcon />
                Сначала новые
              </div>
            </Button>
          )}
        </div>
      </div>
      <div className={style.card_gallery_main}>
        {displayedCards.map((user) => (
          <div>
            <UserCard user={user} categories={[]} />
          </div>
        ))}
      </div>
    </div>
  );
};
