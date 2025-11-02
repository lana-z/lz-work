"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type CommandOutput =
  | { type: "text"; content: string }
  | { type: "link"; content: string; href: string }
  | { type: "project"; name: string; description: string; href?: string };

type CommandBlock = {
  prompt: string;
  command: string;
  output?: CommandOutput[];
};

const PY_VERSION = "3.13";
const INITIAL_PROMPT = `~(work:main) [py:${PY_VERSION}] $`;
const LZ_PROMPT = `~/code/lz (main) [py:${PY_VERSION}] $`;
const WORK_PROMPT = `~/code/lz/work (main) [py:${PY_VERSION}] $`;

type Project = {
  name: string;
  description: string;
  href?: string;
};

const CURRENT_PROJECTS: Project[] = [
  {
    name: "Applied AI/ML Pilot",
    description:
      "Developing and delivering a six month bootcamp applied AI/ML curriculum for Jordanian CS and EE university grads in partnership with the Crown Prince Foundation’s Future Skills Fund and Istidama Consulting.",
  },
  {
    name: "Rooftop Platform",
    description:
      "Building a custom AI enabled platform for Rooftop Global, a women’s emerging tech and investment community.",
  },
  {
    name: "Teaching Assistant Agent",
    description:
      "Exploring agent frameworks and architectures for an agentic TA system, grading and mentoring bootcamp students via GitHub PRs.",
  },
  {
    name: "Section",
    description:
      "Leading Section AI School enterprise prompt engineering sessions and CEO AI cohorts.",
  },
  {
    name: "Guzakuza",
    description:
      "Designing and delivering prompt engineering + AI workflow modules for women agri-business founders through Guzakuza’s Ignite Accelerator.",
  },
];

const PAST_PROJECTS: Project[] = [
  {
    name: "HeyDev",
    description:
      "Led a team of five devs to design and build a multi-agent DevRel productivity system with blog content from GitHub changelogs, community sentiment analysis, and daily recommended actions.",
  },
  {
    name: "Tradesy",
    description:
      "Prototyped an agentic solution connecting early-career job seekers with trade professions.",
  },
  {
    name: "Kimchi Token",
    description:
      "Designed and built kimchitoken.com and Telegram community integrations for KTZ blockchain token launch.",
  },
  {
    name: "PR Council",
    description:
      "Led AI readiness training for PR Council agencies covering automation, ethics, and client enablement.",
  },
  {
    name: "AB InBev",
    description:
      "Delivered training on advanced AI concepts for AB InBev Distribution Managers across the Americas and Europe.",
  },
];

const FOR_FUN_PROJECTS: Project[] = [
  {
    name: "AI Journal",
    description:
      "Personal project documenting my learning journey and experiments with new releases.",
  },
  {
    name: "Oh, Kale No!",
    description: "Mental health check-in companion with AI chat and daily forward-momentum prompts.",
    href: "https://ohkaleno.xyz/",
  },
  {
    name: "Mountain House Meal Planner",
    description: "Agent that parses grocery receipts, checks Seattle weather, and suggests dinner recipes.",
  },
  {
    name: "Fitness Trainer Agent",
    description: "Prototype agent generating adaptive workouts, habit nudges, and progress summaries from wearable data and check-ins.",
  },
  {
    name: "Donut Dashboard",
    description: "Dashboard and gamification of open source dev community contributions.",
  },
  {
    name: "Running",
    description: "Training for my 10th full marathon.",
  },
  {
    name: "Baking",
    description: "Foodie, baking pumpkin scones and many yummy seasonal favorites.",
  },
];

const SPEAKING_SECTIONS = [
  {
    title: "Major conferences I've spoken at:",
    lines: ["SXSW", "Rise of the Rest", "InBIA", "Global Accelerator Network", "Global Entrepreneurship Congress", "VentureWell"],
  },
  {
    title: "Technical meetups and events I've given a talk or demoed at:",
    lines: ["AI Tinkerers", "PuPPy (Puget Sound Programming Python)", "Seattle Tech Week", "AI2"],
  },
];

const COMMUNITY_SECTIONS = [
  {
    title: "Puget Sound Python:",
    lines: ["Create the fundraising strategy for PuPPy's 2026 sponsorship campaign and lead implementation in Q4 2025."],
  },
  {
    title: "Girls Code Lincoln:",
    lines: ["Founder and board member of Girls Code Lincoln (501c3) serving 1000+ girls in tech since 2016."],
  },
  {
    title: "Fueling the Future of Female-Founded Innovation:",
    lines: ["Hosting workshops to support female-founded startups and women investors in Seattle with partners at Wells Fargo, Boeing Ventures, E8, M12, First Row Partners, and Generationship."],
  },
];

const HELP_LINES = [
  "just introduce",
  "just contact",
  "just social",
  "just projects [--current] [--past] [--limit N]",
  "just speaking",
  "just community",
  "just forfun",
  "just education",
  "just help",
];

function projectOutputs(projects: Project[], limit?: number): CommandOutput[] {
  const max = typeof limit === "number" && !Number.isNaN(limit) ? Math.max(limit, 0) : undefined;
  const list = typeof max === "number" ? projects.slice(0, max) : projects;
  const entries: CommandOutput[] = [];
  list.forEach((project) => {
    entries.push({ type: "text", content: `${project.name}:` });
    entries.push({ type: "text", content: `  ${project.description}` });
    if (project.href) {
      entries.push({ type: "link", content: abbreviateUrl(project.href), href: project.href });
    }
  });
  return entries;
}

function sectionOutputs(sections: { title: string; lines: string[] }[]): CommandOutput[] {
  const entries: CommandOutput[] = [];
  sections.forEach((section) => {
    entries.push({ type: "text", content: section.title });
    section.lines.forEach((line) => entries.push({ type: "text", content: `  ${line}` }));
  });
  return entries;
}

function abbreviateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getCommandOutput(command: string): CommandOutput[] | undefined {
  const normalized = command.trim().toLowerCase();

  if (normalized.startsWith("just projects")) {
    const usePast = normalized.includes("--past");
    const useCurrent = normalized.includes("--current");
    const limitMatch = normalized.match(/--limit\s+(\d+)/);
    const limit = limitMatch ? Number.parseInt(limitMatch[1], 10) : undefined;

    let projects: Project[];
    if (usePast) {
      projects = PAST_PROJECTS;
    } else if (useCurrent) {
      projects = CURRENT_PROJECTS;
    } else {
      // No flag means show all: current first, then past
      projects = [...CURRENT_PROJECTS, ...PAST_PROJECTS];
    }

    return projectOutputs(projects, limit);
  }

  switch (normalized) {
    case "just introduce":
      return [
        {
          type: "text",
          content:
            "Hey there, I’m Lana Zumbrunn, an AI engineer shipping agent systems, workflow optimizations, and technical upskilling curriculum.",
        },
      ];
    case "just contact":
      return [
        { type: "link", content: "lana@levelupeconomy.com", href: "mailto:lana@levelupeconomy.com" },
      ];
    case "just social":
      return [
        { type: "link", content: "x.com/lan_azk", href: "https://x.com/lan_azk" },
        { type: "link", content: "linkedin.com/in/lanazumbrunn", href: "https://linkedin.com/in/lanazumbrunn" },
      ];
    case "just education":
      return [
        { type: "text", content: "University of Nebraska: Bachelor of Arts in Communication Studies and Poli Sci" },
        { type: "text", content: "Code Fellows: Certificate of Advanced Software Development in Python" },
        { type: "text", content: "Business Retention & Expansion International: Certified Consultant" },
        { type: "text", content: "Cloud Security Alliance: Trusted AI Safety Expert (in progress)" },
      ];
    case "just background":
      return [
        {
          type: "text",
          content: "AI engineer + technical leader building agent platforms, automation workflows, and upskilling programs.",
        },
        { type: "text", content: "Former strategy + ops leader (public-private partnerships, venture, community programming)." },
        { type: "text", content: "Organizer/member: AI Tinkerers, PuPPy (Seattle Python), TechWell AI Con." },
      ];
    case "just speaking":
      return sectionOutputs(SPEAKING_SECTIONS);
    case "just community":
      return sectionOutputs(COMMUNITY_SECTIONS);
    case "just forfun":
      return projectOutputs(FOR_FUN_PROJECTS);
    case "just help":
      return HELP_LINES.map((line) => ({ type: "text" as const, content: line }));
    default:
      return undefined;
  }
}

function createEntry(prompt: string, command: string): CommandBlock {
  return { prompt, command, output: getCommandOutput(command) };
}

const INITIAL_HISTORY: CommandBlock[] = [
  { prompt: INITIAL_PROMPT, command: "cd ~/code/lz" },
  { prompt: LZ_PROMPT, command: "cd work" },
  createEntry(WORK_PROMPT, "just introduce"),
  createEntry(WORK_PROMPT, "just projects --current --limit 3"),
  createEntry(WORK_PROMPT, "just contact"),
];

export default function Home() {
  const [history, setHistory] = useState<CommandBlock[]>(INITIAL_HISTORY);
  const [inputValue, setInputValue] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasInteracted) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, hasInteracted]);

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const output = getCommandOutput(trimmed) ?? [
      { type: "text", content: "Command not found. Try: 'just help'." },
    ];

    setHasInteracted(true);
    setHistory((prev) => [...prev, { prompt: WORK_PROMPT, command: trimmed, output }]);
    setInputValue("");
  };

  const focusInput = () => {
    setHasInteracted(true);
    inputRef.current?.focus();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommand(inputValue);
    }
  };

  return (
    <main
      className="min-h-screen px-4 py-16 sm:px-6 lg:px-8"
      onClick={focusInput}
    >
      <div className="mx-auto w-full max-w-3xl font-mono text-[15px] leading-7 text-foreground sm:text-base">
        {history.map((block, index) => (
          <div key={`${block.prompt}-${block.command}-${index}`} className="mb-2">
            <p className="m-0">
              <span className="text-prompt">{block.prompt}</span>{" "}
              <span>{block.command}</span>
            </p>
            {block.output && (
              <div className="mt-1 text-foreground-output">
                {block.output.map((line, lineIndex) => {
                  if (line.type === "text") {
                    return (
                      <p key={`${line.content}-${lineIndex}`} className="m-0">
                        {line.content}
                      </p>
                    );
                  }

                  if (line.type === "link") {
                    return (
                      <p key={`${line.content}-${lineIndex}`} className="m-0">
                        <Link href={line.href} className="transition hover:text-prompt">
                          {line.content}
                        </Link>
                      </p>
                    );
                  }

                  return (
                    <p key={`${line.name}-${lineIndex}`} className="m-0">
                      {line.name}: {line.description}
                      {line.href && (
                        <>
                          {" "}
                          <Link href={line.href} className="transition hover:text-prompt">
                            {abbreviateUrl(line.href)}
                          </Link>
                        </>
                      )}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div className="mb-2">
          <p className="m-0">
            <span className="text-prompt">{WORK_PROMPT}</span>{" "}
            <span>{inputValue}</span>
            <span className="blink text-prompt" aria-hidden>
              █
            </span>
          </p>
        </div>

        <div ref={endRef} />

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setHasInteracted(true)}
          className="fixed left-[-9999px] top-0 h-0 w-0 opacity-0"
          aria-label="CLI command input"
        />
      </div>
    </main>
  );
}
