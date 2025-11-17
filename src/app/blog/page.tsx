import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BlogHero } from "@/components/sections/blog/hero";
import { PostListings } from "@/components/sections/blog/post-listings";
import { NewsletterSignup } from "@/components/sections/blog/newsletter-signup";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <BlogHero />
        <PostListings />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}