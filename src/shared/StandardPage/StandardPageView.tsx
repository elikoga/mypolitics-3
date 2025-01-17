import React from "react";
import { PageContainer } from "@shared/Page";
import { ArticleContent, ArticlesListSection } from "@components/Media";
import ShareSocial from "@shared/ShareSocial";
import { Link as QuizLink, Section } from "@components/Quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faPencilRuler,
  faPollH,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { PostOrPage } from "@tryghost/content-api";
import {
  BasicTalkPartsFragment,
  FeaturedQuizzesQuery,
  PatreonQuery,
} from "@generated/graphql";
import GoogleAd from "@shared/GoogleAd";
import { CurrentTalk } from "@components/Talk";
import Patreon from "@shared/Patreon";
import { EditorCTA } from "@components/Editor";
import RandomContent from "@shared/StandardPage/RandomContent/RandomContentView";
import Link from "next/link";
import Button from "@shared/Button";
import { paths } from "@constants";
import useTranslation from "next-translate/useTranslation";
import { Content, Inner } from "./StandardPageStyle";

library.add(faPollH, faPencilRuler);

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
  articles?: PostOrPage[];
  talks?: BasicTalkPartsFragment[];
  quizzes?: FeaturedQuizzesQuery["featuredQuizzes"];
  patreons?: PatreonQuery["patreon"];
}

const StandardPage: React.FC<Props> = ({
  children,
  fullWidth = false,
  articles = [],
  talks = [],
  quizzes = [],
  patreons,
}) => {
  const { t } = useTranslation("common");
  const shortenedArticles = articles.filter((_, k) => k < 3);
  const randomArticle = articles.length > 0 && articles[articles.length - 1];

  return (
    <PageContainer>
      <div className="container">
        <Inner>
          <Content fullWidth={fullWidth}>{children}</Content>
          <Inner style={{ maxWidth: 850, margin: "auto" }}>
            {quizzes.length > 0 && (
              <>
                <Section
                  title={t("standardPage.section.quizzes.title")}
                  icon={<FontAwesomeIcon icon={faPollH} />}
                >
                  {quizzes.map((quiz) => (
                    <QuizLink
                      key={quiz.id}
                      quiz={quiz}
                      featured={quiz.slug === "mypolitics"}
                      showType
                    />
                  ))}
                  <Link href={paths.quizzes} passHref>
                    <Button
                      as="a"
                      beforeIcon={<FontAwesomeIcon icon={faArrowDown} />}
                    >
                      {t("standardPage.section.quizzes.button")}
                    </Button>
                  </Link>
                </Section>
                <EditorCTA />
                <ShareSocial />
              </>
            )}
          </Inner>
          {articles.length > 0 && (
            <>
              <ArticlesListSection
                posts={shortenedArticles}
                type="short-news"
              />
              <GoogleAd id="myp3-standard-middle" />
            </>
          )}
          <CurrentTalk />
          {talks.length > 0 && (
            <>
              <ArticlesListSection talks={talks} type="short-talk" />
              <GoogleAd id="myp3-standard-bottom" />
            </>
          )}
          {patreons && <Patreon patreons={patreons} />}
          <RandomContent />
          {randomArticle && (
            <ArticleContent post={randomArticle} showFull={false} />
          )}
        </Inner>
      </div>
    </PageContainer>
  );
};

export default StandardPage;
