import React from "react";
import styled from "styled-components";
import Loading from "./Loading";

export default {
  component: Loading,
  title: "Components/Loading",
};

export const Large = () => <Loading />;

export const Small = () => <Loading size="1.5rem" thickness="4px" />;
