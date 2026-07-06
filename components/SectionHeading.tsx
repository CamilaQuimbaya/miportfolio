import Reveal from "./Reveal";

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ kicker, title, subtitle }: Props) {
  return (
    <div className="mx-auto mb-7 max-w-2xl text-center">
      <Reveal>
        <span className="font-pixel text-[9px] uppercase tracking-widest text-neon-cyan">
          ✦ {kicker} ✦
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="title-underline text-gradient glow-text animate-gradient-x">
            {title}
          </span>
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-2 text-sm text-white/60">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
