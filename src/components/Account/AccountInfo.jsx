import { Box, Typography, Avatar, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWithAuth } from "../../utils/authFetch";

const Container = styled(Box)`
  width: 100%;
  max-width: 930px;
  min-height: 350px;
  height: fit-content;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled(Box)`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const InfoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

function AccountInfo() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await fetchWithAuth("http://localhost:3001/users/", {
        method: "GET",
      });
      setUserData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  if (!userData) return <div>Loading...</div>;

  const roleName = userData.roles?.map((role, index) => (
    <Typography component="span" variant="body2" key={index}>
      {role.roleName}
    </Typography>
  ));

  return (
    <Container>
      <Header>
        <Avatar
          src={userData.user.profilePicture}
          alt={userData.user.fullName}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h6">{userData.user.fullName}</Typography>
          <Typography variant="body2" color="textSecondary">
            Username: {userData.user.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Role: {roleName}
          </Typography>
        </Box>
      </Header>

      <InfoBox>
        <Typography variant="subtitle1">Account Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Email: {userData.user.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: {userData.user.phone}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date of Birth: {userData.user.dateOfBirth}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Account Created:{" "}
              {new Date(userData.user.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Last Updated:{" "}
              {new Date(userData.user.updatedAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {userData.user.isActive ? "Active" : "Inactive"}
            </Typography>
          </Grid>
        </Grid>
      </InfoBox>
    </Container>
  );
}

export default AccountInfo;
