import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../App";

import Actions from "./Actions";
import moment from "moment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard(props) {
  const { user, _id, title, content, image, createdOn } = props.post;
  const { auth } = React.useContext(AuthContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{ Width: 345, borderRadius: "10px" }} id={_id} elevation={14}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
              {user.name.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={auth.id === user.id && <Actions id={_id} />}
          title={title}
          subheader={moment(createdOn).fromNow()}
        />
        <CardMedia
          component="img"
          height="494"
          image={image}
          alt={user}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content.slice(0, 20)} ..... To read more on the article click on
            the drop down arrow
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {/* <LikeButton /> */}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ color: "primary.main" }} paragraph>
              Football News:
            </Typography>
            <Typography paragraph>{content}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
