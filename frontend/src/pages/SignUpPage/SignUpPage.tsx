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
  number: "",
  password: "",
  confirmPassword: "",
};

type FormValues = typeof defaultValues;

function registerInput({
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
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className="font-bold text-sm text-black mb-1"
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

export default function SignUpPage() {
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
      <p className="text-2xl text-white font-medium">Padle UC</p>
    </div>

    <div className="flex-1 bg-white -mt-10 rounded-t-[45px] px-8 pt-8 shadow-2xl">
      <div className="w-full max-w-sm mx-auto flex flex-col">
        <h1 className="font-bold text-3xl text-center text-black mb-8">
          Criar Conta
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col space-y-4"
        >
          {registerInput({
            id: "email",
            label: "Email",
            type: "email",
            errors,
            register,
            onFieldChange: () => clearErrors("root"),
          })}

          {registerInput({
            id: "number",
            label: "Número",
            type: "number",
            errors,
            register,
            onFieldChange: () => clearErrors("root"),
          })}

          {registerInput({
            id: "password",
            label: "Senha",
            type: "password",
            errors,
            register,
            onFieldChange: () => clearErrors("root"),
          })}

          {registerInput({
            id: "confirmPassword",
            label: "Confirmar Senha",
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

          <button
            type="submit"
            className="mt-4 w-full py-3 px-4 bg-primary-blue text-white font-bold rounded-full shadow-lg hover:bg-blue-500 transition-colors"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
