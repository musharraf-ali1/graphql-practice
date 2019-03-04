import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
// import { getBookQuery } from '../queries/queries';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap'
//   },
//   margin: {
//     margin: theme.spacing.unit
//   },
//   textField: {
//     flexBasis: 200
//   }
// });
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  }
});
// const ranges = [
//   {
//     value: '0-20',
//     label: '0 to 20'
//   },
//   {
//     value: '21-50',
//     label: '21 to 50'
//   },
//   {
//     value: '51-100',
//     label: '51 to 100'
//   }
// ];
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  submitHandler = () => {
    this.state.username && this.state.password
      ? console.log({
          username: this.state.username,
          password: this.state.password
        })
      : console.log('username and password is required');
  };
  //   displayBookDetails() {
  //     const { book } = this.props.data;
  //     if (book) {
  //       return (
  //         <div>
  //           <h2>{book.name}</h2>
  //           <p>{book.genre}</p>
  //           <p>{book.author.name}</p>
  //           {book.subscribed ? (
  //             <p>status: this book has read by the user </p>
  //           ) : (
  //             <p>status: this book has not yet read by the user </p>
  //           )}
  //           <p>All books by this author:</p>
  //           <ul className="other-books">
  //             {book.author.books.map(item => {
  //               return <li key={item.id}>{item.name}</li>;
  //             })}
  //           </ul>
  //         </div>
  //       );
  //     } else {
  //       return <div>No book selected...</div>;
  //     }
  //   }
  render() {
    const { classes } = this.props;

    return (
      <div id="login-page">
        <TextField
          id="outlined-adornment-username"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          required
          type="text"
          label="Username"
          value={this.state.username}
          onChange={this.handleChange('username')}
          //   InputProps={{
          //     endAdornment: (
          //       <InputAdornment position="end">
          //         <IconButton
          //           aria-label="Toggle password visibility"
          //           onClick={this.handleClickShowPassword}
          //         >
          //           {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
          //         </IconButton>
          //       </InputAdornment>
          //     )
          //   }}
        />

        <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          required
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.submitHandler}
        >
          Sign In
          {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
          <Icon className={classes.rightIcon}>vpn_key</Icon>
        </Button>
        <h4>if you have not made your account till now . Please Sign Up</h4>
        <Button variant="contained" color="primary" className={classes.button}>
          Sign Up
          {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
          <Icon className={classes.rightIcon}>forward</Icon>
        </Button>
      </div>
    );
  }
}

// // export default graphql(getBookQuery, {
// //   options: props => {
// //     return {
// //       variables: {
// //         id: props.bookId
// //       }
// //     };
// //   }
// // })(BookDetails);

// export default LoginPage;
LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
