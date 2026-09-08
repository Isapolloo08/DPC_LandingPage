"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Maximize2,
  Minimize2,
  ExternalLink,
  Church,
  Copy,
  Check,
  Locate,
  Car,
  AlertCircle,
  Route,
  Eye,
  Bus,
  Compass,
  Sparkles,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandMapProps {
  label?: string;
  title?: string;
  subtitle?: string;
  location?: string;
  address?: string;
  landmark?: string;
  coordinates?: string;
  lat?: number;
  lng?: number;
  apiKey?: string;
  mapEmbedUrl?: string;
  googleMapsUrl?: string;
  className?: string;
}

// Preset nearby towns in Camarines Norte / Bicol
const NEARBY_PRESETS = [
  { name: "Daet Centro", lat: 14.1122, lng: 122.9553, label: "Daet Centro (1.2 km)" },
  { name: "Talisay", lat: 14.1500, lng: 122.9167, label: "Talisay (~5.8 km)" },
  { name: "Mercedes", lat: 14.1108, lng: 123.0139, label: "Mercedes (~8.4 km)" },
  { name: "Vinzons", lat: 14.1800, lng: 122.9300, label: "Vinzons (~9.6 km)" },
  { name: "Basud", lat: 14.0667, lng: 122.9667, label: "Basud (~7.2 km)" },
  { name: "Labo", lat: 14.1500, lng: 122.8333, label: "Labo (~15 km)" },
  { name: "Naga City", lat: 13.6218, lng: 123.1948, label: "Naga City (~85 km)" },
  { name: "Metro Manila", lat: 14.5995, lng: 120.9842, label: "Metro Manila (~330 km)" },
];

// Haversine distance calculator in Kilometers
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Estimate travel time based on distance
function estimateTravelTime(distanceKm: number): { drive: string; mode: string } {
  if (distanceKm < 1.5) {
    const mins = Math.max(3, Math.round((distanceKm / 4) * 60));
    return { drive: `~${mins} mins walk / 2 mins ride`, mode: "walk" };
  }
  if (distanceKm <= 15) {
    const mins = Math.max(5, Math.round((distanceKm / 35) * 60));
    return { drive: `~${mins} mins drive / tricycle`, mode: "car" };
  }
  if (distanceKm <= 100) {
    const hours = Math.floor(distanceKm / 50);
    const mins = Math.round(((distanceKm % 50) / 50) * 60);
    return { drive: hours > 0 ? `~${hours}h ${mins}m drive/bus` : `~${mins} mins bus`, mode: "car" };
  }
  const hours = Math.floor(distanceKm / 50);
  return { drive: `~${hours} hrs via AH26 highway`, mode: "car" };
}

