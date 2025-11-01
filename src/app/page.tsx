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

const KNOWN_COMMANDS = [
  "just introduce",
  "just projects",
  "just projects --current",
  "just projects --current --limit 3",
  "just projects --past",
  "just contact",
  "just social",
  "just education",
  "just background",
  "just speaking",
  "just hackathon",
  "just forfun",
  "just help",
] as const;

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

  switch (normalized) {
    case "just introduce":
      return [
        {
          type: "text",
          content:
            "Hey there, I’m Lana Zumbrunn, an AI engineer and technical leader shipping agent systems, workflow optimizations, and technical upskilling curriculum.",
        },
      ];
    case "just projects --current --limit 3":
      return [
        {
          type: "project",
          name: "Applied AI/ML Pilot",
          description:
            "Development and delivery of Applied AI/ML curriculum for Jordanian CS and EE university grads in partnership with the Crown Prince Foundation’s Future Skills Fund and Istidama Consulting.",
          // href: "https://www.linkedin.com/posts/futureskillsfundjo_aispire-is-now-accepting-applications-from-activity-7385669034551443456-ypv2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADgXtkB-FVY8Y_rcPgHiPVOOtMLFQFzACc",
        },
        {
          type: "project",
          name: "Rooftop Platform",
          description:
            "Building a custom AI enabled platform for Rooftop Global, a women’s emerging tech and investment community.",
          // href: "https://rooftop.global/",
        },
        {
          type: "project",
          name: "AI Journal",
          description:
            "Personal project documenting my learning journey and experiments with new releases.",
          // href: "https://add-ai-journal-link",
        },
      ];
    case "just projects --current":
      return [
        {
          type: "project",
          name: "Applied AI/ML Pilot",
          description:
            "Development and delivery of Applied AI/ML curriculum for Jordanian CS and EE university grads in partnership with the Crown Prince Foundation’s Future Skills Fund and Istidama Consulting.",
        },
        {
          type: "project",
          name: "Guzakuza AI Training",
          description:
            "Designing AI training modules for women-led agri-business founders through Guzakuza’s AISP program.",
        },
        {
          type: "project",
          name: "Section Advanced Prompt Training",
          description:
            "Leading Section School cohorts on advanced prompt design, agent workflows, and evaluation systems.",
        },
        {
          type: "project",
          name: "Rooftop Platform",
          description:
            "Building a custom AI enabled platform for Rooftop Global, a women’s emerging tech and investment community.",
        },
        {
          type: "project",
          name: "AI Journal",
          description:
            "Personal project documenting my learning journey and experiments with new releases.",
        },
        {
          type: "project",
          name: "AI Leads",
          description:
            "Outbound AI agent that researches prospects, enriches context, and drafts channel-specific outreach.",
        },
      ];

    case "just projects":
      return [
        {
          type: "project",
          name: "Applied AI/ML Pilot",
          description:
            "Development and delivery of Applied AI/ML curriculum for Jordanian CS and EE university grads in partnership with the Crown Prince Foundation’s Future Skills Fund and Istidama Consulting.",
        },
        {
          type: "project",
          name: "Rooftop Platform",
          description:
            "Building a custom AI enabled platform for Rooftop Global, a women’s emerging tech and investment community.",
        },
        {
          type: "project",
          name: "AI Journal",
          description:
            "Personal project documenting my learning journey and experiments with new releases.",
        },
        {
          type: "project",
          name: "AI Leads",
          description: "Outbound AI agent that researches prospects, enriches context, and drafts tailored outreach for sales teams.",
        },
      ];
    case "just projects --past":
      return [
        {
          type: "project",
          name: "Kimchi Token",
          description:
            "Designed and built kimchitoken.com and Telegram community integrations for KTZ blockchain token launch.",
        },
        {
          type: "project",
          name: "Guzakuza AI Optimization",
          description:
            "Designed and delivered AI fundamentals + workflow design modules for women agri-business founders in Africa in partnership with Guzakuza's Ignite accelerator.",
        },
        {
          type: "project",
          name: "Section Advanced Prompt Engineering",
          description:
            "Developed enterprise prompt engineering curriculum and live cohort facilitation for Section AI School.",
        },
        {
          type: "project",
          name: "PR Council AI Readiness",
          description:
            "Led AI readiness training for PR Council agencies covering automation, ethics, and client enablement.",
        },
        {
          type: "project",
          name: "AB InBev Ops",
          description:
            "Consulted on AI enablement across the Americas and Europe for AB InBev Distribution Managers.",
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
        { type: "text", content: "Business Retention & Expansion International: Certified Consultant (BREP)" },
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
      return [
        { type: "text", content: "Major conferences:" },
        { type: "text", content: "  SXSW, Rise of the Rest, InBIA, Global Accelerator Network, Global Entrepreneurship Congress, VentureWell" },
        { type: "text", content: "" },
        { type: "text", content: "Technical talks and demos:" },
        { type: "text", content: "  AI Tinkerers, PuPPy (Puget Sound Programming Python), Fueling the Future of Female-Founded Innovation, Seattle Tech Week, AI2" },
      ];
    case "just hackathon":
      return [
        {
          type: "text",
          content: "AI Tinkerers Agents Hackathon, 2nd place: Built a multi-agent system for DevRel productivity including GitHub changelog to content, community sentiment analysis, and daily recommended actions, receiving a top rank AI Tinkerers Seattle hackathon in 2025; Invited to pitch at AI2.",
        },
        {
          type: "text",
          content: "Seattle Hackathon for Public Good, Most Impact award: Built an agentic system for early career job-seekers to get connected with trade professions and increase their relevant experience.",
        },
      ];
    case "just forfun":
      return [
        { type: "text", content: "Experiments and side projects:" },
        { type: "link", content: "Oh, Kale No!: A mental health check-in with AI chat: ohkaleno.xyz", href: "https://ohkaleno.xyz/" },
        {
          type: "project",
          name: "Mountain House Meal Planner",
          description:
            "Household agent that parses grocery receipts, checks Seattle weather, and generates adaptive dinner plans.",
        },
        {
          type: "project",
          name: "Fitness Trainer Agent",
          description:
            "Personal agent generating workout plans, nudges, and more from Apple Fitness and other iOS app data with daily check-ins.",
        },
        {
          type: "project",
          name: "Donut Dashboard",
          description:
            " Gamification of open source dev community contributions.",
        },
      ];
    case "just help":
      return [
        { type: "text", content: "Available commands:" },
        ...KNOWN_COMMANDS.map((cmd) => ({ type: "text" as const, content: `  ${cmd}` })),
      ];
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
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const output = getCommandOutput(trimmed) ?? [
      { type: "text", content: "Command not found. Try just help." },
    ];

    setHistory((prev) => [...prev, { prompt: WORK_PROMPT, command: trimmed, output }]);
    setInputValue("");
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
      onClick={() => inputRef.current?.focus()}
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
            <span>{inputValue}</span>{" "}
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
          className="fixed left-[-9999px] top-0 h-0 w-0 opacity-0"
          aria-label="CLI command input"
        />
      </div>
    </main>
  );
}
