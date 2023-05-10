import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

type Props = {
  type: any;
  onError: (err: any) => void;
  onSubmitted: () => void;
  doc: any;
};

const LinkForm = (props: Props) => {
  const { type, onError, onSubmitted, doc } = props;
  const [title, setTitle] = useState<string>(doc?.title ?? "");
  const [url, setUrl] = useState<string>(doc?.url ?? "");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === "insert") {
      console.log(type);
      Meteor.call(
        "links.create",
        { title, url },
        (error: Error | Meteor.Error, res: Response) => {
          if (error) {
            console.error(error.message);
            onError(error);
          } else {
            console.log(res);
          }
          onSubmitted();
        }
      );
    }
    if (type === "update") {
      Meteor.call(
        "links.update",
        { _id: doc._id, title, url },
        (error: Error | Meteor.Error, res: Response) => {
          if (error) {
            return onError(error);
          }
          console.log(res);
          onSubmitted();
        }
      );
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>URL</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LinkForm;
