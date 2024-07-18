import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { toast } from "react-toastify";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    userName: "",
    phoneNumber: "",
    alternateNumber: "",
    email: "",
    v_number: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.phoneNumber === credentials.alternateNumber) {
      toast.error("Alternate number cannot be same as phone number");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password should be same as confirm password");
      return;
    }

    setLoading(true);

    const response = await registerUser(credentials);

    if (response.data.status === true) {
      // setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      toast.error(response.data.message || "Some error occured");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfPasswordVisibility = () => {
    setShowConfPassword((prevState) => !prevState);
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="title mb-5 fw-bold">SIGN UP</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="full name"
                name="userName"
                onChange={handleChange}
                value={credentials.userName}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={credentials.email}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                placeholder="phone number"
                name="phoneNumber"
                onChange={handleChange}
                value={credentials.phoneNumber}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="text"
                placeholder="Alternate number"
                name="alternateNumber"
                onChange={handleChange}
                value={credentials.alternateNumber}
              />
            </div>
          </div>
          <div className="col-12">
            <label for="inputAddress2" class="mt-2 opacity-50">Separate multiple vehicle numbers with a comma.Ex:- AS11... , WB11..</label>
            <div class="input-wrapper">
              <i class="fas fa-car"></i>
              <input 
                type="text" 
                class="form-control input-field2" 
                id="inputAddress2" 
                name="v_number"
                onChange={handleChange}
                value={credentials.v_number}
                placeholder="Vehicle Numbers.." 
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                className="pe-5"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={credentials.password}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "20px",
                }}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-field">
              <i className="fas fa-key"></i>
              <input
                className="pe-5"
                type={showConfPassword ? "text" : "password"}
                placeholder="repeat password"
                name="confirmPassword"
                onChange={handleChange}
                value={credentials.confirmPassword}
              />
              <span
                className="password-toggle"
                onClick={toggleConfPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "20px",
                }}
              >
                {showConfPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </div>
          </div>
        </div>
        {/* Password */}
        {/* <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            className="pe-5"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
          />
          <span
            className="password-toggle"
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "20px",
            }}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </span>
        </div> */}
        {/* Confirm Password */}
        {/* <div className="input-field">
          <i className="fas fa-key"></i>
          <input
            className="pe-5"
            type={showConfPassword ? "text" : "password"}
            placeholder="repeat password"
            name="confirmPassword"
            onChange={handleChange}
            value={credentials.confirmPassword}
          />
          <span
            className="password-toggle"
            onClick={toggleConfPasswordVisibility}
            style={{
              position: "absolute",
              right: "20px",
            }}
          >
            {showConfPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </span>
        </div> */}
        {loading ? (
          <div
            className="btn btn-outline-success me-3 my-3 "
            style={{ width: "7rem" }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Signing in...</span>
            </div>
          </div>
        ) : (
          <input
            type="submit"
            value="Signup"
            className="btn btn-outline-success w-50 btn-lg my-3"
          />
        )}
      </form>
    </>
  );
};

export default Signup;
