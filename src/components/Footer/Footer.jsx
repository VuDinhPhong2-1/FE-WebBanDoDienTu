import { Box } from "@mui/material";
import styled from "styled-components";
import { Subscription } from "./SubscriptionSection";
import { CompanyInformation } from "./CompanyInformation";
const FooterWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #161617;
  width: 100%;
  height: fit-content;
  align-items: center;
`;
export const Footer = () => {
  return (
    <FooterWrapper>
      <Subscription />
      <CompanyInformation />
    </FooterWrapper>
  );
};
