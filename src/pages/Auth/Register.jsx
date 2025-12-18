import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegister = (data) => {
    console.log(data);

    const profileImage = data.photoURL[0];

    ///////////////////
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        const formdata = new FormData();
        formdata.append("image", profileImage);

        const image_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_api_key
        }`;

        axios.post(image_api_url, formdata).then((res) => {
          console.log("after upload", res.data.data.url);

          const userInfo = {
            name:data.name,
            email: data.email,
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created to db");
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then((result) => {
              console.log("profile update successfully", result);
              navigate(location.state || "/");
              localStorage.setItem("access-token", res.data.token);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset class="fieldset">
            <div>
              <h3 className="font-bold text-2xl ">New to ScholarStream! </h3>
              <p>create your space here</p>
            </div>
            {/* Username */}
            <div>
              <label className="block ">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w- p-2 input  rounded"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">Username is required</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block ">Photo URL</label>
              <input
                type="file"
                placeholder="Enter photo URL"
                className=" p-2 input rounded file-input"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm">Photo URL is required</p>
              )}
            </div>
            {/* email */}
            <label class="label">Email</label>
            <input
              type="email"
              class="input"
              placeholder="Email"
              {...register("email", { required: true })}
            />

            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-500">
                email is required
              </p>
            )}

            {/* Password */}
            <label class="label">Password</label>
            <input
              type="password"
              class="input"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
            />

            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500">
                password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p role="alert" className="text-red-500">
                password should be 6 character
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p role="alert" className="text-red-500">
                password must have an upper case , an lower case,one number ,
                one special character
              </p>
            )}

            <button class="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p>
            Already have an account{" "}
            <Link
              state={location.state}
              to={`/authentication/login`}
              className="text-secondary hover:underline hover:font-bold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
