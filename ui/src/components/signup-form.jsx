import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { NavLink } from "react-router";

export function SignupForm({
  className,
  ...props
}) {

  const [errorMsg, setErrorMsg]=useState(null)

  function handleSignin(e){
    e.preventDefault()

    console.log({
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      cpass: e.target.confirmPassword.value
    })

    if(e.target.password.value!==e.target.confirmPassword.value){
      setErrorMsg("Password and Confirm password must be same")
      return
    }

    setErrorMsg(null)
    const registerData={
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    console.log(registerData)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e)=>{handleSignin(e)}} >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" type="text" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirmPassword" type="password" required />
                  </Field>
                </Field>
                {errorMsg && 
                  <FieldDescription className="text-red-500" >
                    {errorMsg}
                  </FieldDescription> 
                }
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <NavLink to="/login" end >Log In</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
