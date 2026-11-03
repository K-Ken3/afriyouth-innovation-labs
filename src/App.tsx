import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageLoader } from "@/components/ui/PageLoader";
import HomePage from "@/pages/HomePage";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const WhatWeDoPage = lazy(() => import("@/pages/WhatWeDoPage"));
const ProgramsPage = lazy(() => import("@/pages/ProgramsPage"));
const InsightsPage = lazy(() => import("@/pages/InsightsPage"));
const InsightDetailPage = lazy(() => import("@/pages/InsightDetailPage"));
const ImpactPage = lazy(() => import("@/pages/ImpactPage"));
const GetInvolvedPage = lazy(() => import("@/pages/GetInvolvedPage"));
const PartnerWithUsPage = lazy(() => import("@/pages/PartnerWithUsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="what-we-do"
            element={
              <Suspense fallback={<PageLoader />}>
                <WhatWeDoPage />
              </Suspense>
            }
          />
          <Route
            path="programs"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProgramsPage />
              </Suspense>
            }
          />
          <Route
            path="insights"
            element={
              <Suspense fallback={<PageLoader />}>
                <InsightsPage />
              </Suspense>
            }
          />
          <Route
            path="insights/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <InsightDetailPage />
              </Suspense>
            }
          />
          <Route
            path="impact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ImpactPage />
              </Suspense>
            }
          />
          <Route
            path="get-involved"
            element={
              <Suspense fallback={<PageLoader />}>
                <GetInvolvedPage />
              </Suspense>
            }
          />
          <Route
            path="partner-with-us"
            element={
              <Suspense fallback={<PageLoader />}>
                <PartnerWithUsPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
