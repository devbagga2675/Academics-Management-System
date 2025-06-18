import React from 'react'
import TitleBar from "../../components/TitleBar";
import { Stack } from "@mui/material";
import ComingSoon from "../../components/ComingSoon";
const EvaluationSTU = () => {
  return (
    <>
    <Stack
      direction={"column"}
      spacing={2}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      width="100%"
    >
      <TitleBar title={"Evaluation"}></TitleBar>
      <ComingSoon />
    </Stack>
  </>
  )
}

export default EvaluationSTU