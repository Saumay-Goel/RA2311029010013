"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "All Notifications",
    href: "/",
    icon: <NotificationsIcon fontSize="small" />,
  },
  {
    label: "Priority Inbox",
    href: "/priority",
    icon: <StarIcon fontSize="small" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #1565c0 0%, #0d47a1 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1 }}
          >
            <NotificationsIcon sx={{ color: "white", fontSize: 22 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.5px",
                fontSize: { xs: "1rem", sm: "1.2rem" },
                color: "white",
              }}
            >
              Campus
              <Box component="span" sx={{ color: "#90caf9", ml: 0.5 }}>
                Notifications
              </Box>
            </Typography>
          </Box>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Box
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textDecoration: "none",
                      color: active ? "#0d47a1" : "white",
                      bgcolor: active ? "white" : "transparent",
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.875rem",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: active ? "white" : "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 240 } } }}
      >
        <Box
          sx={{
            bgcolor: "#0d47a1",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <NotificationsIcon sx={{ color: "white" }} />
          <Typography sx={{ color: "white", fontWeight: 700 }}>Menu</Typography>
        </Box>
        <List sx={{ pt: 1 }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: active ? "#e3f2fd" : "transparent",
                    color: active ? "#0d47a1" : "text.primary",
                    fontWeight: active ? 700 : 400,
                    "&:hover": { bgcolor: "#e3f2fd" },
                  }}
                >
                  <Box
                    sx={{
                      mr: 1.5,
                      color: active ? "#0d47a1" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: active ? 700 : 400,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
