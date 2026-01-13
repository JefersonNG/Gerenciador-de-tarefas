import request from "supertest";
import { app } from "../src/app";
import { prisma } from "../src/database/prisma";

let token: string;
let team_id: number;
let user_id: string;
let task_id: string;

beforeAll(async () => {});

describe("Test (E2E)", () => {
  it("should create user", async () => {
    const user = await request(app).post("/users").send({
      name: "teste",
      email: "teste@email.com",
      password: "123456",
    });

    user_id = user.body.id;

    await prisma.users.update({
      data: {
        role: "admin",
      },
      where: {
        id: user_id,
      },
    });

    expect(user.status).toBe(201);
  });

  it("should create session", async () => {
    const session = await request(app).post("/sessions").send({
      email: "teste@email.com",
      password: "123456",
    });

    token = session.body.token;

    expect(session.status).toBe(200);
    expect(session.body).toHaveProperty("token");
  });

  it("should create team", async () => {
    const team = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "team test",
        description: "criado para teste",
      });

    team_id = team.body.id;

    expect(team.status).toBe(201);
  });

  it("should create task", async () => {
    const task = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "team test",
        description: "criado para teste",
        team_id,
        assigned_to: user_id,
      });

    task_id = task.body.id;

    const deleteTask = await request(app)
      .delete(`/task/${task_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(task.status).toBe(201);
    expect(deleteTask.status).toBe(200);
  });
});

afterAll(async () => {
  await prisma.teams.delete({
    where: {
      id: team_id,
    },
  });

  await prisma.users.delete({
    where: {
      id: user_id,
    },
  });

  await prisma.$disconnect();
});
