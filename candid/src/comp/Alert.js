import React from "react";
import styles from "./Alert.module.scss";

const Alert = (props) => {
  return (
    <div style={{ textAlign: "center", fontFamily: styles.font4 }}>
      {props.alert}
    </div>
  );
};

export default Alert;
