"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

const signUpSchema = z.object({
  email: z.email().max(128).nonempty(),
  password: z.string().min(10).max(256).nonempty(),
  name: z.string().min(2).max(128).nonempty(),
  nickname: z.string().max(128).optional(),
});
type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Form1() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data: SignUpSchema) => console.log(data);
  const email = useWatch({
    control,
    name: "email",
  });

  useEffect(() => {
    console.log(`email 업데이트: ${email}`);
  }, [email]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="이름" {...register("name")} />
        {errors?.name?.message && <span>{errors.name.message}</span>}
      </div>
      <div>
        <input placeholder="이메일" {...register("email")} />
        {errors?.email?.message && <span>{errors.email.message}</span>}
      </div>
      <div>
        <input
          placeholder="비밀번호"
          type="password"
          {...register("password")}
        />
        {errors?.password?.message && <span>{errors.password.message}</span>}
      </div>
      <div>
        <input placeholder="닉네임" {...register("nickname")} />
        {errors?.nickname?.message && <span>{errors.nickname.message}</span>}
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
}
