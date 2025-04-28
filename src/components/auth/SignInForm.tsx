import Button from "../ui/button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../form/controller/InputController";
import { useLoginMutation } from "../../services/user";
import { CookiesStorage } from "../../shared/utils/cookie-storage";
import { StorageKeys } from "../../shared/constants/storage-keys";

type FormValues = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function SignInForm() {
  const loginMutation = useLoginMutation();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    loginMutation.mutate(
      { ...values },
      {
        onSuccess: (response) => {
          const { data, token } = response || {};

          CookiesStorage.setCookieData(StorageKeys.AccessToken, token);
          CookiesStorage.setCookieData(
            StorageKeys.UserInfo,
            JSON.stringify(data)
          );
          window.location.href = "/admin";
        },
      }
    );
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <InputController
                  control={control}
                  name="username"
                  label="Username"
                  required
                />
                <InputController
                  type="password"
                  control={control}
                  name="password"
                  label="Password"
                  required
                />
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    isLoading={loginMutation.isPending}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
