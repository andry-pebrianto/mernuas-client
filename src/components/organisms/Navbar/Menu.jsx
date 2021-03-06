import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import cx from "classnames";

function Menu({ title, href, isActive, button = false }) {
  const classNavItem = cx({
    "nav-item": true,
    "nav-item-hover": !button,
  });

  const classNavLink = cx({
    "nav-link": true,
    active: isActive,
  });

  return (
    <li className={classNavItem}>
      <Link className={classNavLink} aria-current="page" to={href}>
        {title}
      </Link>
    </li>
  );
}

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  button: PropTypes.bool,
};

export default Menu;
