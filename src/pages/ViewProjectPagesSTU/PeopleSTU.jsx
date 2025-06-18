import React from 'react'
import TitleBar from "../../components/TitleBar";
import { Stack } from "@mui/material";
import ComingSoon from "../../components/ComingSoon";
const PeopleSTU = () => {
  return (
    <>
    <Stack
      direction={"column"}
      spacing={2}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      width="100%"
    >
      <TitleBar title={"People"}></TitleBar>
      <ComingSoon />
    </Stack>
  </>
  )
}

export default PeopleSTU