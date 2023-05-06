import { Icon } from "ducduchy-react-components";
import "./LoadingBar.scss";

export const LoadingBar = () => {
  return (
    <div className="loading-bar">
      <Icon icon={["fas", "fan"]} className="fa-flip" />
      <span>Loading data...</span>
    </div>
  );
};
