/// <reference types="styled-components/cssprop" />

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Header, HeaderContent, Page } from '../components/Layout';
import { Media } from '../components/Media/Media';
import { Tags } from '../components/Tag';
import { Body, Title } from '../components/Typography';
import { Case } from '../models/Case';
import { UANextWrapper } from '../components/UAParser';

interface CasePageProps {
  data: Case | undefined;
}

const Url = styled.a`
  ${tw`font-bold`}
`;

const MediaContainer = styled.div`
  @media (min-width: 768px) {
    transform: translateY(-4rem);
  }
`;

const CasePage: NextFunctionComponent<CasePageProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { title, technologies, categories, description, url, media } = data;

  return (
    <Page>
      <CaseHeader {...data} />
      <Header>
        <HeaderContent role="main">
          <Title>{title}</Title>
          <Url href={url}>{url}</Url>
          <Body
            css={`
              ${tw`mt-4`}
            `}
          >
            {documentToReactComponents(description)}
          </Body>
          <div
            css={`
              ${tw`mt-8`}
            `}
          >
            <Tags tags={technologies} />
          </div>
          <div
            css={`
              ${tw`mt-2`}
            `}
          >
            <Tags tags={categories} />
          </div>
        </HeaderContent>
      </Header>
      <MediaContainer>
        {media.map(m => (
          <Media key={m.id} media={m} />
        ))}
      </MediaContainer>
    </Page>
  );
};

async function fetchCase({ slug = '' }) {
  const json = await import('../data/data/case.json');
  let arr: object | Case[] = json;
  // Why is json an object?
  if (typeof json === 'object') {
    arr = Object.entries(json).map(([, value]) => value);
  }
  const data = (arr as Case[]).find(c => c.slug === slug);
  return { arr, data, type: typeof json };
}

CasePage.getInitialProps = async ({ query }) => {
  const data = await fetchCase(query);
  return data;
};

export default UANextWrapper(withRouter(CasePage));

const CaseHeader: React.FC<Case> = ({ title, description, media, slug }) => {
  const imageUrl = media[0].file.url;
  const descriptionString: string = documentToPlainTextString(description);

  return (
    <Head>
      <title>itiden - case - {title}</title>
      <meta name="Description" content={descriptionString} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@itidengbg" />
      <meta name="twitter:title" content={`itiden - case - ${title}`} />
      <meta name="twitter:description" content={descriptionString} />
      <meta name="twitter:creator" content="@itidengbg" />
      <meta name="twitter:image" content={imageUrl} />
      <meta property="og:title" content={`itiden - case - ${title}`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://itiden.se/case/${slug}`} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:description" content={descriptionString} />
      <meta property="og:site_name" content="https://itiden.se" />
    </Head>
  );
};
