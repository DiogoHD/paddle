import useAuth from "@/hooks/useAuth";
import app_logo from "@/assets/app-logo.png";
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
        className="font-bold text-sm text-gray-800 mb-1"
      >
        {label}
      </label>
      <input
        className="w-full text-black py-2 px-4 align-middle focus:outline-none border rounded-full"
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

export default function LoginPage() {
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
  <div className="min-h-screen w-full bg-white flex flex-col">

    <div className="bg-primary-blue h-[40vh] flex flex-col items-center justify-center pb-12">

      <div className="size-32 rounded-full border-2 border-dashed border-white/80 flex items-center justify-center p-1 mb-4">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
           <img src={app_logo} alt="Logo" className="w-32 h-32 object-contain"/>
        </div>
      </div>
      <p className="text-2xl text-white font-medium">Paddle UC</p>
    </div>

    <div className="flex-1 bg-white -mt-10 rounded-t-[45px] px-8 pt-10 shadow-2xl">
      <div className="w-full max-w-sm mx-auto flex flex-col">
        <h1 className="font-bold text-3xl text-center text-[#061237] mb-8">
          Iniciar Sessão
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-4"
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
            errors,
            register,
            onFieldChange: () => clearErrors("root"),
          })}

          {errors.root && (
            <span role="alert" className="text-xs text-center text-red-600">
              {errors.root.message}
            </span>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="mt-4 w-full py-3 px-4 bg-primary-blue text-white font-bold rounded-full shadow-lg hover:bg-blue-500 transition-colors"
          >
            Iniciar Sessão
          </button>

          {/* Forgot Password Link 
          <button 
            type="button"
            className="text-sm text-blue-400 mt-2 hover:underline"
            onClick={() => setForgotPassword(true)}
          >
            Esqueci minha senha
          </button>
          */}
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-600">
            Ainda não tem conta?
            <span className="text-blue-400 font-bold cursor-pointer hover:underline">
              Cadastre-se aqui
            </span>
          </p>
          
        </div>
      </div>
    </div>
  </div>
  );
}