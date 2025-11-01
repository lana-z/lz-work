import Link from "next/link";

type CommandOutput =
  | { type: "text"; content: string }
  | { type: "link"; content: string; href: string }
  | { type: "project"; name: string; description: string; href?: string };

type CommandBlock = {
  prompt: string;
  command?: string;
  output?: CommandOutput[];
};

function abbreviateUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Home() {
  const commandSequence: CommandBlock[] = [
    { prompt: "~(work:main) [py:3.11] $", command: "cd ~/code/lz" },
    { prompt: "~/code/lz (main) [py:3.11] $", command: "cd work" },
    {
      prompt: "~/code/lz/work (main) [py:3.11] $",
      command: "just introduce",
      output: [
        {
          type: "text",
          content:
            "Hey there, I\u2019m Lana Zumbrunn, an AI engineer and technical leader shipping agent systems, workflow optimizations, and technical upskilling curriculum.",
        },
      ],
    },
    {
      prompt: "~/code/lz/work (main) [py:3.11] $",
      command: "just projects --current --limit 3",
      output: [
        {
          type: "project",
          name: "Applied AI/ML Pilot",
          description:
            "Development and delivery of Applied AI/ML curriculum for Jordanian CS and EE university grads in partnership with the Crown Price Foundation\u2019s Future Skills Fund and Istidama Consulting.",
          // href: "https://www.linkedin.com/posts/futureskillsfundjo_aispire-is-now-accepting-applications-from-activity-7385669034551443456-ypv2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAADgXtkB-FVY8Y_rcPgHiPVOOtMLFQFzACc",
        },
        {
          type: "project",
          name: "Rooftop Platform",
          description:
            "Building a custom AI enabled platform for Rooftop Global, a women\u2019s emerging tech and investment community.",
          // href: "https://rooftop.global/",
        },
        {
          type: "project",
          name: "AI Journal",
          description:
            "Personal project documenting my learning journey and experiments with new releases.",
          // href: "https://add-ai-journal-link",
        },
      ],
    },
    {
      prompt: "~/code/lz/work (main) [py:3.11] $",
      command: "just contact",
      output: [
        { type: "link", content: "lana@levelupeconomy.com", href: "mailto:lana@levelupeconomy.com" },
        { type: "link", content: "lana@rooftop.global", href: "mailto:lana@rooftop.global" },
      ],
    },
    { prompt: "~/code/lz/work (main) [py:3.11] $" },
  ];

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl font-mono text-[15px] leading-7 text-foreground sm:text-base">
        {commandSequence.map((block, index) => (
          <div key={`${block.prompt}-${block.command ?? "prompt"}-${index}`} className="mb-2">
            <p className="m-0">
              <span className="text-prompt">{block.prompt}</span>
              {block.command ? (
                <>
                  {" "}
                  <span>{block.command}</span>
                </>
              ) : (
                <>
                  {" "}
                  <span className="blink text-prompt" aria-hidden>
                    █
                  </span>
                </>
              )}
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
      </div>
    </main>
  );
}
