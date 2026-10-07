"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  Layers,
  Coffee,
  Snowflake,
  Accessibility,
  ParkingCircle,
  Bike,
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
  googleMapsUrl?: string;
  className?: string;
  initialExpanded?: boolean;
  allowExternalNavigation?: boolean;
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
  label = "FIND YOUR WAY",
  title = "Daet Presbyterian Church",
  location = "Daet, Camarines Norte",
  address = "Purok 2, Brgy. Cobangbang, Daet, Camarines Norte 4600",
  landmark = "Purok 2, Cobangbang (In front of Bicol CATV / Near Mary's Bright Montessori)",
  coordinates = "14.1083° N, 122.9595° E",
  lat = 14.108300,
  lng = 122.959450,
  googleMapsUrl,
  className,
  initialExpanded = false,
  allowExternalNavigation = true,
}: ExpandMapProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const reducedMotion = useReducedMotion();
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const expandButton = useRef<HTMLButtonElement>(null);
  const collapseButton = useRef<HTMLButtonElement>(null);
  const focusAfterTransition = useRef(false);
  const mounted = useRef(false);
  const locationRequest = useRef(0);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      locationRequest.current += 1;
      clearTimeout(copyTimer.current);
    };
  }, []);
  const changeExpanded = (expanded: boolean) => {
    focusAfterTransition.current = true;
    setIsExpanded(expanded);
  };
  const restoreFocus = () => {
    if (!focusAfterTransition.current) return;
    (isExpanded ? collapseButton : expandButton).current?.focus({ preventScroll: true });
    focusAfterTransition.current = false;
  };
  const [activeLayer, setActiveLayer] = useState<"dark" | "satellite" | "standard">("standard");
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
    const request = ++locationRequest.current;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mounted.current || request !== locationRequest.current) return;
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
        if (!mounted.current || request !== locationRequest.current) return;
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
    locationRequest.current += 1;
    setIsLocating(false);
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

  // Search query & Directions URL for navigation
  const resolvedDirectionsUrl = userLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}`
    : googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // Map Embed URL - Shows actual street route between User and Church on the map
  const getEmbedUrl = () => {
    const mapTypeParam = activeLayer === "satellite" ? "&t=k" : "&t=m";

    if (userLocation && viewMode === "route") {
      return `https://maps.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${lat},${lng}${mapTypeParam}&ie=UTF8&iwloc=&output=embed`;
    }

    // Default Pinpoint View
    return `https://maps.google.com/maps?q=${lat},${lng}${mapTypeParam}&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      if (!mounted.current) return;
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      if (!mounted.current) return;
      setCopyError(true);
    }
  };

  const copyLabel = copied ? "Copied" : "Copy Address";
  const transition = { duration: reducedMotion ? 0 : 0.22, ease: "easeOut" as const };
  return (
    <div className={cn("travel-map", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {!isExpanded ? (
          <motion.div key="collapsed" className="travel-map-summary"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={transition} onAnimationComplete={(definition) => {
              if (typeof definition === "object" && "opacity" in definition && definition.opacity === 1) restoreFocus();
            }}>
            <header className="travel-map-header">
              <div>
                <p className="eyebrow"><MapPin size={13} />{label}</p>
                <h3>Your way to DPC.</h3>
              </div>
              <div className="travel-map-header-actions">
                <span className="travel-map-ready"><span />GPS ready</span>
                <button ref={expandButton} type="button" className="travel-map-button"
                  onClick={() => changeExpanded(true)} aria-expanded={false}>
                  Expand map <Maximize2 size={14} />
                </button>
              </div>
            </header>
            <div className="travel-map-guide">
              <button type="button" className="travel-map-snapshot"
                aria-label="Click to open interactive road map" onClick={() => changeExpanded(true)}>
                <iframe title="DPC Satellite Preview"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
                  tabIndex={-1} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <span className="travel-map-satellite-label"><Layers size={12} />Satellite view</span>
                <span className="travel-map-pin"><Church size={20} /><small>DPC Sanctuary</small></span>
                <span className="travel-map-snapshot-caption">
                  <strong>{title}</strong>
                  <span>{landmark}</span>
                  <span className="travel-map-snapshot-link">Explore the map <Maximize2 size={12} /></span>
                </span>
              </button>
              <div className="travel-map-commute">
                <div className="travel-map-commute-heading">
                  <Compass size={16} /><h4>Transit & commute guide</h4>
                </div>
                <p className="travel-map-town">{location}</p>
                <ol className="travel-map-options">
                  <li>
                    <Bike size={18} />
                    <div><div className="travel-map-option-title"><strong>Mula Daet Centro (Bayan)</strong><small>~5–7 mins</small></div>
                      <p>Sakay ng <b>Cobangbang Tricycle</b> sa Centro. Sabihin sa driver: <em>&quot;Tapat ng Bicol CATV / Mary&apos;s Bright, Purok 2.&quot;</em></p>
                    </div>
                  </li>
                  <li>
                    <Car size={18} />
                    <div><div className="travel-map-option-title"><strong>Private Vehicle (Waze / Maps)</strong><small>Direct GPS</small></div>
                      <p>I-search ang <b>&quot;Daet Presbyterian Church Cobangbang&quot;</b> — may maluwag at ligtas na parking sa tapat ng simbahan.</p>
                    </div>
                  </li>
                  <li>
                    <Bus size={18} />
                    <div><div className="travel-map-option-title"><strong>Mula Karatig-Bayan</strong><small>Via Centro</small></div>
                      <p>From Vinzons, Talisay, or Basud: bumaba sa Daet Central Terminal o Provincial Capitol Complex, sumakay ng tricycle pa-Cobangbang.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div className="travel-map-amenities">
              <span><ParkingCircle size={14} />Libreng parking</span>
              <span><Snowflake size={14} />Air-conditioned</span>
              <span><Accessibility size={14} />Ground floor access</span>
              <span><Coffee size={14} />Fellowship & coffee</span>
            </div>
            <footer className="travel-map-footer">
              <div className="travel-map-address"><MapPin size={16} /><p>{address}</p></div>
              <div className="travel-map-footer-actions">
                <button type="button" className="travel-map-button travel-map-button-quiet" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyLabel}</span>
                </button>
                {allowExternalNavigation && <a href={resolvedDirectionsUrl} target="_blank" rel="noopener noreferrer" className="travel-map-button travel-map-button-quiet">
                  <Navigation size={14} />Open GPS App
                </a>}
                <button type="button" className="travel-map-button travel-map-button-primary" onClick={() => changeExpanded(true)}>
                  Map & route <Maximize2 size={14} />
                </button>
              </div>
              {copyError && <p role="status" className="travel-map-error">Couldn’t copy automatically. You can select the address above.</p>}
            </footer>
          </motion.div>
        ) : (
          <motion.div key="expanded" className="travel-map-expanded"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={transition} onAnimationComplete={(definition) => {
              if (typeof definition === "object" && "opacity" in definition && definition.opacity === 1) restoreFocus();
            }}>
            <header className="travel-map-header">
              <div><p className="eyebrow"><Church size={13} />FIND YOUR WAY</p><h3>{title}</h3>
                <p className="travel-map-coordinates">{coordinates}</p></div>
              <button ref={collapseButton} type="button" className="travel-map-button"
                aria-label="Collapse map" onClick={() => changeExpanded(false)} aria-expanded={true}>
                <Minimize2 size={14} />Close map
              </button>
            </header>
            <div className="travel-map-route-panel">
              {userLocation && distanceKm !== null ? (
                <div className="travel-map-route-info">
                  <div><p className="eyebrow">YOUR JOURNEY</p><strong>{userLocation.name} <span>→</span> DPC Church</strong>
                    <p>{distanceKm} km straight-line distance · {travelTime?.drive} (estimate)</p></div>
                  <button type="button" className="text-link" onClick={() => setShowLocationNotice(!showLocationNotice)}
                    aria-expanded={showLocationNotice}>Change town / city</button>
                </div>
              ) : <p className="travel-map-route-intro">Choose your starting point to see the road route to church.</p>}
              <div className="travel-map-origin-actions">
                <button type="button" className="travel-map-button travel-map-button-primary" onClick={handleDetectLocation} disabled={isLocating}>
                  <Locate size={14} className={isLocating && !reducedMotion ? "animate-spin" : undefined} />
                  {isLocating ? "Detecting GPS…" : userLocation ? "Update my location" : "Use my location"}
                </button>
                {!userLocation && <button type="button" className="text-link" onClick={() => setShowLocationNotice(!showLocationNotice)}
                  aria-expanded={showLocationNotice}>Or pick a nearby town</button>}
              </div>
              {showLocationNotice && (
                <div className="travel-map-towns">
                  <p>Start from a nearby town or city</p>
                  <div>{NEARBY_PRESETS.map(preset => (
                    <button key={preset.name} type="button" onClick={() => handleSelectPreset(preset)}
                      aria-pressed={userLocation?.name === preset.name}>{preset.label}</button>
                  ))}</div>
                </div>
              )}
              {locationError && <p role="status" className="travel-map-error"><AlertCircle size={14} />{locationError}</p>}
            </div>
            <div className="travel-map-toolbar">
              <div className="travel-map-layers" aria-label="Map layer">
                {(["standard", "satellite", "dark"] as const).map(layer => (
                  <button key={layer} type="button" onClick={() => setActiveLayer(layer)} aria-pressed={activeLayer === layer}>
                    {layer === "standard" ? "Road map" : layer === "satellite" ? "Satellite" : "Night map"}
                  </button>
                ))}
              </div>
              {userLocation && <button type="button" className="travel-map-button travel-map-button-quiet"
                onClick={() => setViewMode(viewMode === "route" ? "pin" : "route")}>
                {viewMode === "route" ? <Eye size={14} /> : <Route size={14} />}
                {viewMode === "route" ? "Church view" : "Show road route"}
              </button>}
            </div>
            <div className="travel-map-canvas">
              <iframe key={`${activeLayer}-${userLocation?.lat}-${userLocation?.lng}-${viewMode}`}
                title={`${title} Map View`} src={getEmbedUrl()}
                className={activeLayer === "dark" ? "travel-map-night" : undefined}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <footer className="travel-map-footer">
              <div className="travel-map-address"><MapPin size={16} /><div><p>{address}</p><small>{landmark}</small></div></div>
              <div className="travel-map-footer-actions">
                <button type="button" className="travel-map-button travel-map-button-quiet" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyLabel}</span>
                </button>
                {allowExternalNavigation && <a href={resolvedDirectionsUrl} target="_blank" rel="noopener noreferrer" className="travel-map-button travel-map-button-primary">
                  <Navigation size={14} />Open in Google Maps <ExternalLink size={13} />
                </a>}
              </div>
              {copyError && <p role="status" className="travel-map-error">Couldn’t copy automatically. You can select the address above.</p>}
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExpandMap;
