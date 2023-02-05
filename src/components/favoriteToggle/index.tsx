import React from "react";
import { MOVIE } from "src/interfaces/movie";
import { TV } from "src/interfaces/tv";
import { MinusIcon, StarIcon } from "@chakra-ui/icons";
import { IconButton, Box } from "@chakra-ui/react";
import { useFavItemsStore } from "src/store";

export const FavToogler: React.FC<{ item: MOVIE | TV }> = (props) => {
    const { item } = props;
    const addFavoriteItem = useFavItemsStore((state) => state.addFavoriteItem);
    const isFavoriteItem = useFavItemsStore((state) => state.isFavoriteItem);
    const removeFavoriteItem = useFavItemsStore(
        (state) => state.removeFavoriteItem,
    );
    const toogleFav = (item: MOVIE | TV) => {
        isFavoriteItem(item) ? removeFavoriteItem(item) : addFavoriteItem(item);
    };
    return (
        <Box flex={1}>
            <IconButton
                margin={1}
                aria-label="toggle fav"
                borderRadius="full"
                icon={isFavoriteItem(item) ? <MinusIcon /> : <StarIcon />}
                variant={isFavoriteItem(item) ? "outline" : "ghost"}
                onClick={() => {
                    toogleFav(item);
                }}
            ></IconButton>
        </Box>
    );
};
