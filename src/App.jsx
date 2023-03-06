import "./App.css";
import { List } from "./components/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SaveRounded } from "@mui/icons-material";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsupdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(todos);

  useEffect(() => {
    if (search) {
      setFilteredData(
        todos.filter((item) => {
          return item.value.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
    console.log(filteredData);
  }, [search]);

  const handleChange = (e) => {
    if (search) {
      setSearch("");
    }
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && input && !isUpdate) {
      let obj = {
        id: todos.length + 1,
        value: input,
      };
      setTodos([...todos, obj]);
      setInput("");
      console.log("tosos", todos);
    } else if (e.key == "Enter" && input && isUpdate) {
      console.log("in else if");

      setTodos(
        todos.map((todo) => {
          if (todo.id === selectedItem.id) {
            return { ...todo, value: input };
          }
          return todo;
        })
      );
      setIsupdate(false);
      setInput("");
      console.log("toddddd", todos);
    } else {
      return;
    }
  };
  const handleSubmit = () => {
    if (input && isUpdate) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === selectedItem.id) {
            return { ...todo, value: input };
          }
          return todo;
        })
      );
      setIsupdate(false);
      setInput("");
      console.log("toddddd", todos);
    } else {
      let obj = {
        id: todos.length + 1,
        value: input,
      };
      setTodos([...todos, obj]);
      setInput("");
    }
  };

  const handleDelete = (itemId) => {
    if (search) {
      setFilteredData(
        todos.filter((item) => {
          return item.id!== itemId;
        })
      );
    }
    let modifiedTodos = todos.filter((todo) => todo.id !== itemId);
    setTodos(modifiedTodos);
  };
  const handleComplete = (itemId) => {
    let list = todos.filter((todo) => {
      let item = {};

      if (todo.id == itemId) {
        todo.isCompleted = true;
        item = { ...todo };
      } else {
        item = { ...todo, isCompleted: false };
      }
      return item;
    });
    setTodos(list);
  };
  const handleUpdate = (itemId) => {
    // setIsupdate(true);

    setSelectedItem(
      todos.find((todo) => {
        if (todo.id === itemId) {
          setInput(todo.value);
          setIsupdate(true);

          return todo;
        }
      })
    );
  };

  return (
    <div className="MainContainer">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Container fluid>
          <Grid item xs={12} md={12} lg={12}>
            <Card
              sx={{ marginTop: 5, marginLeft: "auto", marginRight: "auto" }}
            >
              <CardContent>
                <div
                  className="top"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="#1f4e5f"
                    fontWeight={"bold"}
                    // align={"center"}
                  >
                    Advance Todo App
                  </Typography>

                  <TextField
                    variant="outlined"
                    label="Search ..."
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div
                  className="addTodo"
                  style={{
                    marginLeft: "5rem",
                    marginRight: "5rem",
                    marginTop: "2rem",
                  }}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    label="What's in your mind?"
                    InputProps={{
                      sx: {
                        "& input": {
                          color: "#1f4e5f",
                        },
                      },

                      endAdornment: (
                        <InputAdornment position="end">
                          {isUpdate ? (
                            <IconButton onClick={handleSubmit}>
                              <SaveRounded
                                fontSize="large"
                                color="primary"
                                sx={{ cursor: "pointer" }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton onClick={handleSubmit}>
                              <AddCircleIcon
                                fontSize="large"
                                color="primary"
                                sx={{ cursor: "pointer" }}
                              />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Grid>

      <List
        todos={todos}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        handleUpdate={handleUpdate}
        filteredData={filteredData}
        search={search}
      />
    </div>
  );
}

export default App;
