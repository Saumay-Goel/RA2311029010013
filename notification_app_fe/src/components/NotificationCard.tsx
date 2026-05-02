"use client";

import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { CampusNotification } from "../types";
import { logInfo } from "../utils/logger";

interface Props {
  notification: CampusNotification;
  isViewed: boolean;
  onMarkViewed: (id: string) => void;
}

export default function NotificationCard({
  notification,
  isViewed,
  onMarkViewed,
}: Props) {
  const handleClick = () => {
    if (!isViewed) {
      onMarkViewed(notification.ID);
      logInfo("component", `User viewed notification: ${notification.ID}`); // ✅ "component"
    }
  };

  const getChipColor = () => {
    switch (notification.Type) {
      case "Placement":
        return "success";
      case "Result":
        return "info";
      case "Event":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        cursor: isViewed ? "default" : "pointer",
        bgcolor: isViewed ? "background.paper" : "action.hover",
        borderLeft: isViewed ? "6px solid transparent" : "6px solid #1976d2",
        transition: "all 0.3s ease",
        boxShadow: isViewed ? 1 : 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip label={notification.Type} color={getChipColor()} size="small" />
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: isViewed ? "normal" : "bold" }}
        >
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
