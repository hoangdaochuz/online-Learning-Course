import React from "react";
import SignInForm from "../../form/SignInForm";

const SignupPage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[700px] ">
        <img
          className="w-full object-cover"
          src="https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
          alt=""
        />
      </div>
      <SignInForm margin={true} />
    </div>
  );
};

export default SignupPage;
