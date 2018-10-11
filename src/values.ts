export const WORLD_NUMBER: string = "134";
export const PLAYER_VILLAGE_ID: string = "29595";

export const LINK_PART_MAIN: string = "screen=overview";
export const LINK_PART_PLACE: string = "screen=place";
export const LINK_PART_VILLAGE: string = "screen=info_village";
export const LINK_PART_MAP: string = "screen=map";

export const LINK_MAP: string =
  "https://pl${WORLD_NUMBER}.plemiona.pl/game.php?village=${PLAYER_VILLAGE_ID}&${LINK_PART_MAP}";
export const LINK_PLACE: string =
  "https://pl${WORLD_NUMBER}.plemiona.pl/game.php?village=${PLAYER_VILLAGE_ID}&${LINK_PART_PLACE}";
export const LINK_MAIN: string =
  "https://pl${WORLD_NUMBER}.plemiona.pl/game.php?village=${PLAYER_VILLAGE_ID}&${LINK_PART_MAIN}";
