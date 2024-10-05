"use client";

import {
  Group,
  Button,
  Text,
  Container,
  Card,
  Avatar,
  Box,
  LoadingOverlay,
} from "@mantine/core";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import classes from "@/styles/Venue.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [student, setStudent] = useState<any>();
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  useEffect(() => {
    if (id != undefined) {
      const fetch = async () => {
        const docRef = doc(db, "student", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudent({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("info not found, please refresh the page");
        }
      };
      fetch();
    }
  }, [id]);

  function capitalizeEachWord(str: string) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Container size="md">
      {student ? (
        <Card withBorder padding="xl" radius="md" className={classes.card}>
          <Card.Section
            h={140}
            style={{
              backgroundImage:
                "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjAZeDQFipoDI8eV64NT9oboKnC9SMgC7gJw&s)",
              backgroundSize: "cover",
            }}
          />
          <Avatar
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${student.name}`}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
            className={classes.avatar}
          />
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {capitalizeEachWord(student?.name)}
          </Text>
          <Text ta="center" fz="sm" c="dimmed">
            {student?.matric}
          </Text>
          <Group mt="md" justify="center" gap={30}>
            <div>
              <Text ta="center" fz="lg" fw={500} mt="sm">
                Department
              </Text>
              <Text
                ta="center"
                fw="bold"
                fz="md"
                c="var(--mantine-color-green-6)"
              >
                {student?.department == null
                  ? "Computer Science"
                  : student?.department}
              </Text>
            </div>
            <div>
              <Text ta="center" fz="lg" fw={500} mt="sm">
                Exam Venue
              </Text>
              <Text
                ta="center"
                fw="bold"
                fz="md"
                c="var(--mantine-color-green-6)"
              >
                {student?.venue}
              </Text>
            </div>
          </Group>
          <Group mt="md" justify="center" gap={30}>
            <div>
              <Text ta="center" fz="lg" fw={500}>
                Program
              </Text>
              <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {student?.program}
              </Text>
            </div>
            <div>
              <Text ta="center" fz="lg" fw={500}>
                Level
              </Text>
              <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {student?.level}
              </Text>
            </div>
            <div>
              <Text ta="center" fz="lg" fw={500}>
                Email
              </Text>
              <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {student?.email}
              </Text>
            </div>
          </Group>

          <Button
            onClick={() => {
              router.back();
            }}
            fullWidth
            radius="md"
            mt="xl"
            size="md"
            variant="outline"
          >
            Done
          </Button>
        </Card>
      ) : (
        <LoadingOverlay visible={true} />
      )}
    </Container>
  );
}
