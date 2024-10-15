// app/[locale]/theories-insight/harmonyblocks.tsx
import GameCanvas from '@/components/harmonyblocksGameCanvas';
import Head from 'next/head';
import Link from 'Next'; // Use next/link for internal links

export default function HarmonyBlocksPage() {
    return (
      <>
        <Head>
          <title>Harmony Blocks - A Relaxing Alignment Game</title>
          <meta
            name="description"
            content="Harmony Blocks is a simple game where players align falling shapes with outlines at the bottom of the screen. Designed to promote focus and relaxation."
          />
          <meta
            name="keywords"
            content="Harmony Blocks, relaxation game, focus, alignment game, stress-free gaming"
          />
          <meta property="og:title" content="Harmony Blocks - A Relaxing Alignment Game" />
          <meta
            property="og:description"
            content="Harmony Blocks is a simple game where players align falling shapes with outlines at the bottom of the screen. Designed to promote focus and relaxation."
          />
          <meta property="og:image" content="/images/harmony-blocks-thumbnail.png" />
          <meta property="og:url" content="https://yourwebsite.com/theories-insight/gamecanvas" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Harmony Blocks</h1>

        <div className="prose lg:prose-xl mx-auto">
          <p>
            <strong>Harmony Blocks</strong> is a simple game where players align falling shapes with
            outlines at the bottom of the screen. The game is designed to promote focus and
            relaxation by gradually increasing the challenge, without overwhelming the player.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Relaxing visuals</strong>, with soft colors and a gradient background.
            </li>
            <li>
              <strong>Positive feedback</strong> in the form of encouraging messages.
            </li>
            <li>
              <strong>Adaptive difficulty</strong>, making it engaging but never stressful.
            </li>
          </ul>
        </div>

        {/* Psychology Behind the Game Section */}
        <div className="prose lg:prose-xl mx-auto mt-12">
          <h2>Psychology Behind the Game</h2>

          <h3>1. Visuospatial Cognitive Engagement</h3>
          <p>
            The game requires players to align falling shapes with outlines, which engages the
            visuospatial processing part of the brain. Research has shown that tasks requiring
            spatial awareness can help distract from negative thoughts and reduce mental fatigue.
            <br />
            <strong>Reference:</strong>{' '}
            <Link href="https://doi.org/10.1371/journal.pone.0004153">
              Holmes et al. (2009), "Can playing the computer game 'Tetris' reduce the build-up of flashbacks for trauma?"
            </Link>
          </p>

          <h3>2. Flow State and Focus</h3>
          <p>
            Harmony Blocks aims to help players achieve a "flow state"—a mental state where one is
            fully immersed in the task at hand. Games like this, with simple goals and adaptive
            difficulty, are particularly good at inducing flow, which in turn helps improve focus
            and reduces stress.
            <br />
            <strong>Reference:</strong>{' '}
            <CustomLink href="https://www.harpercollins.com/products/flow-mihaly-csikszentmihalyi">
              Csikszentmihalyi (1990), "Flow: The psychology of optimal experience."
            </CustomLink>
          </p>

          <h3>3. Color Psychology</h3>
          <p>
            The use of soothing colors like blues and greens has been shown to evoke feelings of
            calmness. Harmony Blocks uses these colors in its design to help create a serene
            atmosphere and promote relaxation.
            <br />
            <strong>Reference:</strong>{' '}
            <Link href="https://doi.org/10.1037/h0062181">
              Wexner (1954), "The degree to which colors (hues) are associated with mood-tones."
            </Link>
          </p>

          <h3>4. Positive Reinforcement</h3>
          <p>
            Instead of punishing mistakes, the game provides positive feedback and encouragement
            for aligning shapes correctly. This positive reinforcement helps maintain a relaxed
            mental state and encourages continued play without anxiety.
            <br />
            <strong>Reference:</strong>{' '}
            <Link href="https://doi.org/10.1037/h0062181">
              Skinner (1953), "Science and Human Behavior."
            </Link>
          </p>
        </div>

        {/* GitHub Repository Reference */}
        <div className="flex justify-center items-center mt-12">
          <Link href="https://github.com/tg12/harmonyblocks/tree/main" passHref>
            <a className="btn btn-outline btn-primary">View the project on GitHub</a>
          </Link>
        </div>

        {/* Game Canvas */}
        <div className="mt-8">
          <GameCanvas />
        </div>
      </div>
    </>
  );
}