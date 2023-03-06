import {
  CheckCircleOutline,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";

export const List = ({ todos, handleDelete, handleComplete, handleUpdate }) => {
  const deleteItem = (itemId) => {
    handleDelete(itemId);
  };
  const completeItem = (item) => {
    handleComplete(item);
  };
  const updateItem = (itemId) => {
    handleUpdate(itemId);
  };
  return (
    <>
      <div className="list">
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          marginTop={2}
        >
          <Container fluid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {todos.map((item) => {
                  return (
                    <Card
                      key={item?.id}
                      sx={{
                        marginTop: 2,
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="#1f4e5f"
                        style={{
                          textDecoration: item?.isCompleted
                            ? "line-through"
                            : "",
                          color: item?.isCompleted ? "green" : "",
                        }}
                      >
                        {item?.value}
                      </Typography>
                      <div className="action">
                        <IconButton onClick={() => completeItem(item.id)}>
                          <CheckCircleOutline />
                        </IconButton>
                        <IconButton onClick={() => updateItem(item.id)}>
                          <EditOutlined />
                        </IconButton>
                        <IconButton onClick={() => deleteItem(item.id)}>
                          <DeleteOutlined />
                        </IconButton>
                      </div>
                    </Card>
                  );
                })}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </div>
    </>
  );
};
