const express = require("express");
const cors = require("cors");
const errForid = { error: "id.not_found" };
const server = express();
server.use(cors());
server.use(express.json());

let nextPostId = 1;
let posts = [
  { id: nextPostId++, category: "Food",   price: 90 },
  { id: nextPostId++, category: "Drinks", price: 120 },
  { id: nextPostId++, category: "Burger", price: 92 },
  { id: nextPostId++, category: "Turism", price: 0 }
];
function findPostIndexById(id) {
  return posts.findIndex(o => o.id === id);
}
// new
server.get('/posts', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            res.send(posts);
        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 1000);
});

server.post("/posts", (req, res) => {
  const body = req.body;
  const id = body.id;
  if (id === 0) {
    posts = [
      ...posts,
      {
        id: nextPostId++,
        category: body.category,
        price: body.price
      }
    ];
    res.send(posts);
    return;
  }
  posts = posts.map(o => (o.id !== id ? o : { ...o, category: body.category, price: body.price }));
  res.send(posts);
});

server.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = findPostIndexById(id);
  if (index === -1) {
    res.status(404).send(errForid);
    return;
  }
  posts = posts.filter(o => o.id != id);
  res.send(posts);
});
server.listen(process.env.PORT || 9999);