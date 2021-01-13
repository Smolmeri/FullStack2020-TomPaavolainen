const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const loginRouter = require("../controllers/login");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});

  const userToSave = { username: "root", password: "sekret" };

  await api.post("/api/users").send(userToSave);
});

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(contents).toContainEqual("React patterns");
});

describe("adding a blog", () => {
  test("succeeds with valid token ", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    const t = "bearer ";
    const token = t.concat(res.body.token);

    const newBlog = {
      title: "Harpunsoittajan vaimo",
      author: "Antti Holma",
      url: "https://www.harpunsoittajanvaimo.fi/",
      likes: 17,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const contents = response.body.map((r) => r.title);

    expect(response.body.length).toBe(initialBlogs.length + 1);
    expect(contents).toContain("Harpunsoittajan vaimo");
  });

  test("fails without token", async () => {
    const newBlog = {
      title: "Harpunsoittajan vaimo",
      author: "Antti Holma",
      url: "https://www.harpunsoittajanvaimo.fi/",
      likes: 17,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("undefined", () => {
  test("likes is set to 0 on save", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    const t = "bearer ";
    const token = t.concat(res.body.token);
    const newBlogUndefinedLikes = {
      title: "Colour me",
      author: "Anni",
      url: "https://www.colourme.fi/",
    };

    await api
      .post("/api/blogs")
      .send(newBlogUndefinedLikes)
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.likes);
    expect(contents[2]).toBe(0);
  });

  test("title returns 400 Bad request on save", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    const t = "bearer ";
    const token = t.concat(res.body.token);

    const newBlogUndefinedTitle = {
      author: "Mystery Man",
      url: "https://www.wheresthetitle.fi/",
      likes: 500,
    };

    await api
      .post("/api/blogs")
      .send(newBlogUndefinedTitle)
      .set("Authorization", token)
      .expect(400);
  });

  test("url returns 400 Bad request on save", async () => {
    const res = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    const t = "bearer ";
    const token = t.concat(res.body.token);
    const newBlogUndefinedTitle = {
      title: "Stephan Kesting",
      author: "Grappling Arts",
      likes: 39,
    };

    await api
      .post("/api/blogs")
      .send(newBlogUndefinedTitle)
      .set("Authorization", token)
      .expect(400);
  });
});
/* waiting token mods
test('deletion of a blog succeeds with a valid id', async () => {
  const blogsInDB = await Blog.find({})
  blogsInDB.map(b => b.toJSON())
  const blogToDelete = blogsInDB[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await Blog.find({})
  blogsAtEnd.map(b => b.toJSON())
  expect(blogsAtEnd.length).toBe(initialBlogs.length - 1)
  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).not.toContain(blogToDelete.title)
})
test('updating a blog succeeds with a valid id', async () => {
  const blogsInDB = await Blog.find({})
  //blogsInDB.map(b => b.toJSON())
  const likesAtBeginning = blogsInDB[0].likes
  const blogToUpdate = {
    id: blogsInDB[0]._id,
    title: blogsInDB[0].title,
    author: blogsInDB[0].author,
    url: blogsInDB[0].url,
    likes: blogsInDB[0].likes + 1
  }
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200 || 204)
  const blogsAtEnd = await Blog.find({})
  blogsAtEnd.map(b => b.toJSON())
  expect(blogsAtEnd[0].likes).toBe(likesAtBeginning + 1)
})
*/

afterAll(() => {
  mongoose.connection.close();
});
