import css from "./LoginForm.module.scss";
import Panel from "../../components/Panel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import warningIcon from "../../assets/warningIcon.svg";

function LoginForm({ warning, handleChange, handleSubmit }) {
  return (
    <Panel className={css.LoginForm}>
      <form className={css.formWrapper} onSubmit={handleSubmit} noValidate>
        <fieldset className={css.inputWrapper}>
          <legend className={css.formTitle}>Log in</legend>
          <label htmlFor="email">Email</label>
          <input
            required={true}
            name="username"
            className={`${css.input} ${warning.username && css.error}`}
            type="text"
            id="email"
            placeholder="Enter email..."
            onChange={handleChange}
          />
          {warning.username && (
            <div className={css.errorContainer}>
              <img src={warningIcon} alt="" />
              <span className={css.errorMessage}>{warning?.username}</span>
            </div>
          )}
          <div className={css.passwordContainer}>
            <label htmlFor="password">Password</label>
            <Link className={css.link} tabIndex="-1">
              Forgot your password?
            </Link>
          </div>
          <input
            required={true}
            name="password"
            className={`${css.input} ${warning.password && css.error}`}
            type="password"
            id="password"
            placeholder="Enter password..."
            onChange={handleChange}
          />
          {warning.password && (
            <div className={css.errorContainer}>
              <img src={warningIcon} alt="" />
              <span className={css.errorMessage}>{warning?.password}</span>
            </div>
          )}
          <input
            className={css.submitButton}
            type="submit"
            id="submit"
            value="Log in"
          />
        </fieldset>
        <hr className={css.divider}></hr>
        <p className={css.text}>Don't have an account yet?</p>
        <Link className={css.link}>
          <p>Create an account</p>
        </Link>
      </form>
    </Panel>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  warning: PropTypes.object.isRequired,
};

export default LoginForm;
