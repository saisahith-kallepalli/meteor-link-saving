import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link, LinksCollection } from "../api/links";
import LinkForm from "./LinkForm";

export const Info = () => {
  const [formTarget, setFormTarget] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  Meteor.subscribe("links");

  const links = useTracker(() => {
    return LinksCollection.find().fetch();
  });
  const onSubmitted = () => {
    setFormTarget(null);
    setError(null);
  };
  const onError = (err: any) => setError(err);

  const renderLinkForm = () => {
    return formTarget ? (
      <LinkForm
        onSubmitted={onSubmitted}
        onError={onError}
        type={formTarget.type}
        doc={formTarget.doc}
      />
    ) : null;
  };

  const renderError = () => {
    return error ? <div>{error.message}</div> : null;
  };
  const remove = (_id: string | undefined) => {
    Meteor.call("links.delete", { _id }, (error: Error | Meteor.Error) =>
      setError(error || null)
    );
  };
  console.info(links);
  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>
        {links?.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
            <button
              onClick={() => setFormTarget({ type: "update", doc: link })}>
              Update
            </button>
            <button onClick={() => remove(link._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {renderLinkForm()}
      {renderError()}
      <button onClick={() => setFormTarget({ type: "insert" })}>
        Create new
      </button>
    </div>
  );
};
