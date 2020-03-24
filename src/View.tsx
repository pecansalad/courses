/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { RootState } from "./duck";
import { useSelector } from "react-redux";
import { LoadingState } from "./types";

const styles = {
  width: "40vw",
  padding: "20px",
  height: "80vh",
  margin: "20px",
  overflow: "scroll",
  boxShadow: "0px 4px 22px -6px rgba(0,0,0,0.75)"
};

const View: React.FC = ({ children }) => {
  const loadingState = useSelector(
    (state: RootState) => state.core.loadingState
  );
  if (loadingState === LoadingState.Loading) {
    return (
      <div css={styles}>
        <h2> Loading...</h2>
      </div>
    );
  }
  return <div css={styles}>{children}</div>;
};

export default View;