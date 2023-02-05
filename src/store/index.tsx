import create from "zustand";
import { persist } from "zustand/middleware";
import { MOVIE } from "src/interfaces/movie";
import { TV } from "src/interfaces/tv";

type favoriteItemsState = {
    favoriteItemsObject: Array<MOVIE | TV>;
    addFavoriteItem: (item: MOVIE | TV) => void;
    removeFavoriteItem: (item: MOVIE | TV) => void;
    isFavoriteItem: (item: MOVIE | TV) => boolean;
};
type selectedCollection = {
    items: Array<MOVIE | TV>;
    addItem: (item: MOVIE | TV) => void;
    getSelectedItem: (item: MOVIE | TV) => MOVIE | TV | undefined;
    lastSelected: () => number;
};
export const useFavItemsStore = create(
    persist<favoriteItemsState>(
        (set, get) => ({
            favoriteItemsObject: new Array<MOVIE | TV>(),
            addFavoriteItem: (item: MOVIE | TV) => {
                return set((state) => ({
                    favoriteItemsObject: state.favoriteItemsObject.find(
                        (itm) => itm.id === item.id,
                    )
                        ? [...state.favoriteItemsObject]
                        : [...state.favoriteItemsObject, item],
                }));
            },
            removeFavoriteItem: (item: MOVIE | TV) =>
                set((state) => ({
                    favoriteItemsObject: state.favoriteItemsObject.filter(
                        (fav) => fav?.id !== item.id,
                    ),
                })),
            isFavoriteItem: (item: MOVIE | TV) =>
                !!get().favoriteItemsObject.find((fav) => fav.id === item.id),
        }),
        { name: "MyFavoriteList" },
    ),
);
export const useSelections = create(
    persist<selectedCollection>(
        (set, get) => ({
            items: new Array<MOVIE | TV>(),
            addItem: (item: MOVIE | TV) => {
                return set((state) => ({
                    items: state?.items
                        ? state?.items.find((itm) => itm?.id === item?.id)
                            ? [...state.items]
                            : [...state.items, item]
                        : [],
                }));
            },
            getSelectedItem: (item: MOVIE | TV) =>
                get().items.find((fav) => fav.id === item.id),
            lastSelected: () => get().items[get().items.length - 1]?.id,
        }),
        { name: "allSelections" },
    ),
);
