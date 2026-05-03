import { useAuth } from "@/hooks/useAuth";
import app_logo from "@/assets/app-logo.png";
import {
  type FieldErrors,
  type Path,
  type UseFormRegister,
  useForm,
} from "react-hook-form";

const defaultValues = {
  email: "",
  name: "",
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
  const { signup } = useAuth();

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "As senhas não coincidem." });
      return;
    }
    try {
      await signup(data.email, data.password, data.name);
      reset();
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.message || "Erro ao criar conta.",
      });
    }
  };

 return (
  <div className="h-screen w-full bg-white flex flex-col overflow-hidden">

    <div className="bg-primary-blue h-[40vh] flex flex-col items-center justify-center pb-12 gap-[1vh]">
        <img src={app_logo} alt="Logo" className="h-1/2 object-contain"/>
        <p className="text-[4vh] text-white font-medium">Padel UC</p>
    </div>
    
    <div className="flex-1 bg-white -mt-10 rounded-t-[45px] px-8 pt-8 shadow-2xl overflow-y-auto">
      <div className="w-full max-w-sm mx-auto flex flex-col pb-8">
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
            id: "name",
            label: "Nome",
            type: "text",
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
            className="mt-4 w-full py-3 px-4 bg-primary-blue text-white font-bold rounded-full shadow-lg hover:bg-blue-500 hover:cursor-pointer transition-colors"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
