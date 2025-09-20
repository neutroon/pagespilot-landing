// Optional: Custom analytics configuration
import { track } from "@vercel/analytics";

// Custom event tracking functions
export const trackWaitlistSignup = (email: string, locale: string) => {
  track("waitlist_signup", {
    email_domain: email.split("@")[1],
    locale,
  });
};

export const trackLanguageSwitch = (from: string, to: string) => {
  track("language_switch", {
    from_locale: from,
    to_locale: to,
  });
};

export const trackFeatureInteraction = (feature: string, locale: string) => {
  track("feature_interaction", {
    feature_name: feature,
    locale,
  });
};
