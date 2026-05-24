type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="shell pt-16 sm:pt-20">
      <div className="glass max-w-4xl rounded-[2rem] p-8 shadow-glow sm:p-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title mt-3">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-copy/75 sm:text-base">{description}</p>
      </div>
    </section>
  );
}
