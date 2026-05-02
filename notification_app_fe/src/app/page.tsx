"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import NotificationCard from "../components/NotificationCard";
import { fetchNotifications } from "../services/api";
import { CampusNotification, NotificationType } from "../types";
import { useViewedNotifications } from "../hooks/useViewedNotifications";
import { logInfo, logError } from "../utils/logger";

export default function Home() {
  const [notifications, setNotifications] = useState<CampusNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<NotificationType | undefined>(
    undefined,
  );
  const { viewedIds, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        logInfo(
          "page",
          `Loading notifications with filter: ${filterType || "None"}`,
        );
        const data = await fetchNotifications(
          filterType ? { notification_type: filterType } : undefined,
        );
        setNotifications(data);
      } catch (err: unknown) {
        logError("page", "Error fetching notifications", err);
        setError("Failed to load notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    void loadNotifications();
  }, [filterType]);

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 0 } }}>
      {/* Header row — stacks on mobile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2, sm: 0 },
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          All Notifications
        </Typography>

        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 150 } }}>
          <InputLabel id="filter-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-label"
            value={filterType ?? ""}
            label="Filter by Type"
            onChange={(e) => {
              const val = e.target.value as string;
              setFilterType(val === "" ? undefined : (val as NotificationType));
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No notifications found.
        </Typography>
      ) : (
        notifications.map((notif) => (
          <NotificationCard
            key={notif.ID}
            notification={notif}
            isViewed={viewedIds.has(notif.ID)}
            onMarkViewed={markAsViewed}
          />
        ))
      )}
    </Box>
  );
}
