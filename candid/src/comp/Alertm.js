import React from "react";
import styles from "./Alertm.module.scss";
const Alertm = (props) => {
  return <div style={{ textAlign: "center", fontFamily: styles.f4 }}>{props.alert}</div>;
};

export default Alertm;
