import theme from "./theme";
import * as React from "react";
import { blue, red, grey } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Dialog, TextField, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import { Toolbar, Container, ThemeProvider, useTheme } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function createTask(title, description, date, priority, isComplete) {
  return { title, description, date, priority, isComplete };
}

function PopUp(props) {
  const { task, closes, update, add, open, isAdd, titleList } = props;
  //title
  const [title, setTitle] = useState(task.title);
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [titleNotif, setTitleNotif] = useState("");
  //description
  const [description, setDescription] = useState(task.description);
  const [descriptionEmpty, setDescriptionEmpty] = useState(false);
  const [descriptionNotif, setDescriptionNotif] = useState("");
  //date
  const [date, setDate] = useState(dayjs(task.date));
  const [dateEmpty, setDateEmpty] = useState(false);
  const [dateNotif, setDateNotif] = useState("");
  //priority
  const [priority, setPriority] = useState(task.priority);
  const [priorityEmpty, setPriorityEmpty] = useState(false);
  const [priorityNotif, setPriorityNotif] = useState("");

  //components needs to fetch data after render
  //so can change in update
  useEffect(() => {
    setDescription(task.description);
    setDate(dayjs(task.date));
    setPriority(task.priority);
  }, [task.description, task.date, task.priority]);

  const handleTitle = (value) => {
    setTitle(value);
    if (value.length === 0) {
      setTitleEmpty(true);
      setTitleNotif("Title Required!");
    } else {
      setTitleEmpty(false);
      setTitleNotif("");
    }
    if (titleList.includes(value)) {
      setTitleEmpty(true);
      setTitleNotif("Title Not Unique!");
    }
  };
  const handleDescription = (value) => {
    setDescription(value);
    if (value.length === 0) {
      setDescriptionEmpty(true);
      setDescriptionNotif("Description Required!");
    } else {
      setDescriptionEmpty(false);
      setDescriptionNotif("");
    }
  };
  const handleDate = (value) => {
    setDate(value);
    if (value === null) {
      setDateEmpty(true);
      setDateNotif("Date Required!");
    } else {
      setDateEmpty(false);
      setDateNotif("");
    }
  };

  const handlePriority = (value) => {
    setPriority(value);
    if (value.length === 0) {
      setPriorityEmpty(true);
      setPriorityNotif("Priority Required!");
    } else {
      setPriorityEmpty(false);
      setPriorityNotif("");
    }
  };

  const handleClose = () => {
    if (task) {
      handleTitle(task?.title);
      handleDescription(task?.description);
      handleDate(dayjs(task?.date));
      handlePriority(task?.priority);
    }
    setTitleEmpty(false);
    setTitleNotif("");
    setDescriptionEmpty(false);
    setDescriptionNotif("");
    setDateEmpty(false);
    setDateNotif("");
    setPriorityEmpty(false);
    setPriorityNotif("");
    closes();
  };

  const theme = useTheme();
  const colors = theme.palette;
  const addPopUpHead = () => {
    return (
      <Toolbar
        sx={{
          backgroundColor: blue[800],
          paddingLeft: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          color: "white"
        }}
      >
        <AddCircleIcon></AddCircleIcon>
        <p>Add Task</p>
      </Toolbar>
    );
  };

  const handleAdd = () => {
    validate();
    if (
      !titleList.includes(title) &&
      title.length !== 0 &&
      description.length !== 0 &&
      date !== null &&
      priority.length !== 0
    ) {
      add(
        createTask(
          title,
          description,
          date.format("MM/DD/YY"),
          priority,
          task.isComplete
        )
      );
      setDate(dayjs());
      setTitle("");
      setDescription("");
      setPriority("low");
      handleClose();
    }
  };
  const addButton = () => {
    return (
      <Button
        onClick={(e) => {
          handleAdd();
        }}
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        color={"primary"}
        sx={{ width: "110px", margin: "5px" }}
      >
        ADD
      </Button>
    );
  };
  const editPopUpHead = () => {
    return (
      <Toolbar
        sx={{
          backgroundColor: blue[800],
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          color: "white"
        }}
      >
        <EditIcon></EditIcon>
        <p>Edit Task</p>
      </Toolbar>
    );
  };
  const handleEdit = () => {
    validate();
    if (
      title.length !== 0 &&
      description.length !== 0 &&
      date != null &&
      priority.length !== 0
    ) {
      update(task.title, description, date.format("MM/DD/YY"), priority);
      handleClose();
    }
  };

  const editButton = () => {
    return (
      <Button
        onClick={(e) => {
          handleEdit();
        }}
        variant="contained"
        size="large"
        startIcon={<EditIcon />}
        color={"primary"}
        sx={{ width: "110px", margin: "5px" }}
      >
        EDIT
      </Button>
    );
  };
  const head = () => {
    return (
      <TextField
        value={title}
        onChange={(e) => handleTitle(e.target.value)}
        error={titleEmpty}
        helperText={titleNotif}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        sx={{ width: "280px", paddingBottom: "32px" }}
      />
    );
  };

  const validate = () => {
    if (title.length === 0) {
      setTitleEmpty(true);
      setTitleNotif("Title is Required!");
    }
    if (titleList.includes(title)) {
      setTitleEmpty(true);
      setTitleNotif("Title must be unique!");
    }
    if (description.length === 0) {
      setDescriptionEmpty(true);
      setDescriptionNotif("Description is Required!");
    }
    if (priority.length === 0) {
      setPriorityEmpty(true);
      setPriorityNotif("Priority is Required!");
    }
    if (date === null) {
      setDateEmpty(true);
      setDateNotif("Date is Required!");
    }
  };

  return (
    //Choosing an option immediately commits the option and closes the menu
    //Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog
    <ThemeProvider theme={theme}>
      <Dialog closes={handleClose} open={open}>
        {!isAdd && editPopUpHead()}
        {isAdd && addPopUpHead()}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "32px 32px 18px 32px"
          }}
        >
          {isAdd && head()}
          <TextField
            value={description}
            onChange={(e) => handleDescription(e.target.value)}
            error={descriptionEmpty}
            validation={descriptionNotif}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{ width: "280px", paddingBottom: "32px" }}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ width: "280px", marginBottom: "24px" }}
          >
            <DatePicker
              label="Date"
              value={date}
              onChange={handleDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={dateEmpty}
                  validation={dateNotif}
                />
              )}
            />
          </LocalizationProvider>
          <FormControl
            sx={{ width: "280px", marginTop: "24px" }}
            error={priorityEmpty}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Priority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={priority}
              onChange={(e) => handlePriority(e.target.value)}
            >
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="med" control={<Radio />} label="Med" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
            {priorityEmpty && (
              <FormHelperText error>{priorityNotif}</FormHelperText>
            )}
          </FormControl>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: "5px!important"
          }}
        >
          {!isAdd && editButton()}
          {isAdd && addButton()}
          <Button
            onClick={(e) => {
              handleClose();
            }}
            variant="contained"
            size="large"
            startIcon={<DoNotDisturbAltIcon />}
            color={"error"}
            sx={{ width: "110px", margin: "5px" }}
          >
            CANCEL
          </Button>
        </Container>
      </Dialog>
    </ThemeProvider>
  );
}
export default PopUp;
