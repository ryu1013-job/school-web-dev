"use client";

import { Alert, Button, Group, Stack, Text, Textarea } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconCheck, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { addPost } from "./action";

export default function AddForm({ close }: { close: () => void }) {
	const [content, setContent] = useState("");
	const [base64Image, setBase64Image] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [alertColor, setAlertColor] = useState<"red" | "green">("green");

	const compressionOptions = {
		maxSizeMB: 0.2,
		maxWidthOrHeight: 400,
		useWebWorker: true,
		maxIteration: 10,
		initialQuality: 0.7,
	};

	const handleDrop = async (files: File[]) => {
		if (files.length === 0) return;
		const originalFile = files[0];

		try {
			const compressedFile = await imageCompression(
				originalFile,
				compressionOptions,
			);

			const base64 = await fileToBase64(compressedFile);

			setBase64Image(base64);
			setAlertMessage("Image is ready for upload");
			setAlertColor("green");
		} catch (error: unknown) {
			console.error("Error while compressing/reading image:", error);
			setAlertMessage("Failed to compress the image");
			setAlertColor("red");
		}
	};

	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") {
					resolve(reader.result);
				} else {
					reject(new Error("Failed to convert file to base64"));
				}
			};
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setAlertMessage(null);

		try {
			if (!base64Image) {
				throw new Error("No image selected");
			}
			if (!content) {
				throw new Error("No content provided");
			}

			await addPost({
				content,

				imageBase64: base64Image.split(",")[1] || null,
			});

			setAlertMessage("Post created!");
			setAlertColor("green");
			setContent("");
			setBase64Image(null);
			close();
		} catch (error: unknown) {
			console.error(error);
			setAlertMessage("Failed to create the post");
			setAlertColor("red");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap="xl">
				{alertMessage && (
					<Alert
						icon={
							alertColor === "green" ? (
								<IconCheck size={16} />
							) : (
								<IconX size={16} />
							)
						}
						title={alertColor === "green" ? "Success" : "Error"}
						color={alertColor}
						variant="filled"
					>
						{alertMessage}
					</Alert>
				)}

				<Dropzone
					onDrop={handleDrop}
					onReject={(files) => {
						setAlertMessage("Failed to receive the image file");
						setAlertColor("red");
					}}
					accept={IMAGE_MIME_TYPE}
					multiple={false}
				>
					<Group style={{ minHeight: 220, pointerEvents: "none" }}>
						<Dropzone.Accept>
							<IconUpload size={50} stroke={1.5} />
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX size={50} stroke={1.5} />
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconPhoto size={50} stroke={1.5} />
						</Dropzone.Idle>

						<div>
							<Text size="xl" inline>
								Drag an image here or click to select a file
							</Text>
							<Text size="sm" color="dimmed" inline mt={7}>
								Please upload PNG/JPG or similar image formats
							</Text>
						</div>
					</Group>
				</Dropzone>

				{base64Image && (
					<img
						src={base64Image}
						alt="Preview"
						style={{ maxWidth: "200px", margin: "0 auto" }}
					/>
				)}

				<Textarea
					label="Content"
					minRows={2}
					value={content}
					onChange={(e) => setContent(e.currentTarget.value)}
				/>

				<Button type="submit" disabled={loading}>
					{loading ? "Sending..." : "Post"}
				</Button>
			</Stack>
		</form>
	);
}
