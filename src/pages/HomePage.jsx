import React from "react";
import AmazonBanner from "../components/AmazonBanner";
import CArmPartnerBanner from "../components/CArmPartnerBanner";
import FeaturedAcademiesSection from "../components/FeaturedAcademiesSection";
import HeroSection from "../components/HeroSection";
import QuickPracticeSection from "../components/QuickPracticeSection";

export default function HomePage({
  isSmallScreen,
  jumpToPracticeCategory,
  trackSiteEvent,
  showCarmPartner,
  currentStudyGearPick,
  currentStudyGearPickIndex,
  setCurrentStudyGearPickIndex,
  studyGearPicks,
  setMode,
  setSelectedSet
}) {
  return (
    <>
      <HeroSection
        isSmallScreen={isSmallScreen}
        jumpToPracticeCategory={jumpToPracticeCategory}
      />

      {showCarmPartner && (
        <CArmPartnerBanner
          trackSiteEvent={trackSiteEvent}
          isSmallScreen={isSmallScreen}
        />
      )}

      <AmazonBanner
        currentStudyGearPick={currentStudyGearPick}
        currentStudyGearPickIndex={currentStudyGearPickIndex}
        setCurrentStudyGearPickIndex={setCurrentStudyGearPickIndex}
        studyGearPicks={studyGearPicks}
        trackSiteEvent={trackSiteEvent}
        isSmallScreen={isSmallScreen}
      />

      <FeaturedAcademiesSection
        isSmallScreen={isSmallScreen}
        trackSiteEvent={trackSiteEvent}
      />

      <QuickPracticeSection
        isSmallScreen={isSmallScreen}
        jumpToPracticeCategory={jumpToPracticeCategory}
        setMode={setMode}
        setSelectedSet={setSelectedSet}
        trackSiteEvent={trackSiteEvent}
      />
    </>
  );
}
