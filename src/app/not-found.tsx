import type { Metadata } from "next";
import { PageMain } from "@/components/layout/PageMain";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist. Browse our trips and destinations, or contact the Suman Holidays office in Vadodara.",
};

/** 404 for unmatched URLs and unknown trip slugs. */
export default function NotFound() {
  return (
    <PageMain>
      <Container className="py-20 md:py-28">
        <h1 className="text-page">Page not found</h1>
        <p className="mt-4 max-w-[34rem] text-lead text-body">
          The page you were looking for has moved or never existed. Try one of our trips, or tell us where you want to go.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/trips">Browse trips</Button>
          <Button href="/destinations" variant="outline">
            See destinations
          </Button>
        </div>
      </Container>
    </PageMain>
  );
}
