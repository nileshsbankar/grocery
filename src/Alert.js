import React, { useEffect } from "react";

const Alert = (props) => {
  if (props.message === "") return "";

  return (
    <>
      <p class={`alert ${props.isError ? `alert-danger` : `alert-success`} `}>
        {props.message}
      </p>
    </>
  );
};

export default Alert;
