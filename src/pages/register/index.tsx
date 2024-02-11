
import loginBackground from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";

import "./style.scss"
import { useFormik } from "formik";
import RegisterSchema from "../../schemas/register";
import useAuth from "../../store/auth";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values, navigate);
    }
  })

  return (
    <section className="register-page">
      <div className="login__main">
        <div className="login__header">
          <h2>Sign up</h2>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
        <form onSubmit={formik.handleSubmit} className="login__form">
          <div className="input__field">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <p className={`error-message ${formik.touched.name && formik.errors.name ? 'active' : ''}`}>
              {formik.touched.name && formik.errors.name ? formik.errors.name : null}
            </p>
          </div>
          <div className="input__field">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <p className={`error-message ${formik.touched.email && formik.errors.email ? 'active' : ''}`}>
              {formik.touched.email && formik.errors.email ? formik.errors.email : null}
            </p>
          </div>

          <div className="input__field">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <p className={`error-message ${formik.touched.password && formik.errors.password ? 'active' : ''}`}>
              {formik.touched.password && formik.errors.password ? formik.errors.password : null}
            </p>
          </div>

          <button type="submit" className="login__btn">Register</button>
        </form>
      </div>
      <div className="background-image">
        <img alt="Login background" src={loginBackground} />
      </div>
    </section>
  )
}

export default RegisterPage;