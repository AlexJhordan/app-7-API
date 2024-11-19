import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json(req.body);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(200).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({ message: "Usuário deletado." });
});

app.get("/", async function (req: any, res: any) {
  res.send("Hello World");
});

app.listen(3000);
