import * as fas from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// https://github.com/FortAwesome/Font-Awesome/issues/19348
const { library, config } = require("@fortawesome/fontawesome-svg-core");
config.autoAddCss = false;

export const initializeIconList = () => {
  library.add(...[fas.faCrown, fas.faMagnifyingGlass, fas.faFan]);
};
