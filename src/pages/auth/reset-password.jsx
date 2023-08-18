import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Caption, Input, Subtitle, Title, toast } from "@/components/common";
import { useTitle } from "@/hooks";
import { useResetPasswordMutation } from "@/store/api";
import { getRegexPatternFromKey } from "@/utils";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { code } = useParams();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleReset = async (e) => {
    e.preventDefault();
    await resetPassword({
      code,
      data: {
        new_password: e.target.password.value
      }
    })
      .unwrap()
      .then(() => {
        toast({ title: "Password reset successfully!" });
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      });
  };

  useTitle("Reset Password | Bashaway");

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center px-6 sm:px-16">
      <form className="w-full max-w-form flex flex-col items-center gap-5" onSubmit={handleReset}>
        <div className="flex flex-col items-center gap-3 md:gap-2 mb-6 pointer-events-none">
          <Title>Reset Password</Title>
          <Subtitle className="lg:text-center">
            Please enter your new password. This will invalidate the previous password.
          </Subtitle>
        </div>
        <Input
          className="p-4"
          placeholder="New Password"
          type="password"
          name="password"
          pattern={getRegexPatternFromKey("password").regex}
          title={getRegexPatternFromKey("password").title}
          required
        />
        <Button className="w-full h-14 sm:h-16 text-[20px] mt-6" loading={isLoading}>
          Reset
        </Button>
        <span>
          <Caption className="text-black/40 mr-1.5">Remembered your password?</Caption>
          <Link to="/login">
            <Caption className="link">Login</Caption>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
