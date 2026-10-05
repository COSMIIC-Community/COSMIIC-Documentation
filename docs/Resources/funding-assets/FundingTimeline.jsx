// src/components/FundingTimeline/index.jsx
// Companion to PublicationsTimeline — same visual language, adapted for grant/funding data.
// Drop this file into your Docusaurus project at src/components/FundingTimeline/index.jsx
// Then import it in any .mdx page with:  import FundingTimeline from '@site/src/components/FundingTimeline';

import React, { useState, useMemo } from "react";

// ─── Inline styles (avoids Docusaurus CSS module conflicts) ──────────────────

const TEAL = "var(--ifm-color-primary, #0ea5a0)";
const TEAL_BG = "var(--ifm-color-primary-lightest, #e6f8f8)";
const BORDER = "var(--ifm-color-emphasis-200, #e5e7eb)";
const TEXT_MUTED = "var(--ifm-color-emphasis-600, #6b7280)";
const TEXT_HEADING = "var(--ifm-heading-color, #111827)";
const CARD_BG = "var(--ifm-card-background-color, #ffffff)";

const styles = {
  wrapper: {
    fontFamily: "var(--ifm-font-family-base, sans-serif)",
    maxWidth: 860,
    margin: "0 auto",
    padding: "0 0 3rem",
  },
  timeline: {
    position: "relative",
    paddingLeft: "2.5rem",
  },
  timelineRule: {
    position: "absolute",
    left: "0.875rem",
    top: 0,
    bottom: 0,
    width: 2,
    background: `linear-gradient(to bottom, ${TEAL}, ${BORDER})`,
    borderRadius: 2,
    zIndex: 0,
  },
  yearGroup: {
    marginBottom: "1.75rem",
  },
  yearLabel: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    marginLeft: "-2.5rem",
  },
  yearDot: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: TEAL,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    zIndex: 1,
    boxShadow: `0 0 0 4px ${TEAL_BG}`,
  },
  yearDotInner: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#fff",
  },
  yearText: {
    marginLeft: "0.75rem",
    fontWeight: 800,
    fontSize: "1.15rem",
    letterSpacing: "-0.01em",
    color: TEXT_HEADING,
  },
  card: {
    background: CARD_BG,
    border: `1px solid ${BORDER}`,
    borderLeft: `4px solid ${TEAL}`,
    borderRadius: 10,
    padding: "1rem 1.25rem",
    marginBottom: "0.75rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.15s ease, transform 0.15s ease",
  },
  cardTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: TEXT_HEADING,
    lineHeight: 1.45,
    marginBottom: "0.35rem",
    margin: 0,
  },
  cardPi: {
    fontSize: "0.8rem",
    color: TEXT_MUTED,
    marginTop: "0.3rem",
    marginBottom: "0.25rem",
    lineHeight: 1.5,
  },
  cardMeta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  agencyChip: {
    fontSize: "0.75rem",
    color: TEXT_MUTED,
  },
  detailsText: {
    fontSize: "0.75rem",
    color: TEXT_MUTED,
    fontVariantNumeric: "tabular-nums",
  },
  amountText: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: TEXT_HEADING,
    fontVariantNumeric: "tabular-nums",
  },
  noteText: {
    fontSize: "0.75rem",
    color: TEXT_MUTED,
    marginTop: "0.5rem",
    paddingTop: "0.5rem",
    borderTop: `1px solid ${BORDER}`,
    lineHeight: 1.5,
  },
};

// ─── Date helpers ──────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatPeriod(g) {
  if (!g.year) return "Dates TBD";
  const start = g.month ? `${MONTH_NAMES[g.month]} ${g.year}` : String(g.year);
  if (!g.endYear) return `${start} –`;
  const end = g.endMonth ? `${MONTH_NAMES[g.endMonth]} ${g.endYear}` : String(g.endYear);
  return `${start} – ${end}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FundingCard({ grant }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered
          ? "0 4px 16px rgba(14,165,160,0.12)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateX(3px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={styles.cardTitle}>{grant.title}</p>
      {grant.pi && <p style={styles.cardPi}>{grant.pi}</p>}

      <div style={styles.cardMeta}>
        {grant.agency && <span style={styles.agencyChip}>{grant.agency}</span>}
        <span style={styles.detailsText}>
          {formatPeriod(grant)}
          {grant.type ? ` · ${grant.type}` : ""}
        </span>
        {grant.amount && <span style={styles.amountText}>{grant.amount}</span>}
      </div>

      {grant.note && <p style={styles.noteText}>{grant.note}</p>}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function FundingTimeline({ funding = [] }) {
  const grouped = useMemo(() => {
    const sorted = [...funding].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return (b.month || 0) - (a.month || 0);
    });

    const groups = {};
    sorted.forEach((g) => {
      const key = String(g.year);
      if (!groups[key]) {
        groups[key] = { label: key, year: g.year, grants: [] };
      }
      groups[key].grants.push(g);
    });

    return Object.values(groups).sort((a, b) => b.year - a.year);
  }, [funding]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.timeline}>
        <div style={styles.timelineRule} />
        {grouped.map((group) => (
          <div key={group.label} style={styles.yearGroup}>
            <div style={styles.yearLabel}>
              <div style={styles.yearDot}>
                <div style={styles.yearDotInner} />
              </div>
              <span style={styles.yearText}>{group.label}</span>
            </div>
            {group.grants.map((g) => (
              <FundingCard key={g.title} grant={g} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
