// app/[locale]/theories-insight/harmonyblocks.tsx
import GameCanvas from '@/components/harmonyblocksGameCanvas';
import { Metadata } from 'next';
import { getSEOTags } from '@/libs/seo';
import { i18nConfig } from '@/i18n.mjs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CustomLink from '@/components/CustomLink'; // Use CustomLink for external links
import { getTranslations } from 'next-intl/server';

type SupportedLocale = typeof i18nConfig.locales[number]; // 获取支持的语言列表

export async function generateMetadata({ params }: { params: { locale: SupportedLocale } }): Promise<Metadata> {
    const titles: Record<SupportedLocale, string> = {
        en: "Harmony Blocks - A Relaxing Alignment Game by Positive Psychology",
        zh: "和谐方块 - 积极心理学下的放松对齐游戏",
        es: "Harmony Blocks - Un juego relajante de alineación por psicología positiva",
        ar: "Harmony Blocks - لعبة التهدئة بواسطة علم النفس الإيجابي",
        fr: "Harmony Blocks - Un jeu relaxant basé sur la psychologie positive",
        pt: "Harmony Blocks - Um jogo relaxante de alinhamento pela psicologia positiva",
        ru: "Harmony Blocks - Расслабляющая игра на основе позитивной психологии",
        ja: "Harmony Blocks - ポジティブ心理学によるリラクゼーションゲーム",
        de: "Harmony Blocks - Ein entspannendes Ausrichtspiel durch positive Psychologie",
        vi: "Harmony Blocks - Trò chơi thư giãn dựa trên tâm lý học tích cực",
        ko: "Harmony Blocks - 긍정심리학을 통한 휴식 게임",
        it: "Harmony Blocks - Un gioco rilassante di allineamento attraverso la psicologia positiva",
        fa: "Harmony Blocks - یک بازی آرامش بخش با تکیه بر روانشناسی مثبت",
        th: "Harmony Blocks - เกมผ่อนคลายด้วยจิตวิทยาเชิงบวก",
        ms: "Harmony Blocks - Permainan santai melalui psikologi positif",
        bn: "Harmony Blocks - ইতিবাচক মনোবিজ্ঞানের মাধ্যমে এক আরামদায়ক খেলা",
        pl: "Harmony Blocks - Relaksująca gra oparta na psychologii pozytywnej",
        tl: "Harmony Blocks - Isang nakakarelaks na laro sa pamamagitan ng positibong sikolohiya",
        ro: "Harmony Blocks - Un joc relaxant prin psihologia pozitivă",
        nl: "Harmony Blocks - Een ontspannend uitlijnspel door positieve psychologie",
        el: "Harmony Blocks - Ένα χαλαρωτικό παιχνίδι ευθυγράμμισης μέσω της θετικής ψυχολογίας",
        cs: "Harmony Blocks - Relaxační hra s vyrovnáváním tvarů založená na pozitivní psychologii",
        hu: "Harmony Blocks - Pihentető játék pozitív pszichológia alapján",
        sv: "Harmony Blocks - Ett avslappnande justeringsspel genom positiv psykologi",
        da: "Harmony Blocks - Et afslappende justeringsspil med positiv psykologi",
        no: "Harmony Blocks - Et avslappende tilpasningsspill gjennom positiv psykologi",
        fi: "Harmony Blocks - Rentouttava kohdistuspeli positiivisen psykologian kautta",
        is: "Harmony Blocks - Slakandi leikur með jákvæðri sálfræði"
    };

    const descriptions: Record<SupportedLocale, string> = {
        en: "Harmony Blocks is a simple game where players align falling shapes with outlines at the bottom of the screen. Designed to promote focus and relaxation.",
        zh: "《和谐方块》是一款简单的游戏，玩家需要将掉落的形状与屏幕底部的轮廓对齐。旨在促进专注和放松。",
        es: "Harmony Blocks es un juego simple donde los jugadores alinean las formas que caen con los contornos en la parte inferior de la pantalla. Diseñado para promover la concentración y la relajación.",
        ar: "Harmony Blocks هي لعبة بسيطة حيث يقوم اللاعبون بمحاذاة الأشكال المتساقطة مع المخططات في أسفل الشاشة. تم تصميمها لتعزيز التركيز والاسترخاء.",
        fr: "Harmony Blocks est un jeu simple où les joueurs alignent des formes tombantes avec des contours au bas de l'écran. Conçu pour favoriser la concentration et la détente.",
        pt: "Harmony Blocks é um jogo simples onde os jogadores alinham formas que caem com os contornos na parte inferior da tela. Projetado para promover foco e relaxamento.",
        ru: "Harmony Blocks — это простая игра, в которой игроки выравнивают падающие фигуры по контурам в нижней части экрана. Игра создана для улучшения фокуса и релаксации.",
        ja: "Harmony Blocksは、プレイヤーが画面の下部にある輪郭に落ちてくる形を合わせるシンプルなゲームです。集中力とリラックスを促進するために設計されています。",
        de: "Harmony Blocks ist ein einfaches Spiel, bei dem Spieler fallende Formen mit den Umrissen am unteren Rand des Bildschirms ausrichten. Es wurde entwickelt, um Fokus und Entspannung zu fördern.",
        vi: "Harmony Blocks là một trò chơi đơn giản, nơi người chơi căn chỉnh các hình dạng rơi xuống với các đường viền ở dưới cùng của màn hình. Được thiết kế để thúc đẩy sự tập trung và thư giãn.",
        ko: "Harmony Blocks는 플레이어가 화면 하단의 윤곽에 떨어지는 모양을 맞추는 간단한 게임입니다. 집중력과 이완을 촉진하도록 설계되었습니다。",
        it: "Harmony Blocks è un gioco semplice in cui i giocatori allineano le forme che cadono con i contorni nella parte inferiore dello schermo. Progettato per promuovere concentrazione e rilassamento.",
        fa: "Harmony Blocks یک بازی ساده است که بازیکنان در آن اشکال سقوط‌کننده را با طرح‌ها در پایین صفحه هماهنگ می‌کنند. برای تقویت تمرکز و آرامش طراحی شده است.",
        th: "Harmony Blocks เป็นเกมที่เรียบง่ายที่ผู้เล่นจะจัดแนวรูปทรงที่ตกลงมากับรูปร่างที่ด้านล่างของหน้าจอ ออกแบบมาเพื่อส่งเสริมความตั้งใจและการผ่อนคลาย",
        ms: "Harmony Blocks adalah permainan mudah di mana pemain menyelaraskan bentuk yang jatuh dengan garis panduan di bahagian bawah skrin. Direka untuk meningkatkan fokus dan kelonggaran.",
        bn: "Harmony Blocks একটি সহজ খেলা যেখানে খেলোয়াড়েরা পড়ন্ত আকৃতি স্ক্রিনের নিচে রেখার সাথে সঙ্গতিপূর্ণ করে। এটি মনোযোগ এবং আরামকে প্রমোট করতে ডিজাইন করা হয়েছে।",
        pl: "Harmony Blocks to prosta gra, w której gracze dopasowują spadające kształty do konturów na dole ekranu. Została zaprojektowana, aby wspierać koncentrację i relaksację.",
        tl: "Ang Harmony Blocks ay isang simpleng laro kung saan inaayos ng mga manlalaro ang bumabagsak na mga hugis sa mga outline sa ibaba ng screen. Dinisenyo upang itaguyod ang pokus at pagpapahinga.",
        ro: "Harmony Blocks este un joc simplu în care jucătorii aliniază formele care cad cu contururile din partea de jos a ecranului. Proiectat pentru a promova concentrarea și relaxarea.",
        nl: "Harmony Blocks is een eenvoudig spel waarbij spelers vallende vormen uitlijnen met contouren aan de onderkant van het scherm. Ontworpen om focus en ontspanning te bevorderen.",
        el: "Το Harmony Blocks είναι ένα απλό παιχνίδι όπου οι παίκτες ευθυγραμμίζουν τα σχήματα που πέφτουν με τα περιγράμματα στο κάτω μέρος της οθόνης. Σχεδιασμένο για να προάγει την εστίαση και τη χαλάρωση.",
        cs: "Harmony Blocks je jednoduchá hra, ve které hráči zarovnávají padající tvary s obrysy na spodní části obrazovky. Navrženo pro podporu soustředění a relaxace.",
        hu: "A Harmony Blocks egy egyszerű játék, amelyben a játékosok az alján lévő körvonalakhoz igazítják a lehulló formákat. Célja a fókusz és a relaxáció elősegítése.",
        sv: "Harmony Blocks är ett enkelt spel där spelare justerar fallande former med konturer längst ned på skärmen. Utformat för att främja fokus och avslappning.",
        da: "Harmony Blocks er et simpelt spil, hvor spillere tilpasser faldende former med konturer nederst på skærmen. Designet til at fremme fokus og afslapning.",
        no: "Harmony Blocks er et enkelt spill der spillere justerer fallende former med omrissene nederst på skjermen. Utformet for å fremme fokus og avslapning.",
        fi: "Harmony Blocks on yksinkertainen peli, jossa pelaajat kohdistavat putoavia muotoja ruudun alaosan ääriviivoihin. Suunniteltu parantamaan keskittymistä ja rentoutumista.",
        is: "Harmony Blocks er einfaldur leikur þar sem leikmenn raða saman fallandi formum við útlínur neðst á skjánum. Hannað til að stuðla að einbeitingu og slökun."
    };

    const title = titles[params.locale];
    const description = descriptions[params.locale];

    return getSEOTags({
        title,
        canonicalUrlRelative: "/theories-insight/harmonyblocks",
        description,
        locale: params.locale,
    });
}

