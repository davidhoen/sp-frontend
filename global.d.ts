import en from "./messages/en.json";
import nl from "./messages/nl.json";

type Messages = typeof en & typeof nl;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
