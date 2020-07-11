import * as React from 'react';
import styled from 'styled-components';

import logoUrl from '../../assets/images/logo.png';
import githubLogoUrl from '../../assets/images/githubLogo.svg';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  padding: 0 2rem;
  width: 100%;
`;

const Body = styled.div`
  margin-top: 2rem;
`;

const Description = styled.div`
  color: var(--dark);
  font-size: 1.1rem;
  font-weight: 400;
`;

const Divider = styled.div`
  height: 2px;
  width: 5%;
  background-image: linear-gradient(to right, #45e87b, #05e1f9);
  margin: 2.5rem 0;
`;

const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 3rem;
  width: 3rem;
`;

const GithubLogo = styled.img`
  width: 2rem;
`;

const Page = ({ title, description, children }: Props) => {
  return (
    <Container>
      <Wrapper>
        <TopBar>
          <Logo src={logoUrl} />
          <a
            href="https://devrnt.github.io/react-use-intercom"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubLogo src={githubLogoUrl} />
          </a>
        </TopBar>
        <h1>{title}</h1>
        <Description>{description}</Description>
        <Divider />
        <Body>{children}</Body>
      </Wrapper>
    </Container>
  );
};

export default Page;
