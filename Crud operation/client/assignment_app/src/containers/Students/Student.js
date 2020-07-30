import React, { useState, useEffect, Fragment } from "react";
import StudentService from "../../services/Student";
import WrapperForm from "./Form/index";
import Table from "../../components/Table";
import withAuthentication from "../../components/withAuthentication";
import Avatar from "@material-ui/core/Avatar";
import avatarImg from "../../assets/images/studentImagePng.png";
import avatarGirlImg from "../../assets/images/studentGirlDefault.png";

const studentService = new StudentService();

// const getImgSrcFromBlob = (photoBuffer = {}) => {
//   let readerObj = new FileReader();

//   setTimeout(() => {
//     console.log("photoBuffer", photoBuffer);
//     const intArray = new Uint8Array(photoBuffer.data);
//     const blobObject = new Blob([intArray], { type: "image/png" });

//     readerObj.readAsDataURL(blobObject);

//     console.log("readerObj", readerObj);
//   });
//   return readerObj.result;
// };

const TABLE_COLUMNS = [
  // {
  //   name: "photo",
  //   render: ({ photo }) => {
  //     console.log("Student.js-> photo", photo);
  //     return (
  //       // photo && (
  //       //   <Avatar alt="na3" src={"data:image/png;base64,".concat(photo)} />
  //       // )
  //       photo ? (
  //         <Avatar alt="na3" src={"data:image/png;base64,".concat(photo)} />
  //       ) : (
  //         <Avatar alt="na3" src={null} />
  //       )

  //       // <Fragment>
  //       //   {photo && (
  //       //     <Avatar alt="na3" src={"data:image/png;base64,".concat(photo)} />
  //       //   )}
  //       // </Fragment>
  //     );
  //   },
  // },
  {
    // when we don't want to show direct db values but wish to do some manipulation then we can do through render function.
    // we can give the direct component definition using render key or can define the component first in some file and then just pass on that component here.
    name: "photo",
    render: ({ photo }) =>
      photo ? (
        <Avatar alt="na3" src={"data:image/png;base64,".concat(photo)} />
      ) : (
        <Avatar alt="na3" src={null} />
      ),
  },
  { name: "id" },
  { name: "name", render: ({ name }) => <i>{name}</i> },
  {
    name: "dob",
    render: ({ dob }) => new Date(dob).toISOString().split("T")[0],
  },
  { name: "gender" },
  { name: "currentClassId" },
  { name: "admissionNumber" },
  { name: "organizationId" },
  { name: "branchId" },
  {
    name: "transportMode",
    render: ({ transportMode }) => <b>{transportMode}</b>,
  },
];
const Student = () => {
  // useState is a function thus use accordingly.
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [editRecordId, setEditRecordId] = useState(0);

  const [editRecord, setEditRecord] = useState({});
  // console.log(
  //   "checking the value of edit record just below the state vars---",
  //   editRecord
  // );

  // takes 2 params retuns not to be captured as of now-   useEffect(callback, array);
  useEffect(() => {
    listStudent();
    // let searchText = { key: "subName", value: this.state.searchText };
    // console.log("COMPONENT DID MOUNT IN STUDENT\n\n\n");
  }, []);
  const listStudent = async () => {
    setIsLoading(true);
    const { results } = await studentService.find();
    setList(results);
    setIsLoading(false);
  };
  const onClose = (refetchList = false) => {
    setIsFormOpen(false);
    // if (refetchList) {
    //   //call the find api again to refetch the list.
    //   console.log("refetch the list?");
    // }
  };

  const onEdit = (record) => {
    setIsFormOpen(true);
    setEditRecordId(record.id);
  };
  const onDelete = async (id) => {
    console.log("deleting record id =>", id);
    if (id) {
      const result = await studentService.deleteRecord(id);
      if (result.success) {
        console.log("Record deleted ", result);
        listStudent();
      } else {
        console.log("Delete operation failed details = ", result);
      }
    }
  };
  const onAddStudent = () => {
    // console.log("add clicked");
    setEditMode(false);
    setIsFormOpen(true);
  };
  // const onSave = (id) => {

  // };

  return (
    <div>
      <button
        id="btnAddStudent"
        style={{ float: "right" }}
        onClick={onAddStudent}
      >
        Add Student
      </button>
      <Table
        columns={TABLE_COLUMNS}
        isLoading={isLoading}
        data={list}
        onEditClickHandler={onEdit}
        onDeleteClickHandler={onDelete}
        confirmationDialogTitle={"Confirm delete student"}
        confirmationDialogContent={"Are you sure to delete the student record?"}
      />

      {isFormOpen && (
        <WrapperForm
          isFormOpen={isFormOpen}
          onClose={onClose}
          // onSave={onSave}
          // onChangeField={onChangeField}
          //data={record}
          id={editRecordId}
        />
      )}
    </div>
  );
};

export default withAuthentication(Student);
