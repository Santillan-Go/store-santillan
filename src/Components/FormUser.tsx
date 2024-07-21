"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

interface InputElements {
  name: string;
  password: string;
  confirmpassword: string;
}
function FormRegister() {
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm<InputElements>();
  const router = useRouter();
  const [error, setError] = useState<String>("");
  const onSubmit: SubmitHandler<InputElements> = async (data) => {
    const { confirmpassword: _, ...body } = data;
    if (data.confirmpassword != body.password) {
      return setError("Passwords do not match");
    }
    setError("");
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const resJSON = await res.json();
      setError(resJSON.message);
      return;
    }

    //const resJSON = await res.json();
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
      <label htmlFor="name" className="text-gray-400 font-bold block mb-1">
        name
      </label>
      <input
        type="text"
        id="name"
        className="bg-slate-800 w-full text-blue-400 p-2 text-2xl mb-2 block "
        {...register("name", {
          required: {
            value: true,
            message: "name is required",
          },
          minLength: {
            value: 3,
            message: "name must be at least 3 characters",
          },
        })}
      />
      {errors.name && (
        <span className="text-red-600 font-bold block text-center">
          {errors.name.message || ""}
        </span>
      )}

      <label htmlFor="password" className="text-gray-400 font-bold block mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="bg-slate-800 w-full  text-blue-400 p-2 text-2xl mb-2 block"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      {errors.password && (
        <span className="text-red-600 font-bold block text-center">
          {errors.password.message}
        </span>
      )}
      <label
        htmlFor="confirmPassword"
        className="text-gray-400 font-bold block mb-1"
      >
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        className="bg-slate-800 w-full  text-blue-400 p-2 text-2xl mb-2 block"
        {...register("confirmpassword", {
          required: {
            value: true,
            message: "Confirm Password is required",
          },
        })}
      />

      {errors.confirmpassword && (
        <span className="text-red-600 font-bold block text-center ">
          {errors.confirmpassword.message}
        </span>
      )}
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <input
          type="submit"
          value={"Register"}
          className="bg-blue-500 text-white font-bold text-2xl  hover:bg-blue-700 hover:cursor-pointer w-1/2 text-center  rounded p-1 ml-auto mr-auto block "
        />
        {error && (
          <p className="text-red-500 font-bold text-center text-2xl w-full ">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

export default FormRegister;

interface InputsLogin {
  name: string;
  password: string;
  confirmpassword: string;
}
export function FormLogin() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();

  const onSubmit: SubmitHandler<InputsLogin> = async (data) => {
    const res: any = await signIn("credentials", {
      name: data.name,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    console.log(res);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.ok) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 ">
      <label htmlFor="name" className="text-gray-400 font-bold block mb-1">
        name
      </label>
      <input
        type="text"
        id="name"
        className="bg-slate-800 w-full text-blue-400 p-2 text-2xl mb-2 block "
        {...register("name", {
          required: {
            value: true,
            message: "name is required",
          },
          minLength: {
            value: 3,
            message: "name must be at least 3 characters",
          },
        })}
      />
      {errors.name && (
        <span className="text-red-600 font-bold block text-center">
          {errors.name.message || ""}
        </span>
      )}
      <label htmlFor="password" className="text-gray-400 font-bold block mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="bg-slate-800 w-full text-blue-400 p-2 text-2xl mb-2 block"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      {errors.password && (
        <span className="text-red-600 font-bold block text-center">
          {errors.password.message}
        </span>
      )}
      <input
        type="submit"
        value={"Log in"}
        className="bg-blue-500 text-white font-bold text-2xl  hover:bg-blue-700 hover:cursor-pointer w-1/2 text-center  rounded p-1 ml-auto mr-auto block "
      />
      {error && (
        <p className="text-red-500 font-bold text-center text-2xl w-full ">
          {error}
        </p>
      )}
    </form>
  );
}
