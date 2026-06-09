"use client";

import type { IconType } from "react-icons";
import {
  FaBuilding,
  FaFilm,
  FaBriefcase,
  FaRegNoteSticky,
  FaLink,
  FaServer,
  FaCode,
} from "react-icons/fa6";

const MAP: Record<string, IconType> = {
  building: FaBuilding,
  film: FaFilm,
  briefcase: FaBriefcase,
  note: FaRegNoteSticky,
  chain: FaLink,
  server: FaServer,
};

export default function ProjectIcon({
  name,
  color,
  className,
}: {
  name: string;
  color?: string;
  className?: string;
}) {
  const Icon = MAP[name] ?? FaCode;
  return <Icon className={className} style={color ? { color } : undefined} aria-hidden />;
}
