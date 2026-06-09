"use client";

import type { IconType } from "react-icons";
import {
  SiReact,
  SiAngular,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiRedux,
  SiNodedotjs,
  SiCsharp,
  SiGo,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiDocker,
  SiKubernetes,
  SiAzuredevops,
  SiGit,
  SiFigma,
} from "react-icons/si";

// Mapea el nombre de la skill -> logo oficial + color de marca.
// Lo que no es tecnología (Design Systems, User Research, docencia...)
// no está aquí y usa su emoji como respaldo.
const MAP: Record<string, { Icon: IconType; color: string }> = {
  "React / Next.js": { Icon: SiReact, color: "#61DAFB" },
  Angular: { Icon: SiAngular, color: "#E23237" },
  TypeScript: { Icon: SiTypescript, color: "#3B82F6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  Bootstrap: { Icon: SiBootstrap, color: "#8B5CF6" },
  Redux: { Icon: SiRedux, color: "#A78BFA" },
  "Node.js": { Icon: SiNodedotjs, color: "#6CC24A" },
  "C# / .NET": { Icon: SiCsharp, color: "#B074E8" },
  Golang: { Icon: SiGo, color: "#00ADD8" },
  PHP: { Icon: SiPhp, color: "#9AA0E0" },
  "REST / GraphQL": { Icon: SiGraphql, color: "#E535AB" },
  PostgreSQL: { Icon: SiPostgresql, color: "#6BA8E8" },
  MySQL: { Icon: SiMysql, color: "#5B9FD6" },
  MongoDB: { Icon: SiMongodb, color: "#4DB33D" },
  Redis: { Icon: SiRedis, color: "#FF5C52" },
  "Azure DevOps": { Icon: SiAzuredevops, color: "#3B9AE8" },
  Docker: { Icon: SiDocker, color: "#2B9DF5" },
  Kubernetes: { Icon: SiKubernetes, color: "#5B8DEF" },
  Git: { Icon: SiGit, color: "#F05032" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
};

export default function TechIcon({
  name,
  fallback,
  className = "",
}: {
  name: string;
  fallback?: string;
  className?: string;
}) {
  const entry = MAP[name];
  if (entry) {
    const { Icon, color } = entry;
    return <Icon className={className} style={{ color }} aria-hidden />;
  }
  return <span className={className}>{fallback}</span>;
}
