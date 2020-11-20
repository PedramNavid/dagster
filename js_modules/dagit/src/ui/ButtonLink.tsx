import {Colors} from '@blueprintjs/core';
import * as React from 'react';
import styled, {css} from 'styled-components';

type Color =
  | string
  | {
      link: string;
      hover?: string;
      active?: string;
    };

type Underline = 'never' | 'always' | 'hover';

export interface Props {
  color: Color;
  underline?: Underline;
}

const fontColor = (color: Color) => {
  if (typeof color === 'string') {
    return css`
      color: ${color};
    `;
  }

  const {link, hover, active} = color;
  return css`
    color: ${link};
    ${hover ? `&:hover { color: ${hover}; }` : null}
    ${active ? `&:active { color: ${active}; }` : null}
  `;
};

const outlineColor = (color: Color) => {
  if (typeof color === 'string') {
    return color;
  }
  return color.link;
};

const textDecoration = (underline: Underline) => {
  switch (underline) {
    case 'always':
      return css`
        text-decoration: underline;
      `;
    case 'hover':
      return css`
        &:hover {
          text-decoration: underline;
        }
      `;
    case 'never':
    default:
      return null;
  }
};

export const ButtonLink = styled(({color, underline, ...rest}) => <button {...rest} />)<Props>`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: inherit;
  line-height: 1;
  padding: 0;

  &:active,
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px auto ${({color}) => outlineColor(color)};
    outline-offset: 2px;
  }

  transition: 30ms color linear;

  ${({color}) => fontColor(color)}
  ${({underline}) => textDecoration(underline)}
`;

ButtonLink.defaultProps = {
  color: Colors.BLUE2,
  underline: 'hover',
};
