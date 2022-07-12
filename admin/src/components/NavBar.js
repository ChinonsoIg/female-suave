import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="/link">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active colour_me" aria-current="page" href="/link">
                Home
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link colour_me" href="/link">
                Link
              </a>
            </li>
            <li>
              <form className="d-flex colour_me" role="search">
                <input
                  className="form-control me-2 w-200 colour_me"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success colour_me" type="submit">
                  Search
                </button>
              </form>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-success me-2" type="button">
              Log In
            </button>
            <button className="btn btn-success" type="button">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

// {
//     "arrowParens": "always",
//     "bracketSameLine": false,
//     "bracketSpacing": true,
//     "embeddedLanguageFormatting": "auto",
//     "htmlWhitespaceSensitivity": "css",
//     "insertPragma": false,
//     "jsxSingleQuote": false,
//     "printWidth": 80,
//     "proseWrap": "preserve",
//     "quoteProps": "as-needed",
//     "requirePragma": false,
//     "semi": true,
//     "singleQuote": false,
//     "tabWidth": 2,
//     "trailingComma": "es5",
//     "useTabs": false,
//     "vueIndentScriptAndStyle": false
// }
