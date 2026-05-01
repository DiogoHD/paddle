{/*
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import {
  type FieldErrors,
  type Path,
  type UseFormRegister,
  useForm,
} from "react-hook-form";

const defaultValues = {
  email: "",
  recoveryEmail: "",
  password: "",
};

type FormValues = typeof defaultValues;

function loginInput({
  id,
  msg,
  type,
  label,
  errors,
  register,
  handleClick,
  onFieldChange,
}: React.ComponentProps<"div"> & {
  id: Path<FormValues>;
  msg?: string;
  type: string;
  label: string;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  handleClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onFieldChange?: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-10 w-full">
      <label
        htmlFor={id}
        className="font-suisse-condensed text-xl text-surface950"
      >
        {label}
      </label>
      <input
        className={`w-full py-2 px-4 align-middle font-suisse focus:outline-none border rounded-full ${
          errors[id] ? "border-error600" : "border-surface950"
        }`}
        id={id}
        {...register(id, {
          required: "Campo obrigatório.",
          onChange: () => onFieldChange?.(),
        })}
        type={type}
      />
      <span
        role="alert"
        className={`font-suisse text-xs ${
          errors[id] ? "text-error600" : "cursor-pointer text-primary800"
        }`}
        onClick={handleClick}
      >
        {errors[id]?.message ? String(errors[id]?.message) : msg}
      </span>
    </div>
  );
}

export default function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<FormValues>({ defaultValues });
  const { login } = useAuth();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email, data.password);
      reset();
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.message || "Ocorreu um erro durante o login.",
      });
    }
  };

  return (
    <div className="relative min-h-screen h-screen w-screen overflow-x-hidden overflow-y-auto no-scrollbar">

      <div className="relative z-10 mx-auto w-full max-w-sm md:max-w-none md:w-1/3 min-h-full py-12 flex flex-col items-center bg-white">
        <h2 className="mb-[clamp(4rem,16vh,24rem)] font-suisse-condensed text-4xl text-primary500 text-center">
          Paddle
        </h2>

        {forgotPassword ? (
          <>
            <div className="gap-2 flex flex-col items-center">
              <h1 className="font-suisse-condensed text-6xl text-primary800 text-center">
                Esqueceu a senha?
              </h1>

              <h3 className="max-w-80 text-sm text-surface950 font-suisse text-center">
                Insere o teu email e enviaremos um link para recuperares a tua
                password.
              </h3>
            </div>

            <form
              onSubmit={handleSubmit((data) => {
                reset();
                console.log(
                  "Send email to recover password",
                  data.recoveryEmail,
                );
              })}
              className="w-full max-w-80 flex flex-col"
            >
              {loginInput({
                id: "recoveryEmail",
                label: "Email",
                type: "email",
                msg: "Voltar ao login.",
                errors,
                register,
                handleClick: (e) => {
                  e.stopPropagation();
                  !errors?.recoveryEmail && setForgotPassword(!forgotPassword);
                },
              })}

              <button
                type="submit"
                className="mt-8 w-full max-w-80 py-2 px-4 bg-primary500 text-white font-suisse rounded-full hover:bg-primary600 disabled:bg-primary300 disabled:cursor-not-allowed"
              />
            </form>
          </>
        ) : (
          <>
            <h1 className="font-suisse-condensed text-6xl text-primary800 text-center text-nowrap">
              Iniciar Sessão
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-80 flex flex-col"
            >
              {loginInput({
                id: "email",
                label: "Email",
                type: "email",
                errors,
                register,
                onFieldChange: () => clearErrors("root"),
              })}

              {loginInput({
                id: "password",
                label: "Senha",
                type: "password",
                className: "mt-6",
                msg: "Esqueceste a password?",
                errors,
                register,
                onFieldChange: () => clearErrors("root"),
                handleClick: (e) => {
                  e.stopPropagation();
                  !errors?.password && setForgotPassword(!forgotPassword);
                },
              })}
              {errors.root && (
                <span
                  role="alert"
                  className="mt-4 font-suisse text-xs text-error600 text-center"
                >
                  {errors.root.message}
                </span>
              )}
              <button
                type="submit"
                className="mt-8 w-full max-w-80 py-2 px-4 bg-primary500 text-white font-suisse rounded-full hover:bg-primary600 disabled:bg-primary300 disabled:cursor-not-allowed"
              />
            </form>
          </>
        )}
      </div>

    </div>
  );
}
  */}
