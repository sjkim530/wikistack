const Sequelize = require("sequelize");
const { username, password } = require("./auth.js");
const db = new Sequelize(
  `postgres://${username}:${password}@localhost:5432/wikistack`,
  {
    logging: false,
  }
);

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  dateCreated: { type: Sequelize.DATE, defaultValue: Date.now() },
});

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
  dateCreated: { type: Sequelize.DATE, defaultValue: Date.now() },
});

Page.beforeValidate((pageInstance, optionsObject) => {
  pageInstance.slug = makeSlug(pageInstance.title);
});

// Source: https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
function makeSlug(title) {
  let newTitle;
  if (!title || title === "") {
    newTitle = makeRandomString();
  } else {
    newTitle = title
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/&/g, "_and_")
      .replace(/[^\w\-]+/g, "");
  }
  return newTitle;
}

// Source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeRandomString() {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

module.exports = {
  db,
  Page,
  User,
};
