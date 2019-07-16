import request from "supertest";
import app from "../src/app";
import agenda from "../src/agenda";

describe("GET /api", () => {
  describe("get /api/query", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/api/query?searchPhrase=iphone")
        .expect(200);
    });
  });

  describe("post /register", () => {
    beforeEach(async done => {
      const jobs = await agenda.jobs({});
      jobs.forEach(async job => {
        await job.remove();
      });

      done();
    });

    it("should return 200 success true", done => {
      return request(app)
        .post("/api/register")
        .send({
          searchPhrase: "pokemon",
          interval: "10",
          email: "someemail@gmail.com"
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).toBe(true);

          expect(res.body.data).toHaveProperty("_id");
          expect(res.body.data).toHaveProperty("email", "someemail@gmail.com");
          expect(res.body.data).toHaveProperty("searchPhrase", "pokemon");
          expect(res.body.data).toHaveProperty("interval", "10 minutes");

          const { _id, ...data } = res.body.data;
          const { success } = res.body;
          const toSnap = {
            data,
            success
          };

          expect(toSnap).toMatchSnapshot();

          if (err) return done(err);
          done();
        });
    });

    it("should return 200 success false", done => {
      return request(app)
        .post("/api/register")
        .send({
          searchPhrase: "pokemon",
          interval: "10",
          email: "someemail@gmail.com"
        })
        .expect(200)
        .end((e1, r1) => {
          return request(app)
            .post("/api/register")
            .send({
              searchPhrase: "pokemon",
              interval: "10",
              email: "someemail@gmail.com"
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body.success).toBe(false);
              expect(res.body.data).toHaveProperty(
                "message",
                "search phrase already registered"
              );

              expect(res.body).toMatchSnapshot();

              if (err) return done(err);
              done();
            });
        });
    });

    it("should return 200 success true", done => {
      return request(app)
        .post("/api/register")
        .send({
          searchPhrase: "pokemon",
          interval: "10",
          email: "someemail@gmail.com"
        })
        .expect(200)
        .end((e1, r1) => {
          request(app)
            .post("/api/register")
            .send({
              searchPhrase: "pokemon",
              interval: "10",
              email: "someemail2@gmail.com"
            })
            .expect(200)
            .end((err, res) => {
              expect(res.body.success).toBe(true);
              expect(res.body.data).toHaveProperty("_id");
              expect(res.body.data).toHaveProperty(
                "email",
                "someemail2@gmail.com"
              );
              expect(res.body.data).toHaveProperty("searchPhrase", "pokemon");
              expect(res.body.data).toHaveProperty("interval", "10 minutes");

              const { _id, ...data } = res.body.data;
              const { success } = res.body;
              const toSnap = {
                data,
                success
              };

              expect(toSnap).toMatchSnapshot();

              if (err) return done(err);
              done();
            });
        });
    });

    it("should return 200 success false due to wrong interval", done => {
      return request(app)
        .post("/api/register")
        .send({
          searchPhrase: "pokemon",
          interval: "99",
          email: "someemail2@gmail.com"
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.data).toHaveProperty("message", "interval not valid");

          expect(res.body).toMatchSnapshot();

          if (err) return done(err);
          done();
        });
    });
  });

  describe("get /list", () => {
    beforeEach(async done => {
      const jobs = await agenda.jobs({});
      jobs.forEach(async job => {
        await job.remove();
      });

      done();
    });

    it("should return 200 success true empty array", done => {
      return request(app)
        .get("/api/list")
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveLength(0);

          expect(res.body).toMatchSnapshot();

          if (err) return done(err);
          done();
        });
    });

    it("should return 200 success true with 1 elem in data", done => {
      return request(app)
        .post("/api/register")
        .send({
          searchPhrase: "pokemon",
          interval: "10",
          email: "someemail@gmail.com"
        })
        .expect(200)
        .end((err, res) => {
          return request(app)
            .get("/api/list")
            .expect(200)
            .end((err, res) => {
              expect(res.body.success).toBe(true);
              expect(res.body.data).toHaveLength(1);

              expect(res.body.data[0]).toHaveProperty("_id");
              expect(res.body.data[0]).toHaveProperty(
                "email",
                "someemail@gmail.com"
              );
              expect(res.body.data[0]).toHaveProperty(
                "searchPhrase",
                "pokemon"
              );
              expect(res.body.data[0]).toHaveProperty("interval", "10 minutes");

              const { _id, ...data } = res.body.data[0];
              const { success } = res.body;
              const toSnap = {
                data: [data],
                success
              };

              expect(toSnap).toMatchSnapshot();

              if (err) return done(err);
              done();
            });
        });
    });
  });

  describe("delete /api/cancel/id", () => {
    beforeEach(async done => {
      const jobs = await agenda.jobs({});
      jobs.forEach(async job => {
        await job.remove();
      });

      done();
    });

    it("should return 200 success true", done => {
      return request(app)
        .post("/api/register")
        .send({
          searchPhrase: "pokemon",
          interval: "10",
          email: "someemail@gmail.com"
        })
        .expect(200)
        .end((err, res) => {
          const idToDelete = res.body.data._id;
          return request(app)
            .delete(`/api/cancel/${idToDelete}`)
            .expect(200)
            .end((err, res) => {
              expect(res.body.success).toBe(true);

              if (err) return done(err);
              done();
            });
        });
    });

    it("should return 200 success false", done => {
      const idToDelete = "20";
      return request(app)
        .delete(`/api/cancel/${idToDelete}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).toBe(false);

          if (err) return done(err);
          done();
        });
    });
  });
});
