import styled from 'styled-components';

export const Container = styled.div`
  margin: 16px 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 16px 0;
  }

  ul,
  ol {
    margin: 20px;
  }

  ul {
    list-style: initial;
  }

  pre {
    padding: 1.5em;
    border-radius: 6px;
  }

  li {
    margin: 8px 0;
  }

  li code,
  p code {
    background: #ffffff30;
    padding: 3px 6px;
  }

  p img {
    width: 100%;
    max-width: 600px;
    object-fit: cover;
  }

  p a {
    color: var(--oliveBlue);

    &:hover {
      text-decoration: underline;
    }
  }
`;
