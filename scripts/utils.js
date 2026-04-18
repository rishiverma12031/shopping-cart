import { saveCart } from "./storage.js";
import { renderCart } from "./render.js";

export const find = (id, array) => array.find(element => element.id ===id);

export const fetchElementId = (event, element) => Number(event.target.closest(element).dataset.id);
