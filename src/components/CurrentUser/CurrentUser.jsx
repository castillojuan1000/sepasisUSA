import React, { useContext } from 'react';
import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { signOut } from '../../firebase'
import ProfilePic from '../../photos/welcome.jpg';
import { Link } from 'react-router-dom'



const CurrentUser = ({ uid, displayName, photoURL, email, createdAt }) => {
  console.log(displayName)

  const cardStyles = useStyles();
  const mediaStyles = useSlopeCardMediaStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();

  const capitalizeName = displayName ? (displayName.charAt(0).toUpperCase() + displayName.slice(1)) : '';
  const userProfilePic = photoURL ? (photoURL) : (ProfilePic);





  return (
    <Card className={cx(cardStyles.root, shadowStyles.root)}>
      <CardMedia
        classes={mediaStyles}
        image={ProfilePic}
      />
      <Link to='profile'>
        <Avatar className={cardStyles.avatar} src={userProfilePic} />
      </Link>
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={textCardContentStyles}

          heading={capitalizeName}
          body={email}
        />
      </CardContent>
      <Box px={2} pb={2} mt={-1}>
        <MyButton
          type="submit"
          value="Submit"
          color="red"
          onClick={signOut}
        >
          Sign Out
        </MyButton>
      </Box>
    </Card>
  );
};

export default CurrentUser;

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto"
  },
  content: {
    padding: 24
  },
  avatar: {
    width: 80,
    height: 80,
    border: "2px solid #fff",
    margin: "-48px 32px 0 auto",
    "& > img": {
      margin: 0
    }
  }
}));



//?buttons
const styles = {
  root: {
    background: props =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
    width: '80%'
  },
};

function MyButtonRaw(props) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

MyButtonRaw.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['blue', 'red']).isRequired,
};

const MyButton = withStyles(styles)(MyButtonRaw);