import Link from "next/link";

export function AboutHero() {
  return (
    <section 
      className="pt-[140px] pb-[100px]"
      style={{
        background: 'linear-gradient(to bottom, white, #FFFBEB)',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6 text-sm text-silver">
          <Link href="/" className="hover:text-ocean">Home</Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </div>
        <p className="mb-5 text-ocean text-xs uppercase tracking-[3px] font-semibold">
          OUR STORY
        </p>
        <h1 className="text-navy font-light text-6xl sm:text-7xl !leading-tight tracking-[-2px] max-w-[900px] mx-auto">
          Building the Future
          <br />
          of AI Creation
        </h1>
        <p className="text-charcoal font-light text-xl leading-relaxed max-w-[740px] mx-auto mt-8">
          We believe the best ideas shouldn't require technical expertise to become reality. Lumivex is our mission to democratize AI creation—making intelligent automation accessible to everyone.
        </p>
      </div>
    </section>
  );
}
