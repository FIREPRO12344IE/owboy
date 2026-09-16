import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import owBoyLogo from "@/assets/ow-boy-logo.png.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "After Hours — Private Access" },
      {
        name: "description",
        content: "Private access to After Hours, the exclusive new release from OW BOY.",
      },
      { property: "og:title", content: "After Hours — Private Access" },
      {
        property: "og:description",
        content: "Private access to After Hours, the exclusive new release from OW BOY.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "gate" | "welcome" | "drop";
type View = "drop" | "merch";

function Index() {
  const [stage, setStage] = useState<Stage>("gate");
  const [view, setView] = useState<View>("drop");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (stage !== "welcome") return;
    const timer = window.setTimeout(() => setStage("drop"), 2100);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const unlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim().toUpperCase() !== "AFTERDARK") {
      setError("That code isn't on the list.");
      return;
    }
    setError("");
    setStage("welcome");
  };

  if (stage === "gate") {
    return (
      <main className="film-grain relative flex min-h-dvh flex-col overflow-hidden bg-background px-5 py-6 sm:px-8">
        <header className="flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span>Private release</span>
          <span>001 / 2026</span>
        </header>

        <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-16">
          <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Invitation only
          </p>
          <h1 className="max-w-5xl font-display text-[clamp(3.35rem,15vw,10rem)] leading-[0.84] uppercase text-foreground">
            Enter<br />after<br />dark.
          </h1>

          <form onSubmit={unlock} className="mt-12 w-full max-w-md sm:mt-16" noValidate>
            <label
              htmlFor="access-code"
              className="mb-3 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Access code
            </label>
            <div className="flex border-b border-border focus-within:border-purple">
              <input
                id="access-code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError("");
                }}
                className="h-12 min-w-0 flex-1 bg-transparent text-sm font-semibold uppercase tracking-[0.16em] text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="ENTER CODE"
                autoComplete="off"
                autoCapitalize="characters"
                aria-describedby="access-note access-error"
              />
              <Button type="submit" variant="ghost" size="icon" aria-label="Enter private release">
                <ArrowRight />
              </Button>
            </div>
            <div className="mt-3 flex min-h-5 items-start justify-between gap-6 text-[0.62rem] uppercase tracking-[0.12em]">
              <p id="access-note" className="text-muted-foreground">Demo: AFTERDARK</p>
              <p id="access-error" role="alert" className="text-destructive">{error}</p>
            </div>
          </form>
        </section>

        <footer className="flex justify-between text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">
          <span>For your eyes only</span>
          <span>Lincoln</span>
        </footer>
      </main>
    );
  }

  if (stage === "welcome") {
    return (
      <main className="film-grain flex min-h-dvh items-center justify-center bg-background px-5 text-center">
        <div className="cinematic-reveal">
          <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Access granted
          </p>
          <h1 className="font-display text-[clamp(3.5rem,18vw,9rem)] leading-[0.85] uppercase">
            Welcome<br />inside.
          </h1>
          <div className="mx-auto mt-8 h-px w-16 bg-purple" />
        </div>
      </main>
    );
  }

  return (
    <main className="film-grain min-h-dvh bg-background">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/90 px-5 backdrop-blur-md sm:px-8">
        <Button
          type="button"
          onClick={() => setView("drop")}
          variant="ghost"
          className="h-auto rounded-none p-0 font-display text-sm uppercase text-foreground hover:bg-transparent"
        >
          A/H
        </Button>
        <nav aria-label="Release navigation" className="flex items-center gap-7">
          {(["drop", "merch"] as const).map((item) => (
            <Button
              key={item}
              type="button"
              onClick={() => setView(item)}
              variant="ghost"
              className={`relative py-2 text-[0.62rem] font-semibold uppercase tracking-[0.17em] transition-colors ${
                view === item ? "text-foreground" : "text-muted-foreground hover:bg-transparent hover:text-foreground"
              }`}
            >
              {item === "drop" ? "Exclusive" : "Merch"}
              {view === item && <span className="absolute inset-x-0 -bottom-1 h-px bg-purple" />}
            </Button>
          ))}
        </nav>
      </header>

      {view === "merch" ? (
        <section className="cinematic-reveal flex min-h-dvh flex-col items-center justify-center px-5 text-center">
          <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Private goods / 001
          </p>
          <h1 className="font-display text-[clamp(3.5rem,17vw,9rem)] leading-[0.86] uppercase">
            Coming<br />soon.
          </h1>
        </section>
      ) : (
        <section className="cinematic-reveal mx-auto grid min-h-dvh max-w-[1500px] grid-cols-1 pt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div className="relative min-h-[67svh] overflow-hidden lg:min-h-[calc(100dvh-4rem)]">
            <img
              src={coverArt}
              alt="Artist standing beneath a single spotlight in a dark studio"
              width={1280}
              height={1600}
              className="absolute inset-0 h-full w-full object-cover object-center grayscale"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent lg:hidden" />
            <p className="absolute bottom-5 left-5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-foreground/70 lg:bottom-8 lg:left-8">
              Original artwork / 2026
            </p>
          </div>

          <div className="flex flex-col justify-between px-5 pb-9 pt-7 sm:px-8 lg:px-14 lg:py-14">
            <div className="hidden justify-between text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:flex">
              <span>Exclusive release</span>
              <span>Track 01</span>
            </div>

            <div className="lg:py-12">
              <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                OW BOY
              </p>
              <h1 className="font-display text-[clamp(3.2rem,14vw,8.5rem)] leading-[0.82] uppercase lg:text-[clamp(4.5rem,7vw,8.5rem)]">
                After<br />Hours
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">
                A private transmission for the ones who stayed late enough to hear it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="label" size="label" onClick={() => setPlaying((value) => !value)}>
                  {playing ? <Pause /> : <Play />}
                  {playing ? "Pause" : "Listen now"}
                </Button>
                <Button variant="label-outline" size="label" asChild>
                  <a
                    href="https://open.spotify.com/artist/5l3tkuSSuqi6X1zGlSyIDX"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight />
                    Spotify
                  </a>
                </Button>
                <Button variant="label-outline" size="label" asChild>
                  <a href={coverArt} download="after-hours-artwork.jpg">
                    <ArrowDownToLine />
                    Download
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-12 border-t border-border pt-4 lg:mt-0">
              <div className="flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span>03:17</span>
                <span>{playing ? "Now playing" : "Private preview"}</span>
              </div>
              <div className="mt-3 h-px overflow-hidden bg-border">
                <div className={`h-full bg-gradient-to-r from-purple to-purple-glow ${playing ? "w-2/5 transition-all duration-[4000ms]" : "w-0"}`} />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}