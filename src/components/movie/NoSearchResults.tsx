import classes from "./NoSearchResults.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoSearchResults = (props: any) => {
  return (
    <div className={classes.noResults}>
      <FontAwesomeIcon icon={props.icon} size={props.iconSize} />
      <h2>{props.title}</h2>
      <h4>{props.description}</h4>
    </div>
  );
};

export default NoSearchResults;