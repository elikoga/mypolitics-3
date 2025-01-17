import React from "react";
import useTranslation from "next-translate/useTranslation";
import HeroSection from "@shared/HeroSection";
import { Title } from "@shared/Typography";
import { Link } from "@components/Media";
import { PostOrPage } from "@tryghost/content-api";
import { Content, Row, Col } from "./ArticlesHeroStyle";

interface Props {
  featuredPosts: PostOrPage[];
}

const ArticlesHero: React.FC<Props> = ({ featuredPosts }) => {
  const { t } = useTranslation("articles");

  return (
    <HeroSection>
      <Content>
        <Title>{t("hero.title")}</Title>
        <Row>
          <Col>
            <Link data={featuredPosts[0]} large />
          </Col>
          <Col>
            <Link data={featuredPosts[1]} />
            <Link data={featuredPosts[2]} />
          </Col>
        </Row>
      </Content>
    </HeroSection>
  );
};

export default ArticlesHero;
