// table wise routers management i.e. for assignment - add/update/delete routes will be in this file
// we will define all the routes here thus instead of entire express we just need the express.Router

const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  find,
  findById,
  insertRecord,
  updateRecord,
  deleteRecord,
  totalCount,
  getResultsByQuery,
} = require("../utils/DbOperation");
const { getSummarizedData } = require("../utils/index");

// if we write multiple routes then its mandatory to do resp.send otherwise it won't allow to go next API and will behave unexpectedly
router.get(
  "/",
  asyncHandler(async (req, resp) => {
    // find('assignmentsss', req.query).then(data => { // bcoz find is a promise thus result should be called as .then otherwise it will return promise not the data.
    //     resp.send(data);
    // })
    // .catch(error=> {throw error});
    try {
      // resp.send('hello1');
      // console.log('req Params..........',req.params);
      // console.log('req query..........',req.query);
      const data = await find("assignment", req.query);
      resp.send(data);
    } catch (error) {
      console.log("Assignment_Find_error_thrown", error);
      throw error;
    }
  })
);
router.get("/totalCount", (req, resp) => {
  // resp.send('get by id' + req.params.id);
  totalCount("assignment").then((data) => {
    // console.log("server side assignment service resp-", data);
    resp.send(data);
  });
});
router.get("/subject-wise-count", (req, resp) => {
  getResultsByQuery("select id, subName from assignment").then((data) => {
    resp.send(getSummarizedData(data, "subName"));
  });
});
router.get("/:id", (req, resp) => {
  // resp.send('get by id' + req.params.id);
  findById("assignment", req.params.id).then((data) => {
    resp.send(data);
  });
});

//using async await
router.post("/add", async (req, resp) => {
  console.log("add--->", req.body);
  try {
    const data = await insertRecord("assignment", req.body);
    console.log("router->assignment->post-data", data);
    resp.send(data);
  } catch (error) {
    resp.send(error);
  }
});

// router.post("/add", (req, resp) => {
//   console.log("add--->", req.body);
//   insertRecord("assignment", req.body).then((data) => {
//     resp.send(data);
//   });
// });

//using call back
// router.post('/add', (req, resp) => {
//     // console.log('add--->', req.body);
//     insertRecord('assignment', req.body).then(data => {
//         const insertedId = data[0]['insertId']
//         console.log(insertedId);
//         resp.send('add api working fine!!!!!' + insertedId);
//     });
// });
// using async await
router.put("/update/:id", (req, resp) => {
  // console.log('update request', req.body);
  updateRecord("assignment", req.params.id, req.body).then((data) => {
    resp.send(data);
  });
});

//using callback
// router.put('/update/:id', (req, resp) => {
//     // console.log('update request', req.body);
//     updateRecord('assignment', req.params.id, req.body).then(data => {
//         const affectedRows = data[0]['affectedRows'];
//         console.log("update api working fine !!!!! Records updated ---------", affectedRows);
//         resp.send('update api working fine !!!!! Records updated ---------' + affectedRows);
//     });
// });

//Via AsyncAwait
router.delete("/delete/:id", (req, resp) => {
  // console.log('delete request', req.body);
  deleteRecord("assignment", req.params.id).then((data) => {
    resp.send(data);
  });
});
// //old method via callbacks
// router.delete('/delete/:id', (req, resp) => {
//     // console.log('delete request', req.body);
//     deleteRecord('assignment',req.params.id).then(data => {
//         const affectedRows = data[0]['affectedRows'];
//         console.log("delete api working fine !!!!! Records deleted ---------", affectedRows);
//         resp.send('delete api working fine !!!!! Records deleted ---------' + affectedRows);
//     });
// });

module.exports = router;
