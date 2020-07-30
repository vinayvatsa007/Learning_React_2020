// //====================== Connect to mySQL ==========================
const expressServer = require("./routers"); // it will fetch the index.js file bydefault
const {
  find,
  findById,
  insertRecord,
  deleteRecord,
  updateRecord,
  totalCount,
} = require("./utils/DbOperation");

expressServer.listen(3010, () => {
  console.log("server started..");
});

// let searchText = { key: "subName", value: "post" };
// const listAssignment = find("assignment", { searchText }).then((data) => {
//   // bcoz find is a promise thus result should be called as .then otherwise it will return promise not the data.
//   console.log("listAssignment -", data);
// });

// const assignmentDetails = findById("assignment", 7).then((data) => {
//   console.log("findById->results", data);
// });

// const objAssignment = {
//     subName: 'update via qmark',
//     assignmentGivenByTeacher: 4,
//     section: 2,
//     assignmentDetails: 'test1',
//     dueDate: new Date().toISOString().split('T')[0] //'2020-04-01'
// };

// const insertAssignmentDetails = insertRecord('assignment',objAssignment).then(data => {
//     const insertedId = data[0]['insertId']
//     console.log(insertedId);
//     // findById('assignment', insertedId).then(data => {
//     //     console.log('----------------Assignment.findById------------\n',data[0]);
//     // });
// });

// const updateAssignmentDetails = updateRecord('assignment',13,objAssignment).then(data => {
//     const affectedRows = data[0]['affectedRows'];
//     console.log(affectedRows);
//     // findById('assignment', insertedId).then(data => {
//     //     console.log('----------------Assignment.findById------------\n',data[0]);
//     // });
// });

// const deleteassignment = deleteRecord( 'assignment', 41).then(data=>{
//     console.log(data[0]['affectedRows']);
// });
// const totalCountAssignment = totalCount("assignment").then((data) =>
//   console.log("data rcvd from totalCount api->", data)
// );
