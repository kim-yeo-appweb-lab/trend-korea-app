"use client";

import { useState } from "react";

import { Button } from "../../../shared/components";

type IssueTrackButtonProps = {
	issueId: string;
	initialTracked?: boolean;
};

export function IssueTrackButton({ issueId: _issueId, initialTracked = false }: IssueTrackButtonProps) {
	const [isTracked, setIsTracked] = useState(initialTracked);

	function handleToggle() {
		setIsTracked((prev) => !prev);
	}

	return (
		<Button
			variant={isTracked ? "secondary" : "primary"}
			size="sm"
			onClick={handleToggle}
			aria-label={isTracked ? "추적 해제" : "추적 등록"}
		>
			{isTracked ? "추적 중" : "추적하기"}
		</Button>
	);
}
