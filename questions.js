// Every question. "age" = how old that answer "feels" (used for the mind age).
// Questions with noAge:true are opinion questions: they count for the class
// stats but not for the mind age.
const QUESTIONS = [
  { id: "gen", q: "First things first: when were you born?", noAge: true, options: [
    { t: "Before 1997 (hi Dr. 👋)" },
    { t: "1997 – 1999" },
    { t: "2000 – 2003" },
    { t: "2004 – 2008" },
    { t: "2009 – 2012" }
  ]},
  { id: "fine", q: "Your friend texts “I'm fine.” What do you do?", options: [
    { t: "Believe them. They said fine.", age: 52 },
    { t: "“fine fine or FINE fine?”", age: 21 },
    { t: "Send a meme to check the vibe, then ask", age: 18 },
    { t: "Call them right away", age: 46 }
  ]},
  { id: "hurt", q: "Someone says something that hurts you. You…", options: [
    { t: "Say “haha jk” and think about it for 3 days", age: 20 },
    { t: "Tell them directly, on the spot", age: 48 },
    { t: "Let it go, life's short", age: 58 },
    { t: "Post a vague story about it", age: 16 }
  ]},
  { id: "joke", q: "How often do you say something serious… as a joke?", options: [
    { t: "Always. It's my love language", age: 17 },
    { t: "Often", age: 22 },
    { t: "Rarely", age: 38 },
    { t: "Never, serious is serious", age: 55 }
  ]},
  { id: "send", q: "Before sending an important message, you…", options: [
    { t: "Type it and send it", age: 55 },
    { t: "Reread it 2–3 times", age: 34 },
    { t: "Draft in Notes, ask a friend, delete, rewrite", age: 20 },
    { t: "Send a 4-minute voice note instead", age: 24 }
  ]},
  { id: "call", q: "Your phone rings. Unknown number.", options: [
    { t: "“Allo?” Obviously I answer", age: 60 },
    { t: "Let it ring, then google the number", age: 21 },
    { t: "Decline + text “who's this?”", age: 18 },
    { t: "Answer only if I'm expecting a call", age: 36 }
  ]},
  { id: "overthink", q: "Be honest: how much do you overthink things you never say out loud?", noAge: true, options: [
    { t: "Constantly" },
    { t: "A lot" },
    { t: "Sometimes" },
    { t: "Almost never" }
  ]},
  { id: "stubborn", q: "When older people call our generation “stubborn”…", options: [
    { t: "Honestly, it's fair", age: 50 },
    { t: "We're not stubborn, we just want to be heard", age: 22 },
    { t: "We explain, nobody listens, so we stop explaining", age: 20 },
    { t: "Don't care tbh", age: 16 }
  ]},
  { id: "heard", q: "Do you feel heard by older generations (parents, profs, bosses)?", noAge: true, options: [
    { t: "Yes, most of the time" },
    { t: "Sometimes" },
    { t: "Rarely" },
    { t: "Never" }
  ]},
  { id: "care", q: "How do you show someone you care?", options: [
    { t: "Sending them reels that remind me of them", age: 18 },
    { t: "Quietly doing things for them", age: 42 },
    { t: "Saying it directly", age: 47 },
    { t: "Remembering tiny details they said once", age: 26 }
  ]},
  { id: "friday", q: "Your ideal Friday night:", options: [
    { t: "Dinner, then bed by 10", age: 62 },
    { t: "Out with friends until 3 am", age: 22 },
    { t: "Gaming / Discord all night", age: 18 },
    { t: "Bed rotting with my phone", age: 19 }
  ]},
  { id: "misunderstood", q: "What do older generations misunderstand most about us?", noAge: true, options: [
    { t: "Our humor" },
    { t: "Our mental health" },
    { t: "Our relationship with phones" },
    { t: "Our work ethic" }
  ]}
];

// Short descriptions for each birth-year group (the "gen" question).
const GENS = [
  { name: "Millennial or older", emoji: "🧭",
    desc: "Honorary member of the class today. Thanks for playing!" },
  { name: "The Zillennials (1997–99)", emoji: "📼",
    desc: "Officially Gen Z, but half millennial: you remember life before smartphones." },
  { name: "The Bridge (2000–03)", emoji: "🌉",
    desc: "A bit of both worlds: millennial memories, Gen Z humor." },
  { name: "Core Gen Z (2004–08)", emoji: "📱",
    desc: "Phones and social media for most of your childhood. The “real” Gen Z." },
  { name: "Gen Z × Alpha (2009–12)", emoji: "🧩",
    desc: "On the border: many researchers start Gen Alpha in 2010." }
];

// Mind-age result labels (checked top to bottom).
function mindAgeLabel(age) {
  if (age < 19) return { title: "Gen Alpha energy", emoji: "🍼", line: "You were born holding an iPad. Respect." };
  if (age < 25) return { title: "Certified Gen Z", emoji: "💅", line: "“I'm kidding” (you were not kidding)." };
  if (age < 33) return { title: "Zillennial soul", emoji: "☕", line: "You send memes AND you answer calls. Rare." };
  if (age < 45) return { title: "Millennial at heart", emoji: "🥑", line: "Reliable, a little tired, still on Facebook." };
  return { title: "Wise elder mode", emoji: "📞", line: "You answer unknown numbers. Fearless." };
}

// Same calculation used by the quiz page and the results page.
function computeMindAge(answers) {
  let sum = 0, n = 0;
  QUESTIONS.forEach((qq, i) => {
    if (qq.noAge || answers[i] == null) return;
    sum += qq.options[answers[i]].age; n++;
  });
  return n ? Math.round(sum / n) : 0;
}
