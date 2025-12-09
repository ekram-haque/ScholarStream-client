import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {signInUser,signInGoogle} = useAuth()

  const handleRegister = (data) => {
    // console.log(data);
    signInUser(data.email, data.password)
    .then((result) => {
        console.log(result.user)
    }).catch((err) => {
        console.log(err)
    });
  };


  const handleGoogleSignIn = () =>{
   signInGoogle()
    .then((result) => {
        console.log(result.user)
    }).catch((err) => {
        console.log(err)
    });

  }

  return (
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div class="card-body">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset class="fieldset">
            <div>
              <h3 className="font-bold text-2xl ">Welcome back, </h3>
              <p>Login to continue</p>
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

            <div>
              <a class="link link-hover text-right">Forgot password?</a>
            </div>
            <button class="btn btn-neutral mt-4">Login</button>

            <div className="flex items-center my-4">
              <hr className="grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="grow border-t border-gray-300" />
            </div>

         
          </fieldset>
        </form>
           {/* Google */}
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
      </div>
    </div>
  );
};

export default Login;
