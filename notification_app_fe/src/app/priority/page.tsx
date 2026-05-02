"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import NotificationCard from "../../components/NotificationCard";
import { fetchNotifications } from "../../services/api";
import { CampusNotification } from "../../types";
import { useViewedNotifications } from "../../hooks/useViewedNotifications";
import { logInfo, logError, logDebug } from "../../utils/logger";

const TYPE_WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function scoreNotification(n: CampusNotification): number {
  const tsMs = new Date(n.Timestamp).getTime();
  const weight = TYPE_WEIGHT[n.Type] ?? 0;
  return weight * 1e12 + tsMs;
}

function getTopN(
  notifications: CampusNotification[],
  n: number,
): CampusNotification[] {
  return [...notifications]
    .sort((a, b) => scoreNotification(b) - scoreNotification(a))
    .slice(0, n);
}

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState<CampusNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topN, setTopN] = useState<number>(10);
  const { viewedIds, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        logInfo("page", "Loading priority inbox");
        const data = await fetchNotifications();
        setNotifications(data);
        logInfo(
          "page",
          `Loaded ${data.length} notifications for priority ranking`,
        );
      } catch (err) {
        logError("page", "Failed to load priority notifications", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const priorityNotifications = useMemo(() => {
    logDebug("page", `Computing top ${topN} priority notifications`);
    return getTopN(notifications, topN);
  }, [notifications, topN]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Priority Inbox
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Show Top N</InputLabel>
          <Select
            value={topN}
            label="Show Top N"
            onChange={(e) => setTopN(Number(e.target.value))}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mb: 4, px: 1 }}>
        <Typography gutterBottom>
          Showing top <strong>{topN}</strong> notifications
        </Typography>
        <Slider
          value={topN}
          min={5}
          max={50}
          step={5}
          marks
          valueLabelDisplay="auto"
          onChange={(_, v) => setTopN(v as number)}
        />
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
      ) : priorityNotifications.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No notifications found.
        </Typography>
      ) : (
        priorityNotifications.map((notif, index) => (
          <Box key={notif.ID} sx={{ position: "relative" }}>
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                top: 8,
                right: 16,
                fontWeight: 700,
                color: "#f59e0b",
                zIndex: 1,
              }}
            >
              #{index + 1}
            </Typography>
            <NotificationCard
              notification={notif}
              isViewed={viewedIds.has(notif.ID)}
              onMarkViewed={markAsViewed}
            />
          </Box>
        ))
      )}
    </Box>
  );
}
