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
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter" && input) {
      let obj = {
        id: todos.length + 1,
        value: input,
      };
      setTodos([...todos, obj]);
      setInput("");
      console.log("tosos", todos);
    }
  };
  const handleSubmit = () => {
    let obj = {
      id: todos.length + 1,
      value: input,
    };
    setTodos([...todos, obj]);
    setInput("");
  };

  const handleDelete = (itemId) => {
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
                <Typography
                  variant="h5"
                  color="#1f4e5f"
                  fontWeight={"bold"}
                  align={"center"}
                >
                  Advance Todo App
                </Typography>

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
                          <IconButton onClick={handleSubmit}>
                            <AddCircleIcon
                              fontSize="large"
                              color="primary"
                              sx={{ cursor: "pointer" }}
                            />
                          </IconButton>
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
      />
    </div>
  );
}

export default App;
