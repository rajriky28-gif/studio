import { WaitlistForm } from '@/components/waitlist-form';

export function SignupFormSection() {
  return (
    <section id="waitlist-form" className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Reserve Your Spot
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            Join the waitlist now. It takes 30 seconds and could save you months of manual work later.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
