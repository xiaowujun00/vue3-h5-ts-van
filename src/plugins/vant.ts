import type { App } from "vue";
import { Button, Cell, CellGroup, Popup, Field } from "vant";
import "vant/lib/index.css";
export function setupAntd(app: App<Element>) {
  app.use(Button).use(Cell).use(CellGroup).use(Popup).use(Field);
}
