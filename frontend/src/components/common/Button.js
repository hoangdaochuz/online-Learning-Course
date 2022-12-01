import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";


//  style
const StyledButtonWrapper = styled.div`
  .btn {
    display: inline-block;
    padding: 16px 24px;
    color: #fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 13px;
      font-weight: 700;
    }
    ${(props) =>
      props.primary &&
      css`
        background-color: var(--primary-color);
      `};
    ${(props) =>
      props.btnBgWhite &&
      css`
        background-color: #fff;
        color: var(--primary-color);
        box-shadow: 0px 0px 2px 2px #ccc;
      `};
    ${props => props.outline && css`
        border: 1px solid var(--primary-color);
        background-color: #f2f2f2;;
        color: var(--primary-color);
    `};

    ${props => props.deleteBtn && css`
        background-color: #df4141;
    `}
    
  }
`;
//  Component
const Button = ({
  to,
  href,
  children,
  primary = false,
  rounded = false,
  outline = false,
  disable = false,
  btnBgWhite = false,
  onClick,
  large = false,
  small = false,
  className,
  deleteBtn,
  LeftIcon,
  RightIcon,
  ...passProps
}) => {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };

  Object.keys(props).forEach((key) => {
    if (key.startsWith("on") && typeof props[key] === "function") {
      delete props[key];
    }
  });
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <StyledButtonWrapper
      outline={outline}
      primary={primary}
      rounded={rounded}
      disable={disable}
      btnBgWhite={btnBgWhite}
      deleteBtn={deleteBtn}
      large={large}
      small={small}
      {...passProps}
      className="btn-wrapper"
    >
      <Comp className={`btn ${className}`} onClick={onClick} {...props}>
        {LeftIcon && <span className="icon">{LeftIcon}</span>}
        <span className="title">{children}</span>
        {RightIcon && <span className="icon">{RightIcon}</span>}
      </Comp>
    </StyledButtonWrapper>
  );
};

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  rounded: PropTypes.bool,
  outline: PropTypes.bool,
  disable: PropTypes.bool,
  btnBgWhite: PropTypes.bool,
  onClick: PropTypes.func,
  large: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  LeftIcon: PropTypes.node,
  RightIcon: PropTypes.node,
};
export default Button;
