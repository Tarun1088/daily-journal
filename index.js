const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Welcome to Daily Journal! This is a platform where you can write and publish your journal entries. Express your thoughts, share your experiences, and connect with others through your personal journal. To get started, click on the 'Compose' link in the navigation menu and create your own journal entry. You can also read random journal entries by clicking on the 'Read More' links below.";

const aboutContent = `
  Experience the art of journaling like never before with the Daily Journal app! Created as a learning project, this application showcases the power of the EJS templating engine and transactional functionality. Daily Journal is a platform that encourages self-expression and personal growth through digital journaling. Whether you're capturing daily musings, preserving cherished moments, or jotting down your thoughts, this app offers a seamless and user-friendly interface to help you embark on your journaling journey.
  
  In keeping with the authenticity of a traditional journal, deliberate decisions were made not to include update and delete functionality. Just as with a tangible journal, where each entry is a permanent record, the Daily Journal app reflects this essence by encouraging thoughtful expression without the option to edit or remove entries. This choice aims to preserve the genuine nature of personal reflection and storytelling.`;

const contactContent =
  "We'd love to hear from you! If you have any questions, feedback, or suggestions regarding the Daily Journal platform, please feel free to reach out to us. You can contact us by sending an email to Tarunrawal03@gmail.com or by filling out the contact form on our website. Your input is valuable to us as we strive to improve our platform and provide the best journaling experience for our users.";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", { StartingContent: homeStartingContent, posts: posts });
});
app.get("/about", function (req, res) {
  res.render("about", { Content: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);

  res.redirect("/");
});

app.get("/ports/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    if (_.lowerCase(post.title) === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

const PORT = 3001;

app.listen(PORT, function () {
  console.log("Server started on port 3001");
});
