import React, { useState, Fragment } from "react";
// import {useState} from React;
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Actions from "./Actions";
import ConfirmationDialog from "./Dialog";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "./Table.scss";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
    padding: 15,
  },
});

const Pagination = (props) => {
  const { paging, totalCountPage } = props;
  console.log("props.totalCountPage->>>>>>>", props.totalCountPage);
  const { size } = paging;
  // const requiredPageCount = Math.ceil(totalCountPage / size);
  // console.log("requiredPageCount->>>>>>>", requiredPageCount);
  // let pages = "";
  // for (let i = 1; i <= requiredPageCount; i++) {
  //   pages += `<ul><li>${i}</li> </ul>`;
  // }
  // console.log("pages jsx dynamic----", pages);

  const handleClick = (event) => {
    // this.setState({
    //   currentPage: Number(event.target.id)
    // });
    props.onPageChange(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCountPage / size); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((pgNumber) => {
    return (
      // <li key={pgNumber} id={pgNumber}>
      <li key={pgNumber} id={pgNumber} onClick={handleClick}>
        {pgNumber}
      </li>
    );
  });

  return (
    <div className="pagination">
      <ul>
        <li>Prev</li>
        {renderPageNumbers}
        <li>Next</li>
      </ul>
    </div>
  );
};

function SimpleTable(props) {
  const {
    classes,
    columns,
    isLoading,
    data,
    onEditClickHandler,
    onDeleteClickHandler,
    confirmationDialogContent,
    confirmationDialogTitle,
    sortProp,
    onSort: onSortProp,
    onPageChange: onPageChangeProp,
    pagingProp,
    totalCount,
  } = props;
  console.log("table.js->props->totalCount-------->", totalCount);
  // sortProp={},
  // use state returns 2 things 1. the value 2nd the setter func which will take true/false in our case.
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(
    false
  );
  //if sorting prop is supplied then use that otherwise blank sort to be set in sort prop
  const [sort, setSort] = useState(sortProp || {});
  const [paging, setPaging] = useState(pagingProp || {});
  // console.log("table.js-> sortProp ->", sortProp);
  const [currentRecord, setCurrentRecord] = useState(null);
  let [finalConfirmationMessage, setFinalConfirmationMessage] = useState([]);
  const onCancelConfirmationDialog = () => {
    console.log("onCancelConfirmationDialog is called");
    //on cancel reset everything
    setIsConfirmationDialogOpen(false);
    setCurrentRecord(null);
  };

  const onOkConfirmationDialog = () => {
    // console.log("onOkConfirmationDialog is called...");
    setIsConfirmationDialogOpen(false);
    onDeleteClickHandler(currentRecord);
  };
  // let finalConfirmationMessage = "vinay";
  const handleDelete = (id) => {
    setFinalConfirmationMessage(
      // use fragment to wrap muti items
      // <Fragment>
      //   {confirmationDialogContent}
      //   <br />
      //   {id}
      // </Fragment>
      //2 ways of doing this. either send values as array and while showing final content on diaolog component then render via map or use fragment to wrap muti items
      [confirmationDialogContent, <br />, id]
    );
    setIsConfirmationDialogOpen(true);
    setCurrentRecord(id);
  };
  /* USing Currying */
  // const onSort = (name) => () => {
  //   sortProp.name && setSort({ name, order: "asc" });
  // };
  const onSort = (name) => {
    console.log("table.js->onSort", this);
    //if same col name then toggle otherwise always asc
    let order =
      name == sort.name ? (sort.order == "asc" ? "desc" : "asc") : "asc";

    let _sort = { name, order };
    setSort(_sort);
    // paging from state and sort cooked here
    onSortProp({ paging, sort: _sort }); // calling the parent function also to refetch the data via api
  };
  const onPageChange = (page) => {
    let { size } = paging; // from state.paging
    let _paging = { page, size };
    setPaging(_paging); // saving in current state var

    // sort from state and paging cooked here
    onPageChangeProp({ paging: _paging, sort });
  };
  // console.log("sort in Table", sort);
  const SortIcon = sort.name
    ? sort.order && sort.order.toLowerCase() == "asc"
      ? ArrowUpwardIcon
      : ArrowDownwardIcon
    : null;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell
                  key={col.name}
                  /* USing Currying */
                  //onClick={onSort(col.name)}
                  onClick={() => onSort(col.name)}
                >
                  {col.name.toUpperCase()}
                  {col.name.toLowerCase() == sort.name.toLowerCase() ? (
                    <SortIcon />
                  ) : null}
                </TableCell>
              );
            })}
            <TableCell>{"ACTION"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <CircularProgress />
          ) : (
            data.map((row) => {
              return (
                <TableRow key={row.id}>
                  {columns.map(({ name, render }) => {
                    return (
                      <TableCell key={name + row.id}>
                        {render
                          ? // ? render(row)
                            // : row[name] === "dob"
                            // ? new Date(row[name]).toISOString().split("T")[0]
                            // : row[name]
                            render(row)
                          : row[name]}
                      </TableCell>
                    );
                  })}

                  <TableCell>
                    <Actions
                      record={row}
                      onEdit={onEditClickHandler}
                      onDelete={handleDelete}
                      deleteRecordId={row.id}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <Pagination
        onPageChange={onPageChange}
        paging={paging}
        totalCountPage={totalCount}
      />
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        // open={true}
        handleCancel={onCancelConfirmationDialog}
        handleOk={onOkConfirmationDialog}
        content={finalConfirmationMessage}
        title={confirmationDialogTitle}
      />
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
