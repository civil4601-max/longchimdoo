import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Simple in-memory cache
const cache = {
  orders: { data: null, timestamp: 0 },
  configs: { data: null, timestamp: 0 }
};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

app.get("/api/auth/status", (req, res) => {
  const isConfigured = !!process.env.GOOGLE_APPS_SCRIPT_URL;
  res.json({ connected: isConfigured });
});

app.post("/api/save-to-sheet", async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  if (!scriptUrl) {
    return res.status(401).json({ error: "Google Apps Script URL not configured" });
  }

  const { order } = req.body;

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
      redirect: 'follow'
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Apps Script returned status ${response.status}: ${text.substring(0, 100)}`);
    }

    try {
      const result = JSON.parse(text);
      if (result.status === 'error') {
        throw new Error(result.message || "Apps Script error");
      }
      // Invalidate orders cache
      cache.orders = { data: null, timestamp: 0 };
      res.json({ success: true });
    } catch (e) {
      console.error("Apps Script returned non-JSON response (POST):", text.substring(0, 500));
      if (text.includes("<!DOCTYPE") || text.includes("<html")) {
        throw new Error("Apps Script returned an HTML page instead of JSON. This usually means the script deployment is not set to 'Anyone' or the URL is incorrect.");
      }
      throw new Error("Failed to parse JSON response from Apps Script");
    }
  } catch (error: any) {
    console.error("Error saving to Apps Script", error);
    res.status(500).json({ error: error.message || "Failed to save to Google Apps Script" });
  }
});

app.get("/api/orders", async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return res.status(401).json({ error: "Google Apps Script URL not configured" });
  }

  // Check cache
  const now = Date.now();
  if (cache.orders.data && (now - cache.orders.timestamp < CACHE_DURATION)) {
    return res.json(cache.orders.data);
  }

  try {
    const response = await fetch(`${scriptUrl}?type=orders`, {
      method: 'GET',
      redirect: 'follow'
    });

    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`Apps Script returned status ${response.status}: ${text.substring(0, 100)}`);
    }

    try {
      const data = JSON.parse(text);
      // Update cache
      cache.orders = { data: data, timestamp: now };
      res.json(data);
    } catch (e) {
      console.error("Apps Script returned non-JSON response:", text.substring(0, 500));
      if (text.includes("<!DOCTYPE") || text.includes("<html")) {
        throw new Error("Apps Script returned an HTML page instead of JSON. This usually means the script deployment is not set to 'Anyone' or the URL is incorrect (should end in /exec).");
      }
      throw new Error("Failed to parse JSON response from Apps Script");
    }
  } catch (error: any) {
    console.error("Error fetching from Apps Script", error);
    res.status(500).json({ error: error.message || "Failed to fetch from Google Apps Script" });
  }
});

app.get("/api/configs", async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return res.status(401).json({ error: "Google Apps Script URL not configured" });
  }

  // Check cache
  const now = Date.now();
  if (cache.configs.data && (now - cache.configs.timestamp < CACHE_DURATION)) {
    return res.json(cache.configs.data);
  }

  try {
    const response = await fetch(`${scriptUrl}?type=configs`, {
      method: 'GET',
      redirect: 'follow'
    });

    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`Apps Script returned status ${response.status}: ${text.substring(0, 100)}`);
    }

    try {
      const data = JSON.parse(text);
      // Update cache
      cache.configs = { data: data, timestamp: now };
      res.json(data);
    } catch (e) {
      console.error("Apps Script returned non-JSON response:", text.substring(0, 500));
      throw new Error("Failed to parse JSON response from Apps Script");
    }
  } catch (error: any) {
    console.error("Error fetching configs from Apps Script", error);
    res.status(500).json({ error: error.message || "Failed to fetch configs from Google Apps Script" });
  }
});

app.post("/api/save-configs", async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return res.status(401).json({ error: "Google Apps Script URL not configured" });
  }

  const { configs } = req.body;

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'configs', data: configs }),
      redirect: 'follow'
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Apps Script returned status ${response.status}: ${text.substring(0, 100)}`);
    }

    try {
      const result = JSON.parse(text);
      // Invalidate configs cache
      cache.configs = { data: null, timestamp: 0 };
      res.json(result);
    } catch (e) {
      throw new Error("Failed to parse JSON response from Apps Script");
    }
  } catch (error: any) {
    console.error("Error saving configs to Apps Script", error);
    res.status(500).json({ error: error.message || "Failed to save configs to Google Apps Script" });
  }
});

app.post("/api/update-order-status", async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl) {
    return res.status(401).json({ error: "Google Apps Script URL not configured" });
  }

  const { orderId, isFromSheet, timestamp, newStatus } = req.body;

  if (!isFromSheet) {
    return res.status(400).json({ error: "Only orders from Google Sheet can be updated via this API" });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'updateOrderStatus', orderId, timestamp, newStatus }),
      redirect: 'follow'
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Apps Script returned status ${response.status}: ${text.substring(0, 100)}`);
    }

    try {
      const result = JSON.parse(text);
      if (result.status === 'error') {
        throw new Error(result.message || "Apps Script error");
      }
      // Invalidate orders cache
      cache.orders = { data: null, timestamp: 0 };
      res.json(result);
    } catch (e) {
      console.error("Apps Script returned non-JSON response (updateOrderStatus):", text.substring(0, 500));
      throw new Error("Failed to parse JSON response from Apps Script");
    }
  } catch (error: any) {
    console.error("Error updating order status in Apps Script", error);
    res.status(500).json({ error: error.message || "Failed to update order status in Google Apps Script" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
