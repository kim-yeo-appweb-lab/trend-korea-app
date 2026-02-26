"use client";

import { Button, Input } from "@kim-yeo-appweb-lab/ui";
import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, type Ref, useState } from "react";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type"> & {
	id: string;
	ref?: Ref<HTMLInputElement>;
};

export function PasswordInput({ id, ref, ...props }: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const toggleVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className="relative">
			<Input
				ref={ref}
				id={id}
				type={showPassword ? "text" : "password"}
				className="focus:ring-primary/20 pr-10 transition-all duration-200 focus:ring-2"
				{...props}
			/>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onClick={toggleVisibility}
				className="absolute top-1/2 right-1 -translate-y-1/2 p-2"
				aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
			>
				{showPassword ? (
					<EyeOff className="h-5 w-5" aria-hidden="true" />
				) : (
					<Eye className="h-5 w-5" aria-hidden="true" />
				)}
			</Button>
		</div>
	);
}
