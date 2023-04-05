import React from "react";

function Nav() {
  const API_URL = 'https://seassfileupload-gx4wg3twdq-uc.a.run.app/';
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Map
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal ">
          <li>
            {/* <button className="btn btn-info" href="/contribute"> */}
            <a href={`${API_URL}`} className="btn btn-info rounded-lg">
              Contribute
            </a>
            {/* Contribute */}
            {/* </button> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
