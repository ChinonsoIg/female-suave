import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
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
              <a className="nav-link active" aria-current="page" href="/link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/link">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/link"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/link">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/link">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/link">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li> */}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
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
