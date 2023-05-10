import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";

type insertLink = {
  title: string;
  url: string;
};
Meteor.methods({
  "links.create": function ({ title, url }) {
    return LinksCollection.insert({ title, url, createdAt: new Date() });
  },
  "links.update": function ({ _id, title, url }) {
    const $set: insertLink | any = {};
    if (url) $set.url = url;
    if (title) $set.title = title;
    return LinksCollection.update({ _id }, { $set });
  },
  "links.delete": function ({ _id }) {
    return LinksCollection.remove({ _id });
  },
});

Meteor.publish("links", function () {
  return LinksCollection.find();
});
