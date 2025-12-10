export const RANKS = [
  "Stormtrooper","Lieutenant","Captain","Commander","Major","Colonel",
  "General","Admiral","Moff","Grand Moff","Emperor"
];

export const rankValue = (r) => RANKS.indexOf(r);

export const canCreatePrivateRoom = (rank) => rankValue(rank) >= rankValue("Commander");
export const canCreatePublicRoom  = (rank) => rankValue(rank) >= rankValue("Admiral");
