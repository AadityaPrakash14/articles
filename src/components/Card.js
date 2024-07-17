import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  // let url = "/" + String(props.id);
  return (
    <>
      <div className="col my-3">
        <div className="card myCard" style={{ width: "25rem" }}>
          <div className="card-body min-vh-30">
            <h5 className="card-title text-center cardTitle">{props.title}</h5>
            <p className="card-text mt-3 cardText">
              {props.aText.slice(0, 220)}
            </p>
            <p className="text-center mt-4">
              Author's Name : <b>{props.authname}</b>
            </p>
            <p className="text-center mt-4">
              <Link to={props.url} className="btn btn-success buttonSt">
                View
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
