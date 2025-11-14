import Link from "next/link";

export function ContactHero() {
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
          <span>Contact</span>
        </div>
        <p className="mb-5 text-ocean text-xs uppercase tracking-[3px] font-semibold">
          GET IN TOUCH
        </p>
        <h1 className="text-navy font-light text-6xl sm:text-7xl !leading-tight tracking-[-2px] max-w-[900px] mx-auto">
          Let's Connect
        </h1>
        <p className="text-charcoal font-light text-xl leading-relaxed max-w-[740px] mx-auto mt-8">
          Have questions about Lumivex? Want to partner with us? Or just want to say hello? We'd love to hear from you.
        </p>
      </div>
    </section>
  );
}