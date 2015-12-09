"use strict";
/**
 * Dependencies
 */

describe("User", () => {



  it("index all user", (done) => {

    request.get("/rest/user/")
    .expect(200)
    .end((error, res) => {
      res.body.users.should.be.Array;
      res.body.users[0].id.should.greaterThan(0);
      done(error);
    });

  });

});
