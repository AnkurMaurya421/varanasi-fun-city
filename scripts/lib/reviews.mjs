// Pure review logic: what to feature on the site, and what (if anything) to reply.
import { siteConfig } from "../../siteConfig.js";

const STAR = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
export const starsOf = (review) => STAR[review.starRating] || 0;

// Google adds "(Translated by Google) ... (Original) ..." to non-English reviews.
export function originalText(comment = "") {
  const parts = comment.split("(Original)");
  if (parts.length > 1) return parts[parts.length - 1].trim();
  return comment.replace("(Translated by Google)", "").trim();
}

// Anything that sounds like a complaint, suggestion or sensitive issue goes to a human, never a template.
const EN_FLAGS = /\b(but|however|although|not|never|worst|bad|poor|rude|dirty|unclean|filthy|expensive|costly|overpriced|waste|problems?|issues?|complain\w*|cheat\w*|fraud|scam|refund|injur\w*|hurt|unsafe|danger\w*|accident|closed|disappoint\w*|horrible|terrible|pathetic|disgusting|misbehav\w*|harass\w*|stole\w*|theft|broken|hygiene|smell\w*|stink\w*|overcrowd\w*|wish|should)\b/i;
const HI_FLAGS = [
  "नहीं", "लेकिन", "परंतु", "मगर", "खराब", "गंदा", "गंदी", "महंगा", "महंगी", "धोखा", "शिकायत", "चोट", "बंद", "बेकार", "घटिया", "बकवास",
  "nahi", "nahin", "lekin", "magar", "kharab", "ganda", "gandi", "mehnga", "mehngi", "dhokha", "bekar", "bakwas", "ghatiya", "shikayat",
];

export function flagged(text = "") {
  const en = text.match(EN_FLAGS);
  if (en) return en[0];
  const lower = text.toLowerCase();
  return HI_FLAGS.find((w) => lower.includes(w)) || null;
}

const isHindi = (text) => /[ऀ-ॿ]/.test(text);

function firstName(review) {
  const name = review.reviewer?.isAnonymous ? "" : (review.reviewer?.displayName || "").trim();
  const first = name.split(/\s+/)[0] || "";
  return /^[\p{L}]{2,20}$/u.test(first) ? first : null;
}

function hash(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

const SIGN = "— Team Varanasi Fun City";
const SIGN_HI = "— टीम वाराणसी फन सिटी";
const hi = (n) => (n ? `Hi ${n}! ` : "");
const hiHindi = (n) => (n ? `${n} जी, ` : "");
const phone = siteConfig.contact.phone;

const EN5 = [
  (n) => `${hi(n)}Thank you so much for the wonderful review and the 5 stars! We're delighted you enjoyed Varanasi Fun City and can't wait to welcome you again. ${SIGN}`,
  (n) => `${hi(n)}Thanks a lot for taking the time to review us. Words like yours make our team's day! Looking forward to your next visit. ${SIGN}`,
  (n) => `${hi(n)}We really appreciate your kind words! It's great to know you had a good time with us. Hope to see you and your family and friends back soon. ${SIGN}`,
  (n) => `${hi(n)}Thank you for the 5-star review! Happy to hear you enjoyed your visit, and we hope to see you again very soon. ${SIGN}`,
  (n) => `${hi(n)}Your feedback means a lot to us. Thank you for choosing Varanasi Fun City and for sharing your experience. See you again! ${SIGN}`,
  (n) => `${hi(n)}Thank you so much! We're glad you had a great time. Come back and celebrate with us again soon! ${SIGN}`,
];
const EN4 = [
  (n) => `${hi(n)}Thank you for the 4 stars and the kind feedback! We're glad you enjoyed your visit. If there's anything we could do better, please call us on ${phone}. ${SIGN}`,
  (n) => `${hi(n)}Thanks for reviewing us! We're happy you had a good time at Varanasi Fun City, and we're always working to make each visit even better. ${SIGN}`,
  (n) => `${hi(n)}We appreciate your 4-star review. Hope to see you again soon, and if you have suggestions, we'd love to hear them on ${phone}. ${SIGN}`,
];
const HI5 = [
  (n) => `${hiHindi(n)}आपके खूबसूरत रिव्यू और 5 स्टार के लिए बहुत-बहुत धन्यवाद! हमें खुशी है कि आपको वाराणसी फन सिटी में अच्छा लगा। जल्द ही फिर मिलेंगे! ${SIGN_HI}`,
  (n) => `${hiHindi(n)}रिव्यू देने के लिए समय निकालने का शुक्रिया! आप जैसे मेहमानों की बातें हमारी टीम का हौसला बढ़ाती हैं। अगली बार फिर आइए। ${SIGN_HI}`,
  (n) => `${hiHindi(n)}आपके अच्छे शब्दों के लिए दिल से धन्यवाद! यह जानकर बहुत अच्छा लगा कि आपका अनुभव शानदार रहा। हमें फिर से सेवा का मौका दीजिए। ${SIGN_HI}`,
  (n) => `${hiHindi(n)}वाराणसी फन सिटी को चुनने और अपना अनुभव साझा करने के लिए धन्यवाद! आपकी राय हमारे लिए बहुत मायने रखती है। फिर मिलेंगे! ${SIGN_HI}`,
];
const HI4 = [
  (n) => `${hiHindi(n)}4 स्टार और अच्छे फीडबैक के लिए धन्यवाद! हमें खुशी है कि आपको वाराणसी फन सिटी में अच्छा लगा। कुछ और बेहतर कर सकें तो कृपया ${phone} पर बताइए। ${SIGN_HI}`,
  (n) => `${hiHindi(n)}रिव्यू देने के लिए शुक्रिया! हम हर बार अनुभव को और बेहतर बनाने की कोशिश करते हैं। जल्द ही फिर मिलेंगे। ${SIGN_HI}`,
];

// Returns { action: "reply" | "hold" | "skip", reason, comment? }
export function decide(review, { minStars = 4 } = {}) {
  if (review.reviewReply?.comment || review.reviewReply?.reviewReplyState) {
    return { action: "skip", reason: "already replied" };
  }
  const stars = starsOf(review);
  if (stars < minStars) return { action: "hold", reason: `${stars}-star review needs a personal reply` };

  const text = originalText(review.comment || "");
  const flag = text ? flagged(text) : null;
  if (flag) return { action: "hold", reason: `mentions "${flag}"` };

  const hindi = isHindi(text);
  const list = hindi ? (stars >= 5 ? HI5 : HI4) : (stars >= 5 ? EN5 : EN4);
  const comment = list[hash(review.reviewId || review.name || "") % list.length](firstName(review));
  return { action: "reply", reason: hindi ? "hindi" : "english", comment };
}

// Reviews worth showing on the homepage: recent, named, positive, readable.
export function pickFeatured(reviews, { limit = 6 } = {}) {
  return reviews
    .filter((r) => starsOf(r) >= 4 && !r.reviewer?.isAnonymous && r.reviewer?.displayName)
    .map((r) => ({ r, text: originalText(r.comment || "") }))
    .filter(({ text }) => text.length >= 40 && text.length <= 500 && !flagged(text))
    .sort((a, b) => new Date(b.r.createTime) - new Date(a.r.createTime))
    .slice(0, limit)
    .map(({ r, text }) => ({
      id: r.reviewId,
      name: r.reviewer.displayName.trim(),
      stars: starsOf(r),
      text,
      date: r.createTime,
    }));
}
