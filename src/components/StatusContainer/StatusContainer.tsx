import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PENDING, ERROR } from "../../constants/status";

interface StatusContainerProps {
  status: "idle" | "pending" | "success" | "error";
}

const StatusContainer: React.FC<StatusContainerProps> = ({ status }) => {
  const classes = useStyles();
  return (
    <div className={classes.statusContainer}>
      {status === PENDING && <CircularProgress size="4rem" />}
      {(status === ERROR) &&
        "Something went wrong. Try again later!"}
    </div>
  );
};

export default StatusContainer;