export function ExpandMap({
  label = "CURRENT LOCATION",
  title = "Daet Presbyterian Church",
  subtitle = "Camarines Norte Youth Center Bldg.",
  location = "Daet, Camarines Norte",
  address = "Purok 2, Brgy. Cobangbang, Daet, Camarines Norte, Philippines 4600",
  landmark = "Purok 2, Cobangbang (In front of Bicol CATV / Near Mary's Bright Montessori)",
  coordinates = "14.1083° N, 122.9595° E",
  lat = 14.108300,
  lng = 122.959450,
  googleMapsUrl,
  className,
}: ExpandMapProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeLayer, setActiveLayer] = useState<"dark" | "satellite" | "standard">("dark");
  const [viewMode, setViewMode] = useState<"route" | "pin">("route");

  // User Geolocation State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showLocationNotice, setShowLocationNotice] = useState(true);

  // Request browser geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: "Your Exact Location",
        });
        setViewMode("route");
        setShowLocationNotice(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Location permission denied. Please allow location in your browser or pick a town below.");
        } else {
          setLocationError("Unable to retrieve your location. Pick a town below.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Select Preset location
  const handleSelectPreset = (preset: (typeof NEARBY_PRESETS)[0]) => {
    setUserLocation({
      lat: preset.lat,
      lng: preset.lng,
      name: preset.name,
    });
    setViewMode("route");
    setShowLocationNotice(false);
    setLocationError(null);
  };

  // Distance & Travel Time Calculation
  const distanceKm = userLocation ? calculateDistanceKm(userLocation.lat, userLocation.lng, lat, lng) : null;
  const travelTime = distanceKm !== null ? estimateTravelTime(distanceKm) : null;

  // Search query & Directions URL for navigation (with origin if user location exists)
  const searchQuery = encodeURIComponent(`${title}, ${location}, Philippines`);
  const resolvedDirectionsUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}`
    : googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${searchQuery}`;

  // Map Embed URL - Shows actual street route between User and Church on the map
  const getEmbedUrl = () => {
    const mapTypeParam = activeLayer === "satellite" ? "&t=k" : "&t=m";

    if (userLocation && viewMode === "route") {
      // Free Direct Driving/Walking Route drawn directly on map streets between User and Church
      return `https://maps.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${lat},${lng}${mapTypeParam}&ie=UTF8&iwloc=&output=embed`;
    }

    // Default Pinpoint View
    return `https://maps.google.com/maps?q=${lat},${lng}${mapTypeParam}&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[500px] sm:min-h-[540px] rounded-3xl glass-panel-gold border border-dpc-gold-500/40 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-500",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* ========================================================= */
          /* --- COLLAPSED STATE (Minimalist White Card) --- */
          /* ========================================================= */
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full h-full flex flex-col justify-between p-4 sm:p-6 relative bg-gradient-to-b from-dpc-navy-900/90 to-dpc-navy-950/95"
          >
            {/* Background Ambient Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

            {/* Top Section Header */}
            <div className="w-full flex items-center justify-between z-10 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-dpc-gold-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-dpc-gold-400">
                  Location & Commute Overview
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">
                    GPS Ready
                  </span>
                </div>

                <button
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-dpc-navy-950 bg-dpc-gold-400 hover:bg-dpc-gold-300 transition-all cursor-pointer shadow-sm"
                >
                  <span>Expand Map</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Middle Section: Split Satellite Snapshot + Commute Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 my-auto py-3 z-10 items-stretch">
              
              {/* Left Column: Interactive Satellite Snapshot Preview */}
              <div
                onClick={() => setIsExpanded(true)}
                className="lg:col-span-5 group relative rounded-2xl overflow-hidden cursor-pointer border border-dpc-gold-500/30 hover:border-dpc-gold-400/80 bg-black shadow-xl transition-all duration-300 min-h-[190px] sm:min-h-[210px] flex flex-col justify-between"
              >
                {/* Embedded Live Satellite View */}
                <iframe
                  title="DPC Satellite Preview"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  tabIndex={-1}
                />

                {/* Gradient vignette on satellite preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Badge on Satellite Thumbnail */}
                <div className="relative z-10 p-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 border border-white/20 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    <Layers className="w-3 h-3 text-dpc-gold-400" />
                    <span>Satellite View</span>
                  </span>

                  <span className="text-[9px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
                    {coordinates}
                  </span>
                </div>

                {/* Center Pulsing Church Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dpc-gold-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-dpc-navy-950 items-center justify-center text-dpc-gold-400 shadow-[0_0_15px_rgba(212,175,55,1)] border border-dpc-gold-400">
                      <Church className="w-4 h-4" />
                    </span>
                  </span>
                  <span className="mt-1 px-2 py-0.5 rounded bg-black/80 border border-dpc-gold-400/40 text-[9px] font-extrabold text-dpc-gold-300 uppercase tracking-wider shadow-md">
                    DPC Sanctuary
                  </span>
                </div>

                {/* Hover Click to Expand Indicator */}
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dpc-gold-400 text-dpc-navy-950 text-xs font-bold shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Open Full Road Route</span>
                  </span>
                </div>

                {/* Bottom Snapshot Footer */}
                <div className="relative z-10 p-3 bg-black/70 border-t border-white/10 backdrop-blur-md">
                  <p className="text-xs font-bold text-white leading-tight">
                    {title}
                  </p>
                  <p className="text-[10px] text-dpc-gold-300 font-medium truncate mt-0.5">
                    📍 {landmark}
                  </p>
                </div>
              </div>

              {/* Right Column: Commute & Transit Guide (Paano Pumunta) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    <Compass className="w-3.5 h-3.5 text-dpc-gold-400" />
                    <span>Transit & Commute Guide</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-light">
                    Daet, Camarines Norte
                  </span>
                </div>

                {/* 3 Step-by-step Travel Options */}
                <div className="space-y-1.5">
                  {/* Option 1: Tricycle */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-dpc-gold-500/20 border border-dpc-gold-500/30 flex items-center justify-center text-dpc-gold-400 shrink-0 mt-0.5">
                      <span className="text-xs">🛵</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white">Mula Daet Centro (Bayan)</span>
                        <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">~5-7 mins</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                        Sakay ng <span className="text-dpc-gold-300 font-semibold">Cobangbang Tricycle</span> sa Centro. Sabihin sa driver: <span className="italic">"Tapat ng Bicol CATV / Mary's Bright, Purok 2."</span>
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Private Car / Waze */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white">Private Vehicle (Waze / Maps)</span>
                        <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Direct GPS</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                        I-search ang <span className="text-white font-medium">"Daet Presbyterian Church Cobangbang"</span> — may maluwag at ligtas na parking sa tapat ng simbahan.
                      </p>
                    </div>
                  </div>

                  {/* Option 3: Surrounding Municipalities */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Bus className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white">Mula Karatig-Bayan (Vinzons, Talisay, Basud)</span>
                        <span className="text-[9px] font-semibold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Via Centro / Terminal</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                        Bumaba sa Daet Central Terminal o Provincial Capitol Complex, sumakay ng maikling tricycle ride pa-Cobangbang.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenity Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-slate-300">
                    🅿️ Libreng Parking
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-slate-300">
                    ❄️ Air-Conditioned
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-slate-300">
                    ♿ Ground Floor Access
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-medium text-slate-300">
                    ☕ CNYC Study & Youth Hub
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Quick Help Prompt */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-white/10 text-xs text-slate-300 z-10">
              <div className="flex items-center gap-2 truncate max-w-full">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 shrink-0 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-white" />}
                  <span>{copied ? "Copied" : "Copy Address"}</span>
                </button>
                <span className="text-slate-400 font-light truncate text-[11px]">
                  {address}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <a
                  href={resolvedDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-cyan-400" />
                  <span>Open GPS App</span>
                </a>

                <button
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:brightness-110 shadow-gold-glow transition-all cursor-pointer shrink-0"
                >
                  <span>Expand Live Map & Route</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* --- EXPANDED STATE (Interactive Map + Live Route) --- */
          /* ========================================================= */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full flex flex-col justify-between relative bg-dpc-navy-950"
          >
            {/* Expanded Header Bar */}
            <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between gap-3 bg-dpc-navy-950/95 backdrop-blur-md z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Church className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold font-serif text-white leading-tight">
                      {title}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-bold text-white uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-white/70 font-mono mt-0.5">
                    {coordinates}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle when User Location is set */}
                {userLocation && (
                  <button
                    onClick={() => setViewMode(viewMode === "route" ? "pin" : "route")}
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-dpc-navy-950 bg-dpc-gold-400 hover:bg-dpc-gold-300 transition-all cursor-pointer shadow-sm"
                  >
                    {viewMode === "route" ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Church View</span>
                      </>
                    ) : (
                      <>
                        <Route className="w-3.5 h-3.5" />
                        <span>Show Road Route</span>
                      </>
                    )}
                  </button>
                )}

                {/* Layer Switcher (Dark / Satellite) */}
                <div className="hidden sm:inline-flex items-center p-0.5 rounded-xl bg-white/10 border border-white/20 gap-0.5">
                  {(["dark", "satellite"] as const).map((layer) => (
                    <button
                      key={layer}
                      onClick={() => setActiveLayer(layer)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all capitalize cursor-pointer",
                        activeLayer === layer
                          ? "bg-dpc-gold-500 text-dpc-navy-950 shadow-sm font-extrabold"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {layer === "dark" ? "Dark Theme" : "Satellite"}
                    </button>
                  ))}
                </div>

                {/* Google Directions Button */}
                <a
                  href={resolvedDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-black bg-white hover:bg-slate-100 shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all cursor-pointer"
                  title="Open in Google Maps Navigation"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Directions</span>
                </a>

                {/* Collapse Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
                  aria-label="Collapse map"
                  title="Collapse map view"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* --- REAL-TIME DISTANCE BAR BETWEEN YOU & CHURCH --- */}
            {/* ========================================================= */}
            <div className="px-3 sm:px-4 py-2.5 bg-dpc-navy-900/90 border-b border-white/10 backdrop-blur-md z-20">
              {userLocation && distanceKm !== null ? (
                /* Active Distance Bar Tracker */
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="truncate max-w-[140px] sm:max-w-[180px]">{userLocation.name}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-dpc-gold-500/20 border border-dpc-gold-500/40 text-dpc-gold-300 font-bold text-[11px]">
                      <Car className="w-3.5 h-3.5" />
                      <span>{distanceKm} km ({travelTime?.drive})</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-semibold text-dpc-gold-400">
                      <Church className="w-3.5 h-3.5 text-dpc-gold-400" />
                      <span>DPC Church</span>
                    </div>
                  </div>

                  {/* Animated Connecting Distance Beam */}
                  <div className="relative w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10 flex items-center px-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-dpc-gold-400 to-amber-500 opacity-70" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite_linear]" />

                    {/* Pulsing indicator along the bar */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                      <span className="text-[9px] font-extrabold text-black uppercase tracking-wider px-1 bg-white/90 rounded-sm shadow-sm">
                        {distanceKm} KM ROUTE
                      </span>
                      <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b]" />
                    </div>
                  </div>

                  {/* Quick Controls */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDetectLocation}
                        disabled={isLocating}
                        className="inline-flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
                      >
                        <Locate className={cn("w-3 h-3", isLocating && "animate-spin")} />
                        <span>{isLocating ? "Updating GPS..." : "Re-detect GPS Location"}</span>
                      </button>

                      <span className="text-white/20">•</span>

                      <span className="text-emerald-400 font-medium">
                        🛣️ Actual road route active on map
                      </span>
                    </div>

                    <button
                      onClick={() => setShowLocationNotice(true)}
                      className="text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Change Town / City
                    </button>
                  </div>
                </div>
              ) : (
                /* Location Request Prompt / Notice Bar */
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-dpc-gold-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white">
                      📍 Turn on location to see the actual road route to church:
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:brightness-110 shadow-md transition-all cursor-pointer"
                    >
                      <Locate className={cn("w-3.5 h-3.5", isLocating && "animate-spin")} />
                      <span>{isLocating ? "Detecting GPS..." : "Turn On My Location"}</span>
                    </button>

                    <button
                      onClick={() => setShowLocationNotice(!showLocationNotice)}
                      className="text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Or pick nearby town ▾
                    </button>
                  </div>
                </div>
              )}

              {/* Preset Town Selection Dropdown Drawer */}
              {showLocationNotice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2.5 pt-2.5 border-t border-white/10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Select your nearest municipality / city to show road route:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {NEARBY_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => handleSelectPreset(preset)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all border cursor-pointer",
                          userLocation?.name === preset.name
                            ? "bg-dpc-gold-500 text-dpc-navy-950 border-dpc-gold-400 font-bold"
                            : "bg-white/5 hover:bg-white/15 text-slate-300 border-white/10"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {locationError && (
                    <p className="text-[10px] text-amber-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{locationError}</span>
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Interactive Embedded Map Canvas with Live Road Route */}
            <div className="flex-1 w-full relative min-h-[360px] sm:min-h-[400px] bg-[#0c131f] overflow-hidden touch-auto">
              <iframe
                key={`${activeLayer}-${userLocation?.lat}-${userLocation?.lng}-${viewMode}`}
                title={`${title} Map View`}
                src={getEmbedUrl()}
                className={cn(
                  "w-full h-full border-0 absolute inset-0 transition-all duration-500 pointer-events-auto",
                  activeLayer === "dark" && "invert-[92%] hue-rotate-180 brightness-[92%] contrast-[115%]"
                )}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ pointerEvents: 'auto', touchAction: 'auto' }}
              />

              {/* Floating Bottom Info Card (Compact on mobile so dragging area is wide) */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-black/90 rounded-2xl p-2.5 sm:p-3.5 border border-white/20 shadow-2xl backdrop-blur-md z-20">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-dpc-gold-400 block">
                      Physical Location
                    </span>
                    <p className="text-[11px] sm:text-xs text-white leading-tight font-medium truncate">
                      {address}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 shrink-0 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-white" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                  <span className="text-white/80 truncate text-[10px]">📍 {landmark}</span>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {distanceKm !== null && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-cyan-400 font-semibold">
                        <Car className="w-3 h-3" />
                        <span>{distanceKm} km ({travelTime?.drive})</span>
                      </span>
                    )}

                    <a
                      href={resolvedDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-dpc-gold-300 hover:text-white font-bold transition-colors"
                    >
                      <span>Open App ↗</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpandMap;