export default async function HarmonyBlocksPage({ params }: { params: { locale: SupportedLocale } }) {
    const t = await getTranslations();

    return (
        <>
            <Header />
            <Breadcrumbs />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">
                    {t('harmonyblocks.harmonyBlocks')}
                </h1>

                {/* Game Canvas */}
                <section className="mt-8">
                    <GameCanvas />
                </section>

                <section className="mt-8">
                    {/* What is Harmony Blocks? */}
                    <div className="prose lg:prose-xl mx-auto">
                        <h2>{t('harmonyblocks.whatIsHarmonyBlocks')}</h2>
                        <p>{t('harmonyblocks.whatIsHarmonyBlocksDesc')}</p>
                    </div>

                    {/* Key Features */}
                    <div className="prose lg:prose-xl mx-auto mt-8">
                        <h2>{t('harmonyblocks.keyFeatures')}</h2>
                        <ul>
                            <li>{t('harmonyblocks.feature1')}</li>
                            <li>{t('harmonyblocks.feature2')}</li>
                            <li>{t('harmonyblocks.feature3')}</li>
                        </ul>
                    </div>

                    {/* Why Was This Created? */}
                    <div className="prose lg:prose-xl mx-auto mt-12">
                        <h2>{t('harmonyblocks.whyCreated')}</h2>
                        <p>{t('harmonyblocks.whyCreatedDesc')}</p>
                    </div>

                    {/* Who Is It For? */}
                    <div className="prose lg:prose-xl mx-auto mt-12">
                        <h2>{t('harmonyblocks.whoIsItFor')}</h2>
                        <p>{t('harmonyblocks.whoIsItForDesc1')}</p>
                        <p>{t('harmonyblocks.whoIsItForDesc2')}</p>
                        <p>{t('harmonyblocks.whoIsItForDesc3')}</p>
                    </div>


                    {/* Psychology Behind the Game */}
                    <div className="prose lg:prose-xl mx-auto mt-12">
                        <h2>{t('harmonyblocks.psychologyBehind')}</h2>

                        <h3>{t('harmonyblocks.visuospatial')}</h3>
                        <p>
                            {t('harmonyblocks.visuospatialDesc')}
                            <br />
                            <strong>{t('reference')}:</strong>{' '}
                            <CustomLink href="https://doi.org/10.1371/journal.pone.0004153">
                                Holmes et al. (2009), &quot;Can playing the computer game &apos;Tetris&apos; reduce the build-up of flashbacks for trauma?&quot;
                            </CustomLink>
                        </p>

                        <h3>{t('harmonyblocks.flowState')}</h3>
                        <p>
                            {t('harmonyblocks.flowStateDesc')}
                            <br />
                            <strong>{t('reference')}:</strong>{' '}
                            <CustomLink href="https://www.harpercollins.com/products/flow-mihaly-csikszentmihalyi">
                                Csikszentmihalyi (1990), &quot;Flow: The psychology of optimal experience.&quot;
                            </CustomLink>
                        </p>

                        <h3>{t('harmonyblocks.colorPsychology')}</h3>
                        <p>
                            {t('harmonyblocks.colorPsychologyDesc')}
                            <br />
                            <strong>{t('reference')}:</strong>{' '}
                            <CustomLink href="https://doi.org/10.1037/h0062181">
                                Wexner (1954), &quot;The degree to which colors (hues) are associated with mood-tones.&quot;
                            </CustomLink>
                        </p>

                        <h3>{t('harmonyblocks.positiveReinforcement')}</h3>
                        <p>
                            {t('harmonyblocks.positiveReinforcementDesc')}
                            <br />
                            <strong>{t('reference')}:</strong>{' '}
                            <CustomLink href="https://doi.org/10.1037/h0062181">
                                Skinner (1953), &quot;Science and Human Behavior.&quot;
                            </CustomLink>
                        </p>
                    </div>

                    {/* GitHub Repository Reference */}
                    <div className="flex justify-center items-center mt-12">
                        <CustomLink href="https://github.com/tg12/harmonyblocks/tree/main">
                            {t('harmonyblocks.viewOnGitHub')}
                        </CustomLink>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}