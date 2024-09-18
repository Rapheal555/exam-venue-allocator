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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [student, setStudent] = useState<any>();
  const params = useSearchParams();
  const id = params.get("id");

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

  return (
    <Container size="md">
      {student ? (
        <Card withBorder padding="xl" radius="md" className={classes.card}>
          <Card.Section
            h={140}
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)",
            }}
          />
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
            className={classes.avatar}
          />
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {student?.name}
          </Text>
          <Text ta="center" fz="sm" c="dimmed">
            {student?.matric}
          </Text>
          <Box>
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
          </Box>
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
          <Link href="/" passHref>
            <Button fullWidth radius="md" mt="xl" size="md" variant="default">
              Done
            </Button>
          </Link>
        </Card>
      ) : (
        <LoadingOverlay />
      )}
    </Container>
  );
}
