import "./styles.css";
import theme from "./theme";
import {
  AppBar,
  Toolbar,
  Container,
  CssBaseline,
  ThemeProvider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { enqueueSnackbar, useSnackbar, SnackbarProvider } from "notistack";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Checkbox } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PopUp from "./Dialog.js";
import { useState } from "react";
import dayjs from "dayjs";
import { useImmer } from "use-immer";

function createTask(title, description, date, priority, isComplete) {
  return { title, description, date, priority, isComplete };
}

let rows = [
  createTask(
    "Title 1",
    "Description 1",
    dayjs().format("MM/DD/YY"),
    "low",
    false
  )
];

export default function App() {
  const [addPopUpOpen, openAddPopUp] = useState(false);
  const [editPopUpOpen, openEditPopUp] = useState(false);
  const [todoList, updateTodoList] = useImmer(rows);
  const [selectedRow, setSelectedRow] = useState(rows[0]);
  //open add
  const handleAddOpen = () => {
    openAddPopUp(true);
  };
  //close add
  const handleClose = () => {
    openAddPopUp(false);
  };
  //open edit
  const handleEditOpen = (task) => {
    setSelectedRow(task);
    openEditPopUp(true);
  };
  //close edit
  const handleEditClose = () => {
    openEditPopUp(false);
  };
  //change list
  function handleCheckBox(title) {
    updateTodoList((draft) => {
      const todo = draft.find((a) => a.title === title);
      todo.isComplete = !todo.isComplete;
    });
  }

  //change list by adding
  function handleAddTask(newTask) {
    updateTodoList((draft) => {
      draft.push(newTask);
    });
    enqueueSnackbar("Task added successfully!", {
      variant: "success",
      autoHideDuration: 4000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" }
    });
  }

  //change list by updating
  function handleUpdateTask(title, description, date, priority) {
    updateTodoList((draft) => {
      const todo = draft.find((a) => a.title === title);
      todo.description = description;
      todo.date = date;
      todo.priority = priority;
    });
    enqueueSnackbar("Task updated successfully!", {
      variant: "success",
      autoHideDuration: 4000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" }
    });
  }
  //change list by deleting
  function handleDeleteTask(title) {
    updateTodoList((draft) => {
      const index = draft.findIndex((a) => a.title === title);
      draft.splice(index, 1);
    });
    enqueueSnackbar("Task deleted successfully!", {
      variant: "success",
      autoHideDuration: 4000,
      anchorOrigin: { vertical: "bottom", horizontal: "right" }
    });
  }

  //isComplete functionality - remove update button
  function UpdateButtonShown(props) {
    const complete = props.task.isComplete;
    if (!complete) {
      return (
        <Button
          onClick={() => {
            handleEditOpen(props.task);
          }}
          variant="contained"
          size="large"
          startIcon={<EditIcon />}
          color={"primary"}
          sx={{ width: "130px" }}
        >
          UPDATE
        </Button>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <div>
          <PopUp
            titleList={todoList.map((task) => task.title)}
            open={addPopUpOpen}
            task={createTask("", "", dayjs().format("MM/DD/YY"), "low", false)}
            closes={handleClose}
            add={handleAddTask}
            update={() => {}}
            isAdd={true}
          />
          <PopUp
            titleList={todoList.map((task) => task.title)}
            open={editPopUpOpen}
            task={selectedRow}
            closes={handleEditClose}
            add={() => {}}
            update={handleUpdateTask}
            isAdd={false}
          />
          <CssBaseline />
          <AppBar>
            <Toolbar>
              <Container
                id="header"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    paddingLeft: "40%",
                    paddingRight: "10%"
                  }}
                >
                  <MenuIcon />
                  <span>FRAMEWORKS</span>
                </div>
                <Button
                  onClick={(e) => {
                    handleAddOpen();
                  }}
                  variant="contained"
                  size="large"
                  startIcon={<AddCircleIcon />}
                >
                  ADD
                </Button>
              </Container>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", padding: "16px" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <colgroup>
                <col style={{ width: "16.66%" }} />
                <col style={{ width: "16.66%" }} />
                <col style={{ width: "16.66%" }} />
                <col style={{ width: "16.66%" }} />
                <col style={{ width: "16.66%" }} />
                <col style={{ width: "16.66%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Deadline</TableCell>
                  <TableCell align="center">Priority</TableCell>
                  <TableCell align="center">Is Complete</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todoList.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.priority}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.isComplete}
                        onChange={(e) => {
                          handleCheckBox(row.title);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Container
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <UpdateButtonShown task={row}></UpdateButtonShown>
                        <Button
                          onClick={(e) => {
                            handleDeleteTask(row.title);
                          }}
                          variant="contained"
                          size="large"
                          startIcon={<CancelIcon />}
                          color={"error"}
                          sx={{ width: "130px" }}
                        >
                          DELETE
                        </Button>
                      </Container>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
